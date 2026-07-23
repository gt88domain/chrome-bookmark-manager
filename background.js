const STORAGE_KEY = "urlsai-shortcuts-newtab";
const PRIVATE_SAVE_MENU_ID = "urlsai-save-private-page";
const LOCAL_TEXT_MENU_ID = "urlsai-add-text-local";
const LOCAL_LINK_MENU_ID = "urlsai-add-link-local";
const LOCAL_IMAGE_MENU_ID = "urlsai-add-image-local";
const FEEDBACK_BADGE_CLEAR_DELAY_MS = 2500;
const REMINDER_ALARM_PREFIX = "urlsai-reminder:";
const DEFAULT_SETTINGS = {
  privateContextMenuEnabled: false,
  localCaptureContextMenuEnabled: true,
};

async function readState() {
  const data = await chrome.storage.local.get(STORAGE_KEY);
  return (
    data[STORAGE_KEY] || {
      reminders: [],
      sessions: [],
      savedPages: [],
      localEntries: [],
      settings: {},
      lastReminderEvent: null,
    }
  );
}

async function writeState(next) {
  await chrome.storage.local.set({ [STORAGE_KEY]: next });
}

function getReminderAlarmName(reminderId) {
  return `${REMINDER_ALARM_PREFIX}${reminderId}`;
}

function getSettings(settings = {}) {
  return {
    ...DEFAULT_SETTINGS,
    ...(settings || {}),
  };
}

function isSupportedWebUrl(url) {
  return /^https?:\/\//i.test(url || "");
}

function createId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function safeHostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./i, "");
  } catch {
    return url || "";
  }
}

function trimText(value, maxLength = 240) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function fallbackTitleFromUrl(url) {
  if (!isSupportedWebUrl(url)) return "Untitled capture";
  try {
    const parsed = new URL(url);
    const lastPath = parsed.pathname.split("/").filter(Boolean).pop();
    return trimText(lastPath || parsed.hostname.replace(/^www\./i, ""), 120);
  } catch {
    return "Untitled capture";
  }
}

function detectCaptureSite(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./i, "");
    if (host === "youtube.com" || host === "youtu.be") return "youtube";
    if (host === "x.com") return "x";
    return "generic";
  } catch {
    return "generic";
  }
}

function isYoutubeVideoUrl(url) {
  if (!isSupportedWebUrl(url)) return false;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./i, "");
    return (
      (host === "youtube.com" &&
        parsed.pathname === "/watch" &&
        parsed.searchParams.has("v")) ||
      host === "youtu.be"
    );
  } catch {
    return false;
  }
}

function getYoutubeVideoId(url) {
  if (!isSupportedWebUrl(url)) return "";
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./i, "");
    if (host === "youtube.com" && parsed.pathname === "/watch") {
      return parsed.searchParams.get("v") || "";
    }
    if (host === "youtu.be") {
      return parsed.pathname.replace(/^\/+/, "").split("/")[0] || "";
    }
    return "";
  } catch {
    return "";
  }
}

async function flashBadge(text, color = "#f97316") {
  try {
    await chrome.action.setBadgeBackgroundColor({ color });
    await chrome.action.setBadgeText({ text });
    globalThis.setTimeout(() => {
      void chrome.action.setBadgeText({ text: "" });
    }, FEEDBACK_BADGE_CLEAR_DELAY_MS);
  } catch {
    // Ignore badge failures.
  }
}

function getMessage(key, fallback) {
  return chrome.i18n?.getMessage(key) || fallback;
}

async function syncPrivateContextMenu() {
  const state = await readState();
  const settings = getSettings(state.settings);

  try {
    await chrome.contextMenus.remove(PRIVATE_SAVE_MENU_ID);
  } catch {
    // Ignore when the menu does not exist yet.
  }

  if (!settings.privateContextMenuEnabled) {
    return;
  }

  await chrome.contextMenus.create({
    id: PRIVATE_SAVE_MENU_ID,
    title: "Save Private Page",
    contexts: ["page"],
    documentUrlPatterns: ["http://*/*", "https://*/*"],
  });
}

async function syncLocalCaptureContextMenus() {
  const state = await readState();
  const settings = getSettings(state.settings);
  for (const menuId of [
    LOCAL_TEXT_MENU_ID,
    LOCAL_LINK_MENU_ID,
    LOCAL_IMAGE_MENU_ID,
  ]) {
    try {
      await chrome.contextMenus.remove(menuId);
    } catch {
      // Ignore when the menu does not exist yet.
    }
  }

  if (!settings.localCaptureContextMenuEnabled) return;

  await chrome.contextMenus.create({
    id: LOCAL_TEXT_MENU_ID,
    title: getMessage("contextLocalText", "Add Text to Local"),
    contexts: ["selection"],
    documentUrlPatterns: ["http://*/*", "https://*/*"],
  });
  await chrome.contextMenus.create({
    id: LOCAL_LINK_MENU_ID,
    title: getMessage("contextLocalLink", "Add Link to Local"),
    contexts: ["link"],
    documentUrlPatterns: ["http://*/*", "https://*/*"],
  });
  await chrome.contextMenus.create({
    id: LOCAL_IMAGE_MENU_ID,
    title: getMessage("contextLocalImage", "Add Image URL to Local"),
    contexts: ["image"],
    documentUrlPatterns: ["http://*/*", "https://*/*"],
  });
}

async function savePrivateBookmarkFromTab(tab) {
  if (!tab?.url || !isSupportedWebUrl(tab.url)) {
    return;
  }

  const state = await readState();
  const nextState = {
    ...state,
    savedPages: [
      {
        id: `private_${Math.random().toString(36).slice(2, 10)}`,
        type: "bookmark",
        title: tab.title || new URL(tab.url).hostname.replace(/^www\./i, ""),
        url: tab.url,
        favIconUrl:
          typeof tab.favIconUrl === "string" ? tab.favIconUrl : undefined,
        folderPath: [],
        dateAdded: Date.now(),
      },
      ...(state.savedPages || []),
    ].slice(0, 500),
  };

  await writeState(nextState);
  await flashBadge("OK");
}

async function saveWindowSession() {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const supportedTabs = tabs.filter((tab) => isSupportedWebUrl(tab.url || ""));
  if (supportedTabs.length === 0) {
    await flashBadge("NO", "#9f2d2d");
    return;
  }

  const state = await readState();
  const session = {
    id: createId("session"),
    type: "session",
    title: `Quick Save ${new Date().toLocaleDateString()}`,
    createdAt: new Date().toISOString(),
    windowScope: "currentWindow",
    tabs: supportedTabs.map((tab, index) => ({
      id: String(tab.id || createId("tab")),
      title: tab.title || safeHostname(tab.url || ""),
      url: tab.url || "",
      favIconUrl:
        typeof tab.favIconUrl === "string" ? tab.favIconUrl : undefined,
      pinned: !!tab.pinned,
      groupId: -1,
      groupTitle: null,
      index: typeof tab.index === "number" ? tab.index : index,
    })),
  };

  await writeState({
    ...state,
    sessions: [session, ...(state.sessions || [])].slice(0, 50),
  });
  await flashBadge("OK");
}

async function saveLocalEntries(entries) {
  const nextEntries = Array.isArray(entries)
    ? entries.filter(Boolean).slice(0, 1000)
    : [];
  if (nextEntries.length === 0) {
    await flashBadge("NO", "#9f2d2d");
    return false;
  }

  const state = await readState();
  await writeState({
    ...state,
    localEntries: [...nextEntries, ...((state.localEntries || []).filter(Boolean))].slice(
      0,
      1000,
    ),
  });
  await flashBadge("OK");
  return true;
}

async function saveLocalCapture(type, info, tab) {
  const pageUrl = isSupportedWebUrl(info.pageUrl || "") ? info.pageUrl : "";
  const selectionText = trimText(info.selectionText || "", 2000);
  const entryUrl =
    type === "link"
      ? info.linkUrl || ""
      : type === "image" || type === "video"
        ? info.srcUrl || ""
        : "";
  const url = isSupportedWebUrl(entryUrl) ? entryUrl : "";
  const effectiveType =
    type === "video" && !url && pageUrl
      ? "page"
      : type === "link" && isYoutubeVideoUrl(url || pageUrl || tab?.url || "")
        ? "video"
        : type;

  if (!url && !pageUrl && !selectionText) {
    await flashBadge("NO", "#9f2d2d");
    return false;
  }

  let resolvedTitle =
    trimText(
      effectiveType === "selection"
        ? selectionText
        : effectiveType === "link"
          ? fallbackTitleFromUrl(url)
          : tab?.title || fallbackTitleFromUrl(url || pageUrl),
      120,
    ) || "Untitled capture";

  const videoId = getYoutubeVideoId(url || pageUrl || tab?.url || "");
  return saveLocalEntries([
    {
      id: createId("local"),
      type: effectiveType,
      title: resolvedTitle,
      url,
      pageUrl:
        pageUrl || (tab?.url && isSupportedWebUrl(tab.url) ? tab.url : ""),
      selectionText,
      mediaUrl:
        effectiveType === "image"
          ? url
          : effectiveType === "video" && videoId
            ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
            : "",
      site: detectCaptureSite(url || pageUrl || tab?.url || ""),
      createdAt: new Date().toISOString(),
      source:
        type === "selection"
          ? "selection"
          : type === "image"
            ? "image-context"
            : type === "link"
              ? "link-context"
              : "context-menu",
    },
  ]);
}

async function queryPrimaryPageTab() {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const activeSupported = tabs.find(
    (tab) => tab.active && isSupportedWebUrl(tab.url || ""),
  );
  if (activeSupported) {
    return activeSupported;
  }
  return (
    [...tabs]
      .filter((tab) => isSupportedWebUrl(tab.url || ""))
      .sort((left, right) => (right.lastAccessed || 0) - (left.lastAccessed || 0))[0] ||
    null
  );
}

async function captureCurrentPageAsLocalPage() {
  const activeTab = await queryPrimaryPageTab();
  if (!activeTab?.url || !isSupportedWebUrl(activeTab.url)) {
    return { ok: false, error: "No supported webpage found in this window." };
  }

  await saveLocalEntries([
    {
      id: createId("local"),
      type: "page",
      title: activeTab.title || safeHostname(activeTab.url),
      url: activeTab.url,
      pageUrl: activeTab.url,
      selectionText: "",
      site: detectCaptureSite(activeTab.url),
      source: "current-page",
      createdAt: new Date().toISOString(),
    },
  ]);
  return { ok: true };
}

async function deleteLocalCapture(entryId) {
  const state = await readState();
  await writeState({
    ...state,
    localEntries: (state.localEntries || []).filter((entry) => entry?.id !== entryId),
  });
  return { ok: true };
}

function getPendingReminderTimestamp(reminder) {
  if (!reminder || reminder.status !== "pending") return null;
  const timestamp = new Date(reminder.scheduledAt).getTime();
  return Number.isFinite(timestamp) ? timestamp : null;
}

async function syncReminderAlarms(stateOverride = null) {
  const state = stateOverride || (await readState());
  const reminders = Array.isArray(state.reminders) ? state.reminders : [];
  const wanted = new Set();

  for (const reminder of reminders) {
    const timestamp = getPendingReminderTimestamp(reminder);
    if (!timestamp) continue;
    const alarmName = getReminderAlarmName(reminder.id);
    wanted.add(alarmName);
    await chrome.alarms.create(alarmName, {
      when: Math.max(Date.now() + 1000, timestamp),
    });
  }

  const alarms = await chrome.alarms.getAll();
  for (const alarm of alarms) {
    if (!alarm.name.startsWith(REMINDER_ALARM_PREFIX)) continue;
    if (wanted.has(alarm.name)) continue;
    await chrome.alarms.clear(alarm.name);
  }
}

async function fireReminder(reminderId) {
  const state = await readState();
  const reminders = Array.isArray(state.reminders) ? state.reminders : [];
  const target = reminders.find((reminder) => reminder.id === reminderId);
  const timestamp = getPendingReminderTimestamp(target);
  if (!target || !timestamp) return;
  if (timestamp > Date.now() + 30 * 1000) return;

  const nextSavedPages = target.limitedTime && target.linkedSavedPageId
    ? (state.savedPages || []).filter((entry) => entry?.id !== target.linkedSavedPageId)
    : (state.savedPages || []);

  const nextReminders = reminders.map((reminder) =>
    reminder.id === reminderId
      ? {
          ...reminder,
          status: "done",
          lastNotifiedAt: new Date().toISOString(),
        }
      : reminder,
  );

  await writeState({
    ...state,
    savedPages: nextSavedPages,
    reminders: nextReminders,
    lastReminderEvent: {
      id: reminderId,
      title: target.title || "Reminder",
      url: target.url || "",
      firedAt: new Date().toISOString(),
      unread: true,
      status: "due",
    },
  });
  await chrome.alarms.clear(getReminderAlarmName(reminderId));
}

chrome.runtime?.onInstalled?.addListener(() => {
  void chrome.action.setBadgeText({ text: "" });
  void syncPrivateContextMenu();
  void syncLocalCaptureContextMenus();
  void syncReminderAlarms();
});

chrome.runtime?.onStartup?.addListener(() => {
  void chrome.action.setBadgeText({ text: "" });
  void syncPrivateContextMenu();
  void syncLocalCaptureContextMenus();
  void syncReminderAlarms();
});

chrome.storage?.onChanged?.addListener((changes, areaName) => {
  if (areaName !== "local" || !changes[STORAGE_KEY]) return;
  void syncPrivateContextMenu();
  void syncLocalCaptureContextMenus();
  void syncReminderAlarms(changes[STORAGE_KEY].newValue || null);
});

chrome.runtime?.onMessage?.addListener((message, _sender, sendResponse) => {
  if (message?.type === "sync-reminders") {
    void syncReminderAlarms().then(() => sendResponse({ ok: true }));
    return true;
  }
  return false;
});

chrome.alarms?.onAlarm?.addListener((alarm) => {
  if (!alarm.name.startsWith(REMINDER_ALARM_PREFIX)) return;
  const reminderId = alarm.name.slice(REMINDER_ALARM_PREFIX.length);
  if (!reminderId) return;
  void fireReminder(reminderId);
});

chrome.runtime?.onMessageExternal?.addListener((message, _sender, sendResponse) => {
  if (message?.type === "local-captures:get") {
    void readState().then((state) => {
      sendResponse({ ok: true, localEntries: state.localEntries || [] });
    });
    return true;
  }

  if (message?.type === "local-captures:delete") {
    void deleteLocalCapture(String(message.entryId || "")).then(sendResponse);
    return true;
  }

  if (message?.type === "local-captures:capture-current-page") {
    void captureCurrentPageAsLocalPage().then(sendResponse);
    return true;
  }

  return false;
});

chrome.contextMenus?.onClicked?.addListener((info, tab) => {
  if (info.menuItemId === PRIVATE_SAVE_MENU_ID) {
    void savePrivateBookmarkFromTab(tab);
    return;
  }
  if (info.menuItemId === LOCAL_TEXT_MENU_ID) {
    void saveLocalCapture("selection", info, tab);
    return;
  }
  if (info.menuItemId === LOCAL_LINK_MENU_ID) {
    void saveLocalCapture("link", info, tab);
    return;
  }
  if (info.menuItemId === LOCAL_IMAGE_MENU_ID) {
    void saveLocalCapture("image", info, tab);
  }
});

chrome.commands?.onCommand?.addListener((command) => {
  if (command === "save-private-page") {
    void chrome.tabs
      .query({ active: true, currentWindow: true })
      .then(([tab]) => savePrivateBookmarkFromTab(tab));
    return;
  }

  if (command === "save-window-session") {
    void saveWindowSession();
  }
});
