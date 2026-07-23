const fileInput = document.getElementById("fileInput");
const importButton = document.getElementById("importButton");
const exportButton = document.getElementById("exportButton");
const savePageButton = document.getElementById("savePageButton");
const saveWindowButton = document.getElementById("saveWindowButton");
const folderList = document.getElementById("folderList");
const folderHeading = document.getElementById("folderHeading");
const foldersFooter = document.getElementById("foldersFooter");
const bookmarkList = document.getElementById("bookmarkList");
const bookmarkTitle = document.getElementById("bookmarkTitle");
const bookmarkCount = document.getElementById("bookmarkCount");
const bookmarkFilters = document.getElementById("bookmarkFilters");
const sessionList = document.getElementById("sessionList");
const searchInput = document.getElementById("searchInput");
const viewFilterButtons = Array.from(
  document.querySelectorAll("[data-view-filter]"),
);
const sortField = document.getElementById("sortField");
const sortSelect = document.getElementById("sortSelect");
const bookmarkPanel = document.getElementById("bookmarkPanel");
const sessionPanel = document.getElementById("sessionPanel");
const settingsPanel = document.getElementById("settingsPanel");
const reminderPanel = document.getElementById("reminderPanel");
const reminderCount = document.getElementById("reminderCount");
const enableNewtabCheckbox = document.getElementById("enableNewtabCheckbox");
const privacyModeCheckbox = document.getElementById("privacyModeCheckbox");
const hideDuplicateBookmarksCheckbox = document.getElementById(
  "hideDuplicateBookmarksCheckbox",
);
const privateContextMenuCheckbox = document.getElementById(
  "privateContextMenuCheckbox",
);
const localCaptureContextMenuCheckbox = document.getElementById(
  "localCaptureContextMenuCheckbox",
);
const cardDensitySelect = document.getElementById("cardDensitySelect");
const localCapturesCountLabel = document.getElementById("localCapturesCountLabel");
const localCountText = document.getElementById("localCountText");
const localCountLinks = document.getElementById("localCountLinks");
const localCountImages = document.getElementById("localCountImages");
const localCountVideos = document.getElementById("localCountVideos");
const localCountPages = document.getElementById("localCountPages");
const captureCurrentPageButton = document.getElementById("captureCurrentPageButton");
const localCaptureExportSelect = document.getElementById("localCaptureExportSelect");
const exportLocalCapturesButton = document.getElementById("exportLocalCapturesButton");
const foldersPane = document.querySelector(".folders");
const statusEl = document.getElementById("status");
const reminderAlert = document.getElementById("reminderAlert");
const reminderAlertTitle = document.getElementById("reminderAlertTitle");
const reminderAlertMeta = document.getElementById("reminderAlertMeta");
const reminderAlertOpen = document.getElementById("reminderAlertOpen");
const reminderAlertDismiss = document.getElementById("reminderAlertDismiss");
const fullLibraryLink = document.getElementById("fullLibraryLink");
const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const isPopupMode = document.body.classList.contains("popup-mode");
const isNewtabMode = document.body.classList.contains("newtab-mode");

const newtabCommandForm = document.getElementById("newtabCommandForm");
const newtabCommandInput = document.getElementById("newtabCommandInput");
const newtabSearchButton = document.getElementById("newtabSearchButton");
const newtabAskAiButton = document.getElementById("newtabAskAiButton");
const newtabVoiceButton = document.getElementById("newtabVoiceButton");
const newtabVoiceStatus = document.getElementById("newtabVoiceStatus");
const newtabQuickOpenLibrary = document.getElementById(
  "newtabQuickOpenLibrary",
);
const newtabAppsToggle = document.getElementById("newtabAppsToggle");
const newtabAppsPanel = document.getElementById("newtabAppsPanel");
const newtabBookmarkTotal = document.getElementById("newtabBookmarkTotal");
const newtabSessionTotal = document.getElementById("newtabSessionTotal");
const newtabReminderTotal = document.getElementById("newtabReminderTotal");
const newtabLaunchpad = document.getElementById("newtabLaunchpad");
const newtabRecentPreview = document.getElementById("newtabRecentPreview");
const newtabBookmarksPreview = document.getElementById(
  "newtabBookmarksPreview",
);
const newtabSessionsPreview = document.getElementById("newtabSessionsPreview");
const newtabRemindersPreview = document.getElementById(
  "newtabRemindersPreview",
);
const newtabWorkspace = document.getElementById("newtabWorkspace");
const newtabHero = document.querySelector(".newtabHero");
const newtabPreviewGrid = document.querySelector(".newtabPreviewGrid");
const newtabDisabledState = document.getElementById("newtabDisabledState");
const newtabEnableButton = document.getElementById("newtabEnableButton");
const newtabDisabledSearchButton = document.getElementById(
  "newtabDisabledSearchButton",
);
const newtabTopicButtons = Array.from(
  document.querySelectorAll("[data-newtab-topic]"),
);
const newtabTopicAddButton = document.getElementById("newtabTopicAddButton");
const newtabPreviewCards = Array.from(
  document.querySelectorAll("[data-open-tab]"),
);
const openDownloadsButton = document.getElementById("openDownloadsButton");
const openReadingListButton = document.getElementById("openReadingListButton");

const reminderTitleInput = document.getElementById("reminderTitleInput");
const reminderUrlInput = document.getElementById("reminderUrlInput");
const reminderDateInput = document.getElementById("reminderDateInput");
const reminderLimitedTimeCheckbox = document.getElementById(
  "reminderLimitedTimeCheckbox",
);
const reminderUseCurrentPageButton = document.getElementById(
  "reminderUseCurrentPageButton",
);
const testReminderButton = document.getElementById("testReminderButton");
const addReminderButton = document.getElementById("addReminderButton");
const reminderDebug = document.getElementById("reminderDebug");
const weekdayFilter = document.getElementById("weekdayFilter");
const todayReminders = document.getElementById("todayReminders");
const weekReminders = document.getElementById("weekReminders");
const doneReminders = document.getElementById("doneReminders");
const selectionToolbar = document.createElement("div");

selectionToolbar.id = "selectionToolbar";
selectionToolbar.className = "selectionToolbar hidden";
bookmarkPanel?.appendChild(selectionToolbar);

const STORAGE_KEY = "urlsai-shortcuts-newtab";
const FULL_LIBRARY_FALLBACK_URL = "https://urls.ai/bookmark";
const SOCIAL_PRESET_DOMAINS = [
  "youtube.com",
  "reddit.com",
  "x.com",
  "facebook.com",
  "instagram.com",
  "pinterest.com",
  "linkedin.com",
  "substack.com",
  "medium.com",
  "threads.net",
  "tiktok.com",
  "twitch.tv",
  "discord.com",
  "telegram.org",
  "t.me",
  "snapchat.com",
  "whatsapp.com",
  "weibo.com",
  "bsky.app",
  "mastodon.social",
];
const NEWTAB_TOPIC_PRESETS = {
  popular: {
    title: "Popular",
    matcher: () => true,
  },
  ai: {
    title: "AI",
    matcher: (bookmark) =>
      /ai|gpt|claude|gemini|openai|llm|cursor|perplexity|midjourney|runway/i.test(
        `${bookmark.title} ${bookmark.url} ${(bookmark.folderPath || []).join(" ")}`,
      ),
  },
  shop: {
    title: "Shop",
    matcher: (bookmark) =>
      /amazon|ebay|etsy|taobao|shopify|jd\.com|1688|mercari|rakuten|aliexpress/i.test(
        `${bookmark.title} ${bookmark.url}`,
      ),
  },
  stream: {
    title: "Stream",
    matcher: (bookmark) =>
      /youtube|netflix|bilibili|twitch|spotify|apple music|disney|prime video|substack|medium/i.test(
        `${bookmark.title} ${bookmark.url}`,
      ),
  },
};
const DEFAULT_NEW_TAB_SHORTCUTS = [
  {
    id: "preset-google",
    title: "Google",
    url: "https://www.google.com/",
    meta: "Search",
    topics: ["popular", "shop"],
  },
  {
    id: "preset-gmail",
    title: "Gmail",
    url: "https://mail.google.com/",
    meta: "Mail",
    topics: ["popular"],
  },
  {
    id: "preset-youtube",
    title: "YouTube",
    url: "https://www.youtube.com/",
    meta: "Video",
    topics: ["popular", "stream"],
  },
  {
    id: "preset-drive",
    title: "Drive",
    url: "https://drive.google.com/",
    meta: "Files",
    topics: ["popular"],
  },
  {
    id: "preset-maps",
    title: "Maps",
    url: "https://maps.google.com/",
    meta: "Maps",
    topics: ["popular"],
  },
  {
    id: "preset-chatgpt",
    title: "ChatGPT",
    url: "https://chatgpt.com/",
    meta: "AI",
    topics: ["popular", "ai"],
  },
  {
    id: "preset-gemini",
    title: "Gemini",
    url: "https://gemini.google.com/",
    meta: "AI",
    topics: ["ai"],
  },
  {
    id: "preset-reddit",
    title: "Reddit",
    url: "https://www.reddit.com/",
    meta: "Community",
    topics: ["popular", "stream"],
  },
  {
    id: "preset-x",
    title: "X",
    url: "https://x.com/",
    meta: "Social",
    topics: ["popular", "stream"],
  },
  {
    id: "preset-github",
    title: "GitHub",
    url: "https://github.com/",
    meta: "Code",
    topics: ["popular"],
  },
  {
    id: "preset-amazon",
    title: "Amazon",
    url: "https://www.amazon.com/",
    meta: "Shop",
    topics: ["shop"],
  },
  {
    id: "preset-ebay",
    title: "eBay",
    url: "https://www.ebay.com/",
    meta: "Shop",
    topics: ["shop"],
  },
  {
    id: "preset-netflix",
    title: "Netflix",
    url: "https://www.netflix.com/",
    meta: "Watch",
    topics: ["stream"],
  },
];
const NEWTAB_LIBRARY_LIMIT = 20;
const WEEKDAY_LABELS = [
  { id: "all", label: "All" },
  { id: "1", label: "Mon" },
  { id: "2", label: "Tue" },
  { id: "3", label: "Wed" },
  { id: "4", label: "Thu" },
  { id: "5", label: "Fri" },
  { id: "6", label: "Sat" },
  { id: "0", label: "Sun" },
];
const DEFAULT_SETTINGS = {
  newtabEnabled: true,
  privacyModeEnabled: false,
  hideDuplicateBookmarks: true,
  privateContextMenuEnabled: false,
  localCaptureContextMenuEnabled: true,
  cardDensity: "list",
};

const state = {
  activeTab:
    new URLSearchParams(window.location.search).get("view") === "reminders"
      ? "reminders"
      : "bookmarks",
  selectedFolderId: "all",
  query: "",
  pinFilter: "all",
  domainView: "all",
  sortMode: "newest",
  selectedBookmarkIds: [],
  moveTargetId: "unfiled",
  renameDraft: "",
  weekdayFilter: "all",
  bookmarksTree: [],
  sessions: [],
  savedPages: [],
  reminders: [],
  localEntries: [],
  bookmarkStats: {},
  pinnedUrls: [],
  socialDomains: [],
  hiddenBookmarkIds: [],
  bookmarkFolderOverrides: {},
  bookmarkTitleOverrides: {},
  settings: { ...DEFAULT_SETTINGS },
  lastReminderEvent: null,
  newtabTopic: "popular",
  newtabWorkspaceOpen: false,
};

function normalizeSettings(settings = {}) {
  const cardDensity =
    settings.cardDensity === "2-column" ? "2-column" : "list";
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
    cardDensity,
  };
}

function createId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function safeHostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./i, "");
  } catch {
    return url;
  }
}

function detectCaptureSite(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./i, "");
    if (host === "x.com") return "x";
    if (host === "youtube.com" || host === "youtu.be") return "youtube";
    if (host === "instagram.com") return "instagram";
    if (host === "tiktok.com") return "tiktok";
    if (host === "reddit.com") return "reddit";
    return "generic";
  } catch {
    return "generic";
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

function normalizeLocalCaptureType(type, url, pageUrl) {
  if (type === "link" && getYoutubeVideoId(url || pageUrl)) {
    return "video";
  }
  return ["selection", "link", "image", "video", "page"].includes(type)
    ? type
    : "link";
}

function getRootDomain(url) {
  const host = safeHostname(url);
  const parts = host.split(".").filter(Boolean);
  if (parts.length <= 2) return host;
  return parts.slice(-2).join(".");
}

function canonicalBookmarkUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    const normalizedPath =
      parsed.pathname.length > 1
        ? parsed.pathname.replace(/\/+$/, "")
        : parsed.pathname;
    return `${parsed.protocol}//${parsed.hostname}${normalizedPath}${parsed.search}`;
  } catch {
    return String(url || "")
      .trim()
      .toLowerCase();
  }
}

function isSupportedWebUrl(url) {
  return /^https?:\/\//i.test(url || "");
}

function getCaptureUrl(entry) {
  return entry.url || entry.pageUrl || entry.mediaUrl || "";
}

function getCaptureLabel(type) {
  return {
    selection: "Text",
    link: "Links",
    image: "Images",
    video: "Videos",
    page: "Saved Pages",
  }[type] || "Captures";
}

function getChromeFaviconUrl(url) {
  try {
    const faviconUrl = new URL(chrome.runtime.getURL("/_favicon/"));
    faviconUrl.searchParams.set("pageUrl", url);
    faviconUrl.searchParams.set("size", "32");
    return faviconUrl.toString();
  } catch {
    return "";
  }
}

function renderFaviconMarkup(url, fallback, label, className = "avatar") {
  const primarySrc = fallback || getChromeFaviconUrl(url);
  if (!primarySrc) {
    return `<div class="${className}">${escapeHtml(
      String(label || "?")
        .slice(0, 1)
        .toUpperCase(),
    )}</div>`;
  }

  return `<div class="${className}"><img src="${primarySrc}" alt="" loading="lazy" /></div>`;
}

function attachImageFallbacks(_container) {}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setStatus(message, type = "success") {
  if (!message) {
    statusEl.textContent = "";
    statusEl.className = "status hidden";
    return;
  }
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
}

async function dismissReminderAlert() {
  if (!state.lastReminderEvent) return;
  state.lastReminderEvent = {
    ...state.lastReminderEvent,
    unread: false,
  };
  await writeStorage();
  renderReminderAlert();
}

async function openReminderAlertTarget() {
  const url = state.lastReminderEvent?.url;
  if (url) {
    await openTrackedUrl(url);
  } else {
    state.activeTab = "reminders";
    render();
  }
  await dismissReminderAlert();
}

async function resolveFullLibraryUrl() {
  try {
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const activeUrl = activeTab?.url ? new URL(activeTab.url) : null;
    const isAppOrigin =
      activeUrl &&
      /^https?:$/i.test(activeUrl.protocol) &&
      (activeUrl.hostname === "localhost" ||
        activeUrl.hostname === "127.0.0.1" ||
        activeUrl.hostname.endsWith("urls.ai"));

    if (isAppOrigin) {
      return `${activeUrl.origin}/bookmark`;
    }
  } catch {
    // Ignore and fall back.
  }
  return FULL_LIBRARY_FALLBACK_URL;
}

function flattenBookmarks(tree) {
  const results = [];
  const walk = (nodes) => {
    for (const node of nodes) {
      if (node.type === "folder") {
        walk(node.children || []);
      } else if (node.type === "bookmark") {
        results.push(node);
      }
    }
  };
  walk(tree);
  return results;
}

function getDisplayTitle(bookmark) {
  const override = state.bookmarkTitleOverrides[bookmark.id]?.trim();
  return override || bookmark.title;
}

function applyBookmarkOverrides(bookmark) {
  return {
    ...bookmark,
    title: getDisplayTitle(bookmark),
  };
}

function isHiddenBookmark(bookmark) {
  return state.hiddenBookmarkIds.includes(bookmark.id);
}

function getOriginalFolderId(bookmark) {
  return bookmark.folderId || "unfiled";
}

function getEffectiveFolderId(bookmark) {
  return state.bookmarkFolderOverrides[bookmark.id] || getOriginalFolderId(bookmark);
}

function getAllLibraryBookmarks() {
  return flattenBookmarks(state.bookmarksTree)
    .filter((bookmark) => !isHiddenBookmark(bookmark))
    .map(applyBookmarkOverrides);
}

function getAllPrivateBookmarks() {
  return state.savedPages.map(applyBookmarkOverrides);
}

function collapseSingleContainerRoot(tree) {
  const meaningfulFolders = tree.filter(
    (folder) => flattenBookmarks([folder]).length > 0,
  );

  if (meaningfulFolders.length !== 1) {
    return tree;
  }

  const [root] = meaningfulFolders;
  const childFolders = (root.children || []).filter(
    (node) => node.type === "folder",
  );
  const childBookmarks = (root.children || []).filter(
    (node) => node.type === "bookmark",
  );

  if (childFolders.length === 0 && childBookmarks.length === 0) {
    return tree;
  }

  const nextTree = [...childFolders];

  if (childBookmarks.length > 0) {
    nextTree.unshift({
      id: "unfiled-root",
      type: "folder",
      title: "No Folder",
      children: childBookmarks.map((bookmark) => ({
        ...bookmark,
        folderPath: [],
      })),
    });
  }

  return nextTree;
}

function collectFolders(tree) {
  const allBookmarks = getAllLibraryBookmarks();
  const definitions = [];
  const counts = new Map();

  for (const bookmark of allBookmarks) {
    const folderId = getEffectiveFolderId(bookmark);
    counts.set(folderId, (counts.get(folderId) || 0) + 1);
  }

  const walk = (nodes) => {
    for (const node of nodes) {
      if (node.type !== "folder") continue;
      if (node.id === "unfiled-root") continue;
      definitions.push({ id: node.id, title: node.title });
      walk(node.children || []);
    }
  };

  walk(tree);

  const folders = definitions
    .map((folder) => ({
      ...folder,
      count: counts.get(folder.id) || 0,
    }))
    .filter((folder) => folder.count > 0);

  const unfiledCount = counts.get("unfiled") || 0;
  if (unfiledCount > 0) {
    folders.unshift({ id: "unfiled", title: "No Folder", count: unfiledCount });
  }

  folders.sort((left, right) => {
    if (left.count !== right.count) return right.count - left.count;
    return left.title.localeCompare(right.title);
  });

  return [{ id: "all", title: "All", count: allBookmarks.length }, ...folders];
}

function collectDomainItems(bookmarks, allTitle) {
  const counts = new Map();
  for (const bookmark of bookmarks) {
    const domain = getRootDomain(bookmark.url);
    counts.set(domain, (counts.get(domain) || 0) + 1);
  }

  const domains = Array.from(counts.entries())
    .map(([domain, count]) => ({ id: domain, title: domain, count }))
    .sort((left, right) => {
      if (left.count !== right.count) return right.count - left.count;
      return left.title.localeCompare(right.title);
    });

  return [{ id: "all", title: allTitle, count: bookmarks.length }, ...domains];
}

function collectSocialDomainItems(bookmarks) {
  const counts = new Map();
  const socialDomains = Array.from(
    new Set([...SOCIAL_PRESET_DOMAINS, ...(state.socialDomains || [])]),
  );
  for (const bookmark of bookmarks) {
    const domain = getRootDomain(bookmark.url);
    if (!socialDomains.includes(domain)) continue;
    counts.set(domain, (counts.get(domain) || 0) + 1);
  }

  return [
    {
      id: "all",
      title: "All Social",
      count: Array.from(counts.values()).reduce((sum, item) => sum + item, 0),
    },
    ...socialDomains.map((domain) => ({
      id: domain,
      title: domain,
      count: counts.get(domain) || 0,
    })),
  ];
}

function collectCaptureItems() {
  const counts = new Map();
  for (const entry of state.localEntries) {
    counts.set(entry.type, (counts.get(entry.type) || 0) + 1);
  }
  const types = ["selection", "link", "image", "video", "page"];
  return [
    { id: "all", title: "All", count: state.localEntries.length },
    ...types.map((type) => ({
      id: type,
      title: getCaptureLabel(type),
      count: counts.get(type) || 0,
    })),
  ];
}

function findFolderBookmarks(tree, folderId) {
  const bookmarks = getAllLibraryBookmarks();
  if (folderId === "all") return bookmarks;
  if (folderId === "unfiled") {
    return bookmarks.filter((bookmark) => getEffectiveFolderId(bookmark) === "unfiled");
  }
  return bookmarks.filter((bookmark) => getEffectiveFolderId(bookmark) === folderId);
}

function matchesBookmarkQuery(bookmark, query = "") {
  const q = query.trim().toLowerCase();
  return (
    !q ||
    bookmark.title.toLowerCase().includes(q) ||
    bookmark.url.toLowerCase().includes(q)
  );
}

function sortBookmarks(bookmarks) {
  return [...bookmarks].sort((left, right) => {
    const leftPinned = isPinnedBookmark(left) ? 1 : 0;
    const rightPinned = isPinnedBookmark(right) ? 1 : 0;
    if (leftPinned !== rightPinned) {
      return rightPinned - leftPinned;
    }
    if (state.sortMode === "oldest") {
      return (left.dateAdded || 0) - (right.dateAdded || 0);
    }
    if (state.sortMode === "az") {
      return left.title.localeCompare(right.title);
    }
    if (state.sortMode === "recent-opened") {
      const leftOpenedAt = getBookmarkStat(left)?.lastOpenedAt || "";
      const rightOpenedAt = getBookmarkStat(right)?.lastOpenedAt || "";
      return rightOpenedAt.localeCompare(leftOpenedAt);
    }
    if (state.sortMode === "most-opened") {
      return getBookmarkOpenCount(right) - getBookmarkOpenCount(left);
    }
    return (right.dateAdded || 0) - (left.dateAdded || 0);
  });
}

function maybeDedupeBookmarks(bookmarks) {
  if (!state.settings.hideDuplicateBookmarks) return bookmarks;

  const seen = new Set();
  return bookmarks.filter((bookmark) => {
    const key = canonicalBookmarkUrl(bookmark.url);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getBookmarkStat(bookmark) {
  return state.bookmarkStats[canonicalBookmarkUrl(bookmark.url)] || null;
}

function getBookmarkOpenCount(bookmark) {
  return getBookmarkStat(bookmark)?.openCount || 0;
}

function isPinnedBookmark(bookmark) {
  return state.pinnedUrls.includes(canonicalBookmarkUrl(getCaptureUrl(bookmark)));
}

async function togglePinnedBookmark(bookmark) {
  const key = canonicalBookmarkUrl(getCaptureUrl(bookmark));
  const pinned = new Set(state.pinnedUrls);
  const wasPinned = pinned.has(key);
  if (wasPinned) {
    pinned.delete(key);
  } else {
    pinned.add(key);
  }
  state.pinnedUrls = Array.from(pinned);
  await writeStorage();
  setStatus(
    wasPinned ? "Bookmark unpinned." : "Bookmark pinned locally.",
    "success",
  );
  render();
}

async function togglePinnedBookmarksByIds(bookmarkIds) {
  const bookmarkMap = new Map(
    (state.activeTab === "captures"
      ? getBookmarkRowsForActiveTab()
      : getAllBookmarkItems()
    ).map((bookmark) => [bookmark.id, bookmark]),
  );
  const selected = bookmarkIds
    .map((bookmarkId) => bookmarkMap.get(bookmarkId))
    .filter(Boolean);
  if (selected.length === 0) return;

  const pinned = new Set(state.pinnedUrls);
  const shouldUnpin = selected.every((bookmark) =>
    pinned.has(canonicalBookmarkUrl(getCaptureUrl(bookmark))),
  );

  for (const bookmark of selected) {
    const key = canonicalBookmarkUrl(getCaptureUrl(bookmark));
    if (shouldUnpin) {
      pinned.delete(key);
    } else {
      pinned.add(key);
    }
  }

  state.pinnedUrls = Array.from(pinned);
  await writeStorage();
  setStatus(
    shouldUnpin ? "Selected bookmarks unpinned." : "Selected bookmarks pinned locally.",
    "success",
  );
}

function getAllBookmarkItems() {
  return [...getAllLibraryBookmarks(), ...getAllPrivateBookmarks()];
}

function buildBookmarkRows(bookmarks) {
  const filtered = bookmarks.filter((bookmark) =>
    matchesBookmarkQuery(bookmark, state.query),
  );
  return applyPinFilter(maybeDedupeBookmarks(sortBookmarks(filtered)));
}

function applyPinFilter(bookmarks) {
  if (state.activeTab === "domain") {
    if (state.domainView === "social") {
      return bookmarks.filter((bookmark) => isSocialBookmark(bookmark));
    }
    if (state.domainView === "accounts") {
      return bookmarks.filter(
        (bookmark) =>
          isSocialBookmark(bookmark) && isSocialAccountBookmark(bookmark),
      );
    }
    return bookmarks;
  }
  if (state.pinFilter === "pinned") {
    return bookmarks.filter((bookmark) => isPinnedBookmark(bookmark));
  }
  if (state.pinFilter === "unpinned") {
    return bookmarks.filter((bookmark) => !isPinnedBookmark(bookmark));
  }
  return bookmarks;
}

function isSocialBookmark(bookmark) {
  const socialDomains = new Set([
    ...SOCIAL_PRESET_DOMAINS,
    ...(state.socialDomains || []),
  ]);
  return socialDomains.has(getRootDomain(bookmark.url));
}

function getRecentBookmarks() {
  const allBookmarks = maybeDedupeBookmarks(
    flattenBookmarks(state.bookmarksTree),
  );
  return allBookmarks
    .filter((bookmark) => getBookmarkStat(bookmark)?.lastOpenedAt)
    .sort((left, right) => {
      const leftOpenedAt = getBookmarkStat(left)?.lastOpenedAt || "";
      const rightOpenedAt = getBookmarkStat(right)?.lastOpenedAt || "";
      return rightOpenedAt.localeCompare(leftOpenedAt);
    })
    .filter((bookmark) => matchesBookmarkQuery(bookmark, state.query))
    .slice(0, 32);
}

function getPinnedBookmarks() {
  return buildBookmarkRows(
    getAllBookmarkItems().filter((bookmark) => isPinnedBookmark(bookmark)),
  );
}

function isSocialAccountBookmark(bookmark) {
  try {
    const url = new URL(bookmark.url);
    const host = url.hostname.replace(/^www\./, "");
    const path = url.pathname.replace(/\/+$/, "");

    if ((host === "x.com" || host === "twitter.com") && /^\/[^/]+$/.test(path)) {
      return !path.startsWith("/home") && !path.startsWith("/explore");
    }
    if (host === "youtube.com" && /^\/(@[^/]+|channel\/[^/]+|c\/[^/]+|user\/[^/]+)$/.test(path)) {
      return true;
    }
    if (host === "instagram.com" && /^\/[^/]+$/.test(path)) {
      return true;
    }
    if (host === "facebook.com" && /^\/[^/]+$/.test(path)) {
      return true;
    }
    if (host === "reddit.com" && /^\/(u|user)\/[^/]+$/.test(path)) {
      return true;
    }
    if (host === "linkedin.com" && /^\/(in|company)\/[^/]+$/.test(path)) {
      return true;
    }
    if (host === "pinterest.com" && /^\/[^/]+$/.test(path)) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

function getPrivateBookmarks() {
  return buildBookmarkRows(getAllPrivateBookmarks());
}

function normalizeBookmarkNodes(nodes, parentPath = [], parentFolderId = "unfiled") {
  return (nodes || [])
    .map((node) => {
      if (node.url) {
        if (!isSupportedWebUrl(node.url)) return null;
        return {
          id: node.id || createId("bookmark"),
          type: "bookmark",
          title: node.title || safeHostname(node.url),
          url: node.url,
          favIconUrl:
            typeof node.favIconUrl === "string" ? node.favIconUrl : undefined,
          folderPath: parentPath,
          folderId: parentFolderId,
          dateAdded: node.dateAdded,
        };
      }

      const title = node.title || "Untitled Folder";
      const folderId = node.id || createId("folder");
      return {
        id: folderId,
        type: "folder",
        title,
        children: normalizeBookmarkNodes(node.children || [], [
          ...parentPath,
          title,
        ], folderId),
        dateAdded: node.dateAdded,
      };
    })
    .filter(Boolean);
}

function normalizeImportedBookmarksTree(nodes, parentPath = [], parentFolderId = "unfiled") {
  return (nodes || [])
    .map((node) => {
      if (!node || typeof node !== "object") return null;
      if (node.type === "folder") {
        const title =
          typeof node.title === "string" && node.title.trim()
            ? node.title.trim()
            : "Untitled Folder";
        const folderId =
          typeof node.id === "string" ? node.id : createId("folder");
        return {
          id: folderId,
          type: "folder",
          title,
          children: normalizeImportedBookmarksTree(node.children || [], [
            ...parentPath,
            title,
          ], folderId),
          dateAdded:
            typeof node.dateAdded === "number" ? node.dateAdded : undefined,
        };
      }

      if (node.type === "bookmark" || node.url) {
        const url = typeof node.url === "string" ? node.url.trim() : "";
        if (!isSupportedWebUrl(url)) return null;
        return {
          id: typeof node.id === "string" ? node.id : createId("bookmark"),
          type: "bookmark",
          title:
            typeof node.title === "string" && node.title.trim()
              ? node.title.trim()
              : safeHostname(url),
          url,
          favIconUrl:
            typeof node.favIconUrl === "string" ? node.favIconUrl : undefined,
          folderPath: Array.isArray(node.folderPath)
            ? node.folderPath.filter(Boolean)
            : parentPath,
          folderId:
            typeof node.folderId === "string"
              ? node.folderId
              : parentFolderId,
          dateAdded:
            typeof node.dateAdded === "number" ? node.dateAdded : undefined,
        };
      }

      return null;
    })
    .filter(Boolean);
}

function normalizeImportedSavedPages(nodes) {
  return normalizeImportedBookmarksTree(nodes).map((bookmark) => ({
    ...bookmark,
    folderPath: [],
  }));
}

function normalizeImportedSessions(sessions) {
  return (sessions || [])
    .map((session) => {
      if (!session || typeof session !== "object") return null;
      const tabs = (session.tabs || [])
        .map((tab) => {
          if (!tab || typeof tab !== "object") return null;
          const url = typeof tab.url === "string" ? tab.url.trim() : "";
          if (!isSupportedWebUrl(url)) return null;
          return {
            id: typeof tab.id === "string" ? tab.id : createId("tab"),
            title:
              typeof tab.title === "string" && tab.title.trim()
                ? tab.title.trim()
                : safeHostname(url),
            url,
            favIconUrl:
              typeof tab.favIconUrl === "string" ? tab.favIconUrl : undefined,
            pinned: !!tab.pinned,
            groupId: -1,
            groupTitle: null,
            index: typeof tab.index === "number" ? tab.index : 0,
          };
        })
        .filter(Boolean);

      if (tabs.length === 0) return null;

      return {
        id: typeof session.id === "string" ? session.id : createId("session"),
        type: "session",
        title:
          typeof session.title === "string" && session.title.trim()
            ? session.title.trim()
            : "Imported Session",
        createdAt:
          typeof session.createdAt === "string" && session.createdAt.trim()
            ? session.createdAt
            : new Date().toISOString(),
        windowScope: "currentWindow",
        tabs,
      };
    })
    .filter(Boolean);
}

function normalizeImportedReminders(reminders) {
  return (reminders || [])
    .map((reminder) => {
      if (!reminder || typeof reminder !== "object") return null;
      const title =
        typeof reminder.title === "string" && reminder.title.trim()
          ? reminder.title.trim()
          : "Reminder";
      const scheduledAt =
        typeof reminder.scheduledAt === "string" ? reminder.scheduledAt : "";
      if (!scheduledAt) return null;
      return {
        id:
          typeof reminder.id === "string" ? reminder.id : createId("reminder"),
        title,
        url: typeof reminder.url === "string" ? reminder.url : "",
        scheduledAt,
        createdAt:
          typeof reminder.createdAt === "string"
            ? reminder.createdAt
            : new Date().toISOString(),
        status: reminder.status === "done" ? "done" : "pending",
        limitedTime: !!reminder.limitedTime,
        linkedSavedPageId:
          typeof reminder.linkedSavedPageId === "string"
            ? reminder.linkedSavedPageId
            : null,
        lastNotifiedAt:
          typeof reminder.lastNotifiedAt === "string"
            ? reminder.lastNotifiedAt
            : null,
      };
    })
    .filter(Boolean);
}

function normalizeImportedBookmarkStats(stats) {
  if (!stats || typeof stats !== "object" || Array.isArray(stats)) {
    return {};
  }

  const normalized = {};
  for (const [key, value] of Object.entries(stats)) {
    if (!value || typeof value !== "object") continue;
    normalized[key] = {
      openCount:
        typeof value.openCount === "number" && value.openCount > 0
          ? Math.floor(value.openCount)
          : 0,
      lastOpenedAt:
        typeof value.lastOpenedAt === "string" ? value.lastOpenedAt : null,
    };
  }
  return normalized;
}

function normalizeImportedPinnedUrls(input) {
  if (!Array.isArray(input)) return [];
  return Array.from(
    new Set(
      input
        .map((value) =>
          typeof value === "string" ? canonicalBookmarkUrl(value) : "",
        )
        .filter(Boolean),
    ),
  );
}

function normalizeImportedLocalEntries(entries) {
  if (!Array.isArray(entries)) return [];
  return entries
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const title =
        typeof entry.title === "string" && entry.title.trim()
          ? entry.title.trim()
          : "Untitled capture";
      const url =
        typeof entry.url === "string" && isSupportedWebUrl(entry.url.trim())
          ? entry.url.trim()
          : "";
      const pageUrl =
        typeof entry.pageUrl === "string" &&
        isSupportedWebUrl(entry.pageUrl.trim())
          ? entry.pageUrl.trim()
          : "";
      const selectionText =
        typeof entry.selectionText === "string" ? entry.selectionText.trim() : "";
      if (!url && !pageUrl && !selectionText) return null;
      const type = normalizeLocalCaptureType(String(entry.type || "link"), url, pageUrl);
      const videoId = getYoutubeVideoId(url || pageUrl);
      return {
        id: typeof entry.id === "string" ? entry.id : createId("local"),
        type,
        title,
        url,
        pageUrl,
        selectionText,
        mediaUrl:
          typeof entry.mediaUrl === "string" &&
          isSupportedWebUrl(entry.mediaUrl.trim())
            ? entry.mediaUrl.trim()
            : videoId
              ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
              : "",
        site:
          typeof entry.site === "string" && entry.site.trim()
            ? entry.site.trim()
            : detectCaptureSite(url || pageUrl),
        authorHandle:
          typeof entry.authorHandle === "string"
            ? entry.authorHandle.trim()
            : "",
        createdAt:
          typeof entry.createdAt === "string"
            ? entry.createdAt
            : new Date().toISOString(),
        source:
          typeof entry.source === "string" && entry.source.trim()
            ? entry.source.trim()
            : "manual",
      };
    })
    .filter(Boolean);
}

function validateImportPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return { ok: false, message: "JSON root must be an object." };
  }

  const bookmarksTree = Array.isArray(payload.bookmarksTree)
    ? normalizeImportedBookmarksTree(payload.bookmarksTree)
    : null;
  const sessions = Array.isArray(payload.sessions)
    ? normalizeImportedSessions(payload.sessions)
    : null;
  const savedPages = Array.isArray(payload.savedPages)
    ? normalizeImportedSavedPages(payload.savedPages)
    : null;
  const localEntries = Array.isArray(payload.localEntries)
    ? normalizeImportedLocalEntries(payload.localEntries)
    : null;
  const reminders = Array.isArray(payload.reminders)
    ? normalizeImportedReminders(payload.reminders)
    : null;
  const bookmarkStats = normalizeImportedBookmarkStats(payload.bookmarkStats);
  const pinnedUrls = normalizeImportedPinnedUrls(payload.pinnedUrls);
  const hiddenBookmarkIds = Array.isArray(payload.hiddenBookmarkIds)
    ? payload.hiddenBookmarkIds.filter((value) => typeof value === "string")
    : [];
  const bookmarkFolderOverrides =
    payload.bookmarkFolderOverrides &&
    typeof payload.bookmarkFolderOverrides === "object" &&
    !Array.isArray(payload.bookmarkFolderOverrides)
      ? payload.bookmarkFolderOverrides
      : {};
  const bookmarkTitleOverrides =
    payload.bookmarkTitleOverrides &&
    typeof payload.bookmarkTitleOverrides === "object" &&
    !Array.isArray(payload.bookmarkTitleOverrides)
      ? payload.bookmarkTitleOverrides
      : {};

  if (
    !bookmarksTree &&
    !sessions &&
    !savedPages &&
    !localEntries &&
    !reminders &&
    Object.keys(bookmarkStats).length === 0
  ) {
    return {
      ok: false,
      message:
        "Missing bookmarksTree, sessions, savedPages, localEntries, reminders, or bookmarkStats.",
    };
  }

  return {
    ok: true,
    bookmarksTree: collapseSingleContainerRoot(bookmarksTree || []),
    sessions: sessions || [],
    savedPages: savedPages || [],
    localEntries: localEntries || [],
    reminders: reminders || [],
    bookmarkStats,
    pinnedUrls,
    hiddenBookmarkIds,
    bookmarkFolderOverrides,
    bookmarkTitleOverrides,
  };
}

async function readStorage() {
  const data = await chrome.storage.local.get(STORAGE_KEY);
  return (
    data[STORAGE_KEY] || {
      sessions: [],
      savedPages: [],
      localEntries: [],
      reminders: [],
      bookmarkStats: {},
      pinnedUrls: [],
      socialDomains: [],
      hiddenBookmarkIds: [],
      bookmarkFolderOverrides: {},
      bookmarkTitleOverrides: {},
      settings: normalizeSettings(),
      sortMode: "newest",
      domainView: "all",
      lastReminderEvent: null,
    }
  );
}

async function writeStorage() {
  await chrome.storage.local.set({
    [STORAGE_KEY]: {
      sessions: state.sessions,
      savedPages: state.savedPages,
      localEntries: state.localEntries,
      reminders: state.reminders,
      bookmarkStats: state.bookmarkStats,
      pinnedUrls: state.pinnedUrls,
      socialDomains: state.socialDomains,
      hiddenBookmarkIds: state.hiddenBookmarkIds,
      bookmarkFolderOverrides: state.bookmarkFolderOverrides,
      bookmarkTitleOverrides: state.bookmarkTitleOverrides,
      settings: state.settings,
      pinFilter: state.pinFilter,
      domainView: state.domainView,
      sortMode: state.sortMode,
      lastReminderEvent: state.lastReminderEvent,
    },
  });
}

async function syncReminderWorker() {
  return undefined;
}

async function loadState() {
  const [bookmarksTreeRaw, stored] = await Promise.all([
    chrome.bookmarks.getTree(),
    readStorage(),
  ]);

  state.bookmarksTree = collapseSingleContainerRoot(
    normalizeBookmarkNodes(bookmarksTreeRaw[0]?.children || []),
  );
  state.sessions = stored.sessions || [];
  state.savedPages = stored.savedPages || [];
  state.localEntries = normalizeImportedLocalEntries(stored.localEntries || []);
  state.reminders = normalizeImportedReminders(stored.reminders || []);
  state.bookmarkStats = normalizeImportedBookmarkStats(stored.bookmarkStats);
  state.pinnedUrls = normalizeImportedPinnedUrls(stored.pinnedUrls);
  state.socialDomains = Array.isArray(stored.socialDomains)
    ? stored.socialDomains.filter((value) => typeof value === "string")
    : [];
  state.hiddenBookmarkIds = Array.isArray(stored.hiddenBookmarkIds)
    ? stored.hiddenBookmarkIds.filter((value) => typeof value === "string")
    : [];
  state.bookmarkFolderOverrides =
    stored.bookmarkFolderOverrides &&
    typeof stored.bookmarkFolderOverrides === "object" &&
    !Array.isArray(stored.bookmarkFolderOverrides)
      ? stored.bookmarkFolderOverrides
      : {};
  state.bookmarkTitleOverrides =
    stored.bookmarkTitleOverrides &&
    typeof stored.bookmarkTitleOverrides === "object" &&
    !Array.isArray(stored.bookmarkTitleOverrides)
      ? stored.bookmarkTitleOverrides
      : {};
  state.pinFilter = stored.pinFilter || "all";
  state.domainView = ["all", "social", "accounts"].includes(stored.domainView)
    ? stored.domainView
    : "all";
  state.sortMode = stored.sortMode || "newest";
  state.lastReminderEvent = stored.lastReminderEvent || null;
  state.settings = normalizeSettings(stored.settings || {});
  setStatus("", "success");
  render();
}

async function exportJson() {
  const payload = {
    version: 1,
    schema: "urlsai.shortcuts",
    exportedAt: new Date().toISOString(),
    source: {
      app: "chrome-bookmark-manager",
      platform: "chrome-extension",
      browser: "chrome",
    },
    bookmarksTree: state.bookmarksTree,
    sessions: state.sessions,
    savedPages: state.savedPages,
    localEntries: state.localEntries,
    reminders: state.reminders,
    bookmarkStats: state.bookmarkStats,
    pinnedUrls: state.pinnedUrls,
    socialDomains: state.socialDomains,
    hiddenBookmarkIds: state.hiddenBookmarkIds,
    bookmarkFolderOverrides: state.bookmarkFolderOverrides,
    bookmarkTitleOverrides: state.bookmarkTitleOverrides,
    settings: state.settings,
    meta: {
      bookmarkCount: flattenBookmarks(state.bookmarksTree).length,
      sessionCount: state.sessions.length,
      savedPageCount: state.savedPages.length,
      localEntryCount: state.localEntries.length,
      reminderCount: state.reminders.length,
      trackedOpenCount: Object.keys(state.bookmarkStats).length,
    },
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  await chrome.downloads.download({
    url,
    filename: "urlsai-bookmarks-tab.json",
    saveAs: true,
  });
  URL.revokeObjectURL(url);
  setStatus("Bookmarks JSON exported.", "success");
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
      .sort(
        (left, right) => (right.lastAccessed || 0) - (left.lastAccessed || 0),
      )[0] || null
  );
}

function getLocalCaptureCounts() {
  return {
    all: state.localEntries.length,
    selection: state.localEntries.filter((entry) => entry.type === "selection").length,
    link: state.localEntries.filter((entry) => entry.type === "link").length,
    image: state.localEntries.filter((entry) => entry.type === "image").length,
    video: state.localEntries.filter((entry) => entry.type === "video").length,
    page: state.localEntries.filter((entry) => entry.type === "page").length,
  };
}

function prependLocalEntries(entries) {
  state.localEntries = [
    ...normalizeImportedLocalEntries(entries),
    ...state.localEntries,
  ].slice(0, 1000);
}

async function saveLocalEntries(entries, successMessage) {
  const nextEntries = normalizeImportedLocalEntries(entries);
  if (nextEntries.length === 0) {
    setStatus("Nothing new was captured from this page.", "error");
    return;
  }
  prependLocalEntries(nextEntries);
  await writeStorage();
  setStatus(successMessage, "success");
  renderSettings();
}

async function exportLocalCapturesByType() {
  const selectedType = String(localCaptureExportSelect?.value || "all");
  const filteredEntries =
    selectedType === "all"
      ? state.localEntries
      : state.localEntries.filter((entry) => entry.type === selectedType);

  const payload = {
    exportedAt: new Date().toISOString(),
    exportScope: "localCaptures",
    selectedType,
    localEntries: filteredEntries,
    meta: {
      localEntryCount: filteredEntries.length,
    },
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  await chrome.downloads.download({
    url,
    filename: `local-captures-${selectedType}-${new Date().toISOString().slice(0, 10)}.json`,
    saveAs: true,
  });
  URL.revokeObjectURL(url);
  setStatus("Local Captures JSON exported.", "success");
}

async function captureCurrentPageAsLocalPage() {
  const activeTab = await queryPrimaryPageTab();

  if (!activeTab?.url || !isSupportedWebUrl(activeTab.url)) {
    setStatus("No supported webpage found in this window.", "error");
    return;
  }

  await saveLocalEntries(
    [
      {
        id: createId("local"),
        type: normalizeLocalCaptureType("page", activeTab.url, activeTab.url),
        title: activeTab.title || safeHostname(activeTab.url),
        url: activeTab.url,
        pageUrl: activeTab.url,
        selectionText: "",
        site: detectCaptureSite(activeTab.url),
        source: "current-page",
        createdAt: new Date().toISOString(),
      },
    ],
    "Current page saved to Local Captures.",
  );
}

async function savePrivatePage() {
  const activeTab = await queryPrimaryPageTab();

  if (!activeTab?.url || !isSupportedWebUrl(activeTab.url)) {
    setStatus("No supported webpage found in this window.", "error");
    return;
  }

  const savedPage = {
    id: createId("private"),
    type: "bookmark",
    title: activeTab.title || safeHostname(activeTab.url),
    url: activeTab.url,
    favIconUrl: activeTab.favIconUrl,
    folderPath: [],
    dateAdded: Date.now(),
  };

  state.savedPages = [savedPage, ...state.savedPages].slice(0, 500);
  state.settings.privacyModeEnabled = true;
  await writeStorage();
  setStatus("Page saved as a private bookmark.", "success");
  render();
}

async function recordBookmarkOpen(url) {
  const key = canonicalBookmarkUrl(url);
  const current = state.bookmarkStats[key] || {
    openCount: 0,
    lastOpenedAt: null,
  };

  state.bookmarkStats = {
    ...state.bookmarkStats,
    [key]: {
      openCount: current.openCount + 1,
      lastOpenedAt: new Date().toISOString(),
    },
  };

  await writeStorage();
}

async function openTrackedUrl(url) {
  await recordBookmarkOpen(url);
  await chrome.tabs.create({ url });
}

async function openBookmark(bookmark) {
  await recordBookmarkOpen(bookmark.url);
  await chrome.tabs.create({ url: bookmark.url });
  if (
    state.pinFilter !== "all" ||
    state.sortMode === "recent-opened" ||
    state.sortMode === "most-opened"
  ) {
    render();
  }
}

async function saveWindow() {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const sessionTabs = tabs
    .filter((tab) => isSupportedWebUrl(tab.url || ""))
    .map((tab) => ({
      id: String(tab.id || createId("tab")),
      title: tab.title || safeHostname(tab.url || ""),
      url: tab.url,
      favIconUrl: tab.favIconUrl,
      pinned: !!tab.pinned,
      groupId: -1,
      groupTitle: null,
      index: tab.index || 0,
    }));

  if (sessionTabs.length === 0) {
    setStatus("No supported http/https tabs in the current window.", "error");
    return;
  }

  state.sessions = [
    {
      id: createId("session"),
      type: "session",
      title: `Window ${new Date().toLocaleString()}`,
      createdAt: new Date().toISOString(),
      windowScope: "currentWindow",
      tabs: sessionTabs,
    },
    ...state.sessions,
  ].slice(0, 50);

  await writeStorage();
  setStatus(`Saved ${sessionTabs.length} tabs as a new session.`, "success");
  render();
}

async function openSessionInNewWindow(session) {
  const urls = session.tabs
    .map((tab) => tab.url)
    .filter((url) => isSupportedWebUrl(url || ""));

  if (urls.length === 0) {
    setStatus("No supported http/https tabs in this session.", "error");
    return;
  }

  await Promise.all(urls.map((url) => recordBookmarkOpen(url)));
  await chrome.windows.create({ url: urls });
}

async function deleteSession(sessionId) {
  state.sessions = state.sessions.filter((session) => session.id !== sessionId);
  await writeStorage();
  setStatus("Session deleted.", "success");
  render();
}

async function deletePrivateBookmark(bookmarkId) {
  state.savedPages = state.savedPages.filter(
    (bookmark) => bookmark.id !== bookmarkId,
  );
  await writeStorage();
  setStatus("Private bookmark deleted.", "success");
  render();
}

function reminderMatches(reminder) {
  const q = state.query.trim().toLowerCase();
  if (!q) return true;
  return (
    reminder.title.toLowerCase().includes(q) ||
    (reminder.url || "").toLowerCase().includes(q)
  );
}

function parseReminderDate(reminder) {
  return new Date(reminder.scheduledAt).getTime();
}

function isToday(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function isWithinNextSevenDays(timestamp) {
  const now = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 7);
  return timestamp >= now.getTime() && timestamp <= end.getTime();
}

function weekdayMatches(timestamp) {
  if (state.weekdayFilter === "all") return true;
  return String(new Date(timestamp).getDay()) === state.weekdayFilter;
}

function getReminderGroups() {
  const reminders = [...state.reminders]
    .filter(reminderMatches)
    .sort((left, right) => parseReminderDate(left) - parseReminderDate(right));

  const today = [];
  const week = [];
  const done = [];

  for (const reminder of reminders) {
    const timestamp = parseReminderDate(reminder);
    if (!weekdayMatches(timestamp) && reminder.status !== "done") continue;

    if (reminder.status === "done") {
      done.push(reminder);
      continue;
    }

    if (isToday(timestamp)) {
      today.push(reminder);
      continue;
    }

    if (isWithinNextSevenDays(timestamp)) {
      week.push(reminder);
    }
  }

  return { today, week, done };
}

async function addReminder() {
  const title = String(reminderTitleInput?.value || "").trim();
  const when = String(reminderDateInput?.value || "").trim();
  const url = String(reminderUrlInput?.value || "").trim();
  const limitedTime = reminderLimitedTimeCheckbox?.checked === true;
  const linkedSavedPageId =
    limitedTime && url
      ? (state.savedPages.find(
          (bookmark) =>
            canonicalBookmarkUrl(bookmark.url) === canonicalBookmarkUrl(url),
        )?.id ?? null)
      : null;

  if (!title) {
    setStatus("Reminder title is required.", "error");
    return;
  }

  const iso = when
    ? new Date(when).toISOString()
    : new Date().toISOString();
  if (Number.isNaN(new Date(iso).getTime())) {
    setStatus("Reminder time is invalid.", "error");
    return;
  }

  state.reminders = [
    {
      id: createId("reminder"),
      title,
      url,
      scheduledAt: iso,
      createdAt: new Date().toISOString(),
      status: "pending",
      limitedTime,
      linkedSavedPageId,
      lastNotifiedAt: null,
    },
    ...state.reminders,
  ];

  reminderTitleInput.value = "";
  reminderUrlInput.value = "";
  reminderDateInput.value = "";
  if (reminderLimitedTimeCheckbox) reminderLimitedTimeCheckbox.checked = false;

  await writeStorage();
  setStatus("Reminder saved locally.", "success");
  render();
}

async function addTestReminder() {
  reminderTitleInput.value = "Manual reminder";
  reminderDateInput.value = "";
  reminderUrlInput.value = "";
  setStatus("Fill the reminder and save it locally.", "success");
}

async function useCurrentPageForReminder() {
  const activeTab = await queryPrimaryPageTab();
  if (!activeTab?.url || !isSupportedWebUrl(activeTab.url)) {
    setStatus("No supported webpage found in this window.", "error");
    return;
  }

  reminderTitleInput.value = activeTab.title || safeHostname(activeTab.url);
  reminderUrlInput.value = activeTab.url;
}

async function snoozeReminder(reminderId, minutes) {
  state.reminders = state.reminders.map((reminder) => {
    if (reminder.id !== reminderId) return reminder;
    return {
      ...reminder,
      status: "pending",
      scheduledAt: new Date(Date.now() + minutes * 60 * 1000).toISOString(),
    };
  });
  await writeStorage();
  setStatus(`Reminder snoozed for ${minutes} minutes.`, "success");
  render();
}

async function markReminderDone(reminderId) {
  state.reminders = state.reminders.map((reminder) =>
    reminder.id === reminderId
      ? {
          ...reminder,
          status: "done",
          lastNotifiedAt: new Date().toISOString(),
        }
      : reminder,
  );
  await writeStorage();
  setStatus("Reminder marked done.", "success");
  render();
}

async function deleteReminder(reminderId) {
  state.reminders = state.reminders.filter(
    (reminder) => reminder.id !== reminderId,
  );
  await writeStorage();
  setStatus("Reminder deleted.", "success");
  render();
}

function getCurrentFolderItems() {
  if (state.activeTab === "captures") {
    return collectCaptureItems();
  }
  if (state.activeTab === "domain") {
    const allTitle =
      state.domainView === "social"
        ? "All Social"
        : state.domainView === "accounts"
          ? "All Accounts"
          : "All Domains";
    const bookmarks = buildBookmarkRows(flattenBookmarks(state.bookmarksTree));
    if (state.domainView === "social") {
      return collectSocialDomainItems(
        bookmarks.filter((bookmark) => isSocialBookmark(bookmark)),
      );
    }
    if (state.domainView === "accounts") {
      return collectSocialDomainItems(
        bookmarks.filter(
          (bookmark) =>
            isSocialBookmark(bookmark) && isSocialAccountBookmark(bookmark),
        ),
      ).map((item) => ({
        ...item,
        title: item.id === "all" ? allTitle : item.title,
      }));
    }
    return collectDomainItems(
      bookmarks,
      allTitle,
    );
  }
  if (state.activeTab === "private") {
    return collectDomainItems(getPrivateBookmarks(), "All Private");
  }
  return collectFolders(state.bookmarksTree);
}

function getBookmarkRowsForActiveTab() {
  if (state.activeTab === "captures") {
    const query = state.query.trim().toLowerCase();
    let entries = state.localEntries.filter((entry) => {
      if (
        state.selectedFolderId !== "all" &&
        entry.type !== state.selectedFolderId
      ) {
        return false;
      }
      return (
        !query ||
        entry.title.toLowerCase().includes(query) ||
        entry.url.toLowerCase().includes(query) ||
        entry.selectionText.toLowerCase().includes(query)
      );
    });

    if (state.pinFilter === "pinned") {
      entries = entries.filter((entry) => isPinnedBookmark(entry));
    } else if (state.pinFilter === "unpinned") {
      entries = entries.filter((entry) => !isPinnedBookmark(entry));
    }

    if (state.sortMode === "az") {
      entries.sort((left, right) => left.title.localeCompare(right.title));
    } else if (state.sortMode === "oldest") {
      entries.sort((left, right) => left.createdAt.localeCompare(right.createdAt));
    } else {
      entries.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
    }

    return state.selectedFolderId === "all"
      ? entries
      : entries.filter((entry) => entry.type === state.selectedFolderId);
  }
  if (state.activeTab === "domain") {
    const bookmarks = buildBookmarkRows(flattenBookmarks(state.bookmarksTree));
    return state.selectedFolderId === "all"
      ? bookmarks
      : bookmarks.filter(
          (bookmark) => getRootDomain(bookmark.url) === state.selectedFolderId,
        );
  }

  if (state.activeTab === "private") {
    const bookmarks = getPrivateBookmarks();
    return state.selectedFolderId === "all"
      ? bookmarks
      : bookmarks.filter(
          (bookmark) => getRootDomain(bookmark.url) === state.selectedFolderId,
        );
  }

  return buildBookmarkRows(
    findFolderBookmarks(state.bookmarksTree, state.selectedFolderId),
  );
}

function renderFolders() {
  const folders = getCurrentFolderItems();
  if (!folders.some((folder) => folder.id === state.selectedFolderId)) {
    state.selectedFolderId = "all";
  }

  folderHeading.textContent = "";

  folderList.innerHTML = "";
  if (foldersFooter) {
    foldersFooter.innerHTML = "";
  }
  for (const folder of folders) {
    const button = document.createElement("button");
    button.className = `folderButton ${state.selectedFolderId === folder.id ? "active" : ""}`;
    button.title = folder.title;
    button.innerHTML = `<span class="folderLabel">${escapeHtml(
      folder.title,
    )}</span><span class="folderCount">${folder.count}</span>`;
    button.addEventListener("click", () => {
      state.selectedFolderId = folder.id;
      render();
    });
    folderList.appendChild(button);
  }

  if (
    state.activeTab === "domain" &&
    foldersFooter
  ) {
    const addDomainButton = document.createElement("button");
    addDomainButton.type = "button";
    addDomainButton.className = "filterChip";
    addDomainButton.textContent = "Add Domain";
    addDomainButton.addEventListener("click", async () => {
      const nextDomain = globalThis.prompt
        ?.("Add social domain", "")
        ?.trim()
        .toLowerCase()
        .replace(/^www\./, "");
      if (!nextDomain) return;
      state.socialDomains = Array.from(
        new Set([...state.socialDomains, nextDomain]),
      ).sort();
      await writeStorage();
      setStatus(`${nextDomain} added to Social.`, "success");
      render();
    });
    foldersFooter.appendChild(addDomainButton);
  }
}

function getMoveTargetOptions() {
  return collectFolders(state.bookmarksTree).filter((folder) => folder.id !== "all");
}

function renderViewFilters() {
  const isDomainView = state.activeTab === "domain";
  const filters = isDomainView
    ? [
        ["all", "pinFilterAll"],
        ["social", "domainFilterSocial"],
        ["accounts", "domainFilterAccounts"],
      ]
    : [
        ["all", "pinFilterAll"],
        ["pinned", "pinFilterPinned"],
        ["unpinned", "pinFilterUnpinned"],
      ];

  viewFilterButtons.forEach((button, index) => {
    const [value, messageKey] = filters[index];
    button.dataset.viewFilter = value;
    button.textContent = globalThis.__urlsaiGetMessage?.(messageKey) || messageKey;
    button.classList.toggle(
      "active",
      value === (isDomainView ? state.domainView : state.pinFilter),
    );
  });
}

function selectedBookmarksDraft(bookmarks) {
  if (state.selectedBookmarkIds.length !== 1) return "";
  const selected = bookmarks.find(
    (bookmark) => bookmark.id === state.selectedBookmarkIds[0],
  );
  return selected?.title || "";
}

function renderSelectionToolbar(bookmarks, summaryLabel = "Bookmarks") {
  if (!selectionToolbar) return;
  const visibleIds = bookmarks.map((bookmark) => bookmark.id);
  state.selectedBookmarkIds = state.selectedBookmarkIds.filter((bookmarkId) =>
    visibleIds.includes(bookmarkId),
  );
  const selectedBookmarks = bookmarks.filter((bookmark) =>
    state.selectedBookmarkIds.includes(bookmark.id),
  );

  if (
    selectedBookmarks.length === 0 ||
    state.activeTab === "sessions" ||
    state.activeTab === "reminders" ||
    state.activeTab === "settings"
  ) {
    selectionToolbar.classList.add("hidden");
    selectionToolbar.innerHTML = "";
    return;
  }
  const allVisibleSelected =
    bookmarks.length > 0 && selectedBookmarks.length === bookmarks.length;
  const isCaptureTab = state.activeTab === "captures";
  const deleteActionLabel =
    state.activeTab === "private" || isCaptureTab ? "Delete" : "Hide";
  const moveOptions = getMoveTargetOptions();
  const moveOptionsMarkup = moveOptions
    .map(
      (folder) =>
        `<option value="${escapeHtml(folder.id)}" ${
          state.moveTargetId === folder.id ? "selected" : ""
        }>${escapeHtml(folder.title)}</option>`,
    )
    .join("");

  selectionToolbar.classList.remove("hidden");
  selectionToolbar.innerHTML = `
    <div class="selectionToolbarInner">
      <div class="selectionSummaryBlock">
        <div class="selectionSummary">
          ${
            selectedBookmarks.length > 0
              ? `${selectedBookmarks.length} selected in ${escapeHtml(summaryLabel)}`
              : `${bookmarks.length} visible`
          }
        </div>
      </div>
      <div class="selectionActions">
        ${
          selectedBookmarks.length === 1
            ? `
              <input type="text" class="selectionInput" id="selectionRenameInput" placeholder="Rename bookmark" value="${escapeHtml(state.renameDraft || selectedBookmarks[0].title)}" />
              <button type="button" class="btn btn-outline selectionBtn" data-selection-action="rename">Rename</button>
            `
            : ""
        }
        ${
          selectedBookmarks.length > 0
            ? `
              <button type="button" class="btn btn-outline selectionBtn" data-selection-action="pin">Pin</button>
              ${
                isCaptureTab
                  ? ""
                  : `<select class="selectionSelect" id="selectionMoveTarget">${moveOptionsMarkup}</select><button type="button" class="btn btn-outline selectionBtn" data-selection-action="move">Move</button>`
              }
              <button type="button" class="btn btn-outline selectionBtn" data-selection-action="delete">${deleteActionLabel}</button>
              <button type="button" class="btn btn-outline selectionBtn" data-selection-action="clear">Clear Selection</button>
              <button type="button" class="btn btn-outline selectionBtn" data-selection-action="select-visible">
                ${allVisibleSelected ? "Clear Visible" : "Select All"}
              </button>
            `
            : ""
        }
      </div>
    </div>
  `;

  selectionToolbar
    .querySelector('[data-selection-action="select-visible"]')
    ?.addEventListener("click", () => {
      state.selectedBookmarkIds = allVisibleSelected ? [] : visibleIds;
      render();
    });

  selectionToolbar
    .querySelector("#selectionRenameInput")
    ?.addEventListener("input", (event) => {
      state.renameDraft = event.target.value;
    });

  selectionToolbar
    .querySelector("#selectionMoveTarget")
    ?.addEventListener("change", (event) => {
      state.moveTargetId = event.target.value;
    });

  selectionToolbar
    .querySelector('[data-selection-action="rename"]')
    ?.addEventListener("click", async () => {
      const bookmark = selectedBookmarks[0];
      const nextTitle = String(state.renameDraft || "").trim();
      if (!bookmark || !nextTitle) return;
      if (isCaptureTab) {
        state.localEntries = state.localEntries.map((entry) =>
          entry.id === bookmark.id ? { ...entry, title: nextTitle } : entry,
        );
      } else {
        state.bookmarkTitleOverrides = {
          ...state.bookmarkTitleOverrides,
          [bookmark.id]: nextTitle,
        };
      }
      await writeStorage();
      setStatus("Bookmark title updated locally.", "success");
      render();
    });

  selectionToolbar
    .querySelector('[data-selection-action="pin"]')
    ?.addEventListener("click", async () => {
      await togglePinnedBookmarksByIds(state.selectedBookmarkIds);
      render();
    });

  selectionToolbar
    .querySelector('[data-selection-action="move"]')
    ?.addEventListener("click", async () => {
      if (state.selectedBookmarkIds.length === 0 || !state.moveTargetId) return;
      state.bookmarkFolderOverrides = {
        ...state.bookmarkFolderOverrides,
        ...Object.fromEntries(
          state.selectedBookmarkIds.map((bookmarkId) => [
            bookmarkId,
            state.moveTargetId,
          ]),
        ),
      };
      await writeStorage();
      setStatus("Selected bookmarks moved locally.", "success");
      render();
    });

  selectionToolbar
    .querySelector('[data-selection-action="delete"]')
    ?.addEventListener("click", async () => {
      if (state.selectedBookmarkIds.length === 0) return;
      if (state.activeTab === "private") {
        state.savedPages = state.savedPages.filter(
          (bookmark) => !state.selectedBookmarkIds.includes(bookmark.id),
        );
      } else if (isCaptureTab) {
        state.localEntries = state.localEntries.filter(
          (entry) => !state.selectedBookmarkIds.includes(entry.id),
        );
      } else {
        state.hiddenBookmarkIds = Array.from(
          new Set([...state.hiddenBookmarkIds, ...state.selectedBookmarkIds]),
        );
      }
      state.selectedBookmarkIds = [];
      await writeStorage();
      setStatus(
        state.activeTab === "private"
          ? "Selected private bookmarks deleted."
          : isCaptureTab
            ? "Selected local captures deleted."
            : "Selected bookmarks hidden locally.",
        "success",
      );
      render();
    });

  selectionToolbar
    .querySelector('[data-selection-action="clear"]')
    ?.addEventListener("click", () => {
      state.selectedBookmarkIds = [];
      state.renameDraft = "";
      render();
    });
}

function getBookmarkPanelContext() {
  if (state.activeTab === "captures") {
    return {
      summaryLabel: "Captures",
      emptyMessage: "No local captures matched here yet.",
      bookmarks: getBookmarkRowsForActiveTab(),
    };
  }
  if (state.activeTab === "domain") {
    return {
      summaryLabel: "Domains",
      emptyMessage: "No domain bookmarks matched here yet.",
      bookmarks: getBookmarkRowsForActiveTab(),
    };
  }

  if (state.activeTab === "private") {
    return {
      summaryLabel: "Private",
      emptyMessage: "No private bookmarks yet.",
      bookmarks: getBookmarkRowsForActiveTab(),
    };
  }

  return {
    summaryLabel: "Bookmarks",
    emptyMessage: "No bookmarks found.",
    bookmarks: getBookmarkRowsForActiveTab(),
  };
}

function createBookmarkRow(bookmark) {
  const row = document.createElement("div");
  const faviconMarkup = renderFaviconMarkup(
    bookmark.url,
    bookmark.favIconUrl,
    bookmark.title,
    "railSiteIcon",
  );

  if (isPopupMode) {
    row.className = "bookmarkCard bookmarkCardClickable";
    row.title = `${bookmark.title}\n${bookmark.url}`;
    row.innerHTML = `
      <div class="cardText">
        <div class="cardTitle">${escapeHtml(bookmark.title)}</div>
        <div class="cardUrlText">${escapeHtml(bookmark.url)}</div>
      </div>
      <div class="captureRail">
        <div class="capturePreviewSlot">${faviconMarkup}</div>
        <div class="captureActions">
          <button class="rowAction cardAction pinAction" data-action="pin" title="${
            isPinnedBookmark(bookmark) ? "Unpin bookmark" : "Pin bookmark"
          }">${isPinnedBookmark(bookmark) ? "★" : "☆"}</button>
          <label class="selectToggle" title="Select bookmark">
            <input type="checkbox" data-action="select" ${
              state.selectedBookmarkIds.includes(bookmark.id) ? "checked" : ""
            } />
            <span>✓</span>
          </label>
        </div>
      </div>
    `;
    return row;
  }

  row.className = "bookmarkRow bookmarkRowClickable";
  row.title = `${bookmark.title}\n${bookmark.url}`;
  row.innerHTML = `
    <div class="rowMeta">
      <div class="rowTitle">${escapeHtml(bookmark.title)}</div>
      <div class="rowSub">${escapeHtml(bookmark.url)}</div>
    </div>
    <div class="captureRail">
      <div class="capturePreviewSlot">${faviconMarkup}</div>
      <div class="captureActions">
        <button class="rowAction pinAction" data-action="pin" title="${
          isPinnedBookmark(bookmark) ? "Unpin bookmark" : "Pin bookmark"
        }">${isPinnedBookmark(bookmark) ? "★" : "☆"}</button>
        <label class="selectToggle" title="Select bookmark">
          <input type="checkbox" data-action="select" ${
            state.selectedBookmarkIds.includes(bookmark.id) ? "checked" : ""
          } />
          <span>✓</span>
        </label>
      </div>
    </div>
  `;
  return row;
}

function attachBookmarkRowEvents(row, bookmark) {
  row.addEventListener("click", () => {
    void openBookmark(bookmark);
  });
  row.querySelector(".selectToggle")?.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  row.querySelector('[data-action="select"]').addEventListener("click", (event) => {
    event.stopPropagation();
    if (event.target.checked) {
      state.selectedBookmarkIds = Array.from(
        new Set([...state.selectedBookmarkIds, bookmark.id]),
      );
    } else {
      state.selectedBookmarkIds = state.selectedBookmarkIds.filter(
        (bookmarkId) => bookmarkId !== bookmark.id,
      );
    }
    render();
  });
  row.querySelector('[data-action="pin"]')?.addEventListener("click", async (event) => {
    event.stopPropagation();
    await togglePinnedBookmark(bookmark);
  });
}

function createCaptureRow(entry) {
  const row = document.createElement("div");
  const targetUrl = getCaptureUrl(entry);
  const previewUrl =
    entry.type === "image"
      ? entry.mediaUrl || entry.url
      : "";
  const previewMarkup = previewUrl
    ? `<button type="button" class="capturePreviewButton" data-action="preview" title="Preview image"><img class="capturePreview" src="${escapeHtml(previewUrl)}" alt="" loading="lazy" /></button>`
    : entry.type === "selection"
      ? `<button type="button" class="capturePreviewButton captureTypeIcon" data-action="preview" title="Preview text">T</button>`
      : renderFaviconMarkup(targetUrl, "", entry.title, "captureSiteIcon");
  const detail =
    entry.type === "selection"
      ? entry.selectionText
      : targetUrl;
  const rowClass = isPopupMode ? "bookmarkCard captureCard" : "bookmarkRow captureRow";
  row.className = rowClass;
  row.title = `${entry.title}\n${detail}`;
  row.innerHTML = `
    <div class="captureBody">
      <div class="captureText">
        <div class="${isPopupMode ? "cardTitle" : "rowTitle"}">${escapeHtml(entry.title)}</div>
        <div class="${isPopupMode ? "cardUrl" : "rowSub"}">${escapeHtml(detail || getCaptureLabel(entry.type))}</div>
      </div>
    </div>
    <div class="captureRail">
      <div class="capturePreviewSlot">${previewMarkup}</div>
      <div class="captureActions">
        <button class="rowAction ${isPopupMode ? "cardAction" : ""} pinAction" data-action="pin" title="${isPinnedBookmark(entry) ? "Unpin capture" : "Pin capture"}">${isPinnedBookmark(entry) ? "★" : "☆"}</button>
        <label class="selectToggle" title="Select capture">
          <input type="checkbox" data-action="select" ${state.selectedBookmarkIds.includes(entry.id) ? "checked" : ""} />
          <span>✓</span>
        </label>
      </div>
    </div>
  `;
  return row;
}

function showCapturePreview(url, title) {
  if (!url) return;
  const overlay = document.createElement("div");
  overlay.className = "capturePreviewOverlay";
  overlay.innerHTML = `<button type="button" class="capturePreviewClose" aria-label="Close preview">×</button><img src="${escapeHtml(url)}" alt="${escapeHtml(title)}" />`;
  overlay.addEventListener("click", () => overlay.remove());
  overlay.querySelector("img")?.addEventListener("click", (event) => event.stopPropagation());
  document.body.appendChild(overlay);
}

function showCaptureTextPreview(text, title) {
  if (!text) return;
  const overlay = document.createElement("div");
  overlay.className = "capturePreviewOverlay";
  overlay.innerHTML = `<button type="button" class="capturePreviewClose" aria-label="Close preview">×</button><div class="captureTextPreview"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p></div>`;
  overlay.addEventListener("click", () => overlay.remove());
  overlay.querySelector(".captureTextPreview")?.addEventListener("click", (event) => event.stopPropagation());
  document.body.appendChild(overlay);
}

function attachCaptureRowEvents(row, entry) {
  const targetUrl = getCaptureUrl(entry);
  row.addEventListener("click", () => {
    if (entry.type === "selection" && entry.selectionText) {
      showCaptureTextPreview(entry.selectionText, entry.title);
      return;
    }
    if (entry.type === "image" && (entry.mediaUrl || entry.url)) {
      showCapturePreview(entry.mediaUrl || entry.url, entry.title);
      return;
    }
    if (targetUrl) void openTrackedUrl(targetUrl);
  });
  row.querySelector('[data-action="preview"]')?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (entry.type === "selection") {
      showCaptureTextPreview(entry.selectionText, entry.title);
    } else {
      showCapturePreview(entry.mediaUrl || entry.url, entry.title);
    }
  });
  row.querySelector(".selectToggle")?.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  row.querySelector('[data-action="select"]')?.addEventListener("click", (event) => {
    event.stopPropagation();
    state.selectedBookmarkIds = event.target.checked
      ? Array.from(new Set([...state.selectedBookmarkIds, entry.id]))
      : state.selectedBookmarkIds.filter((id) => id !== entry.id);
    render();
  });
  row.querySelector('[data-action="pin"]')?.addEventListener("click", async (event) => {
    event.stopPropagation();
    await togglePinnedBookmark(entry);
  });
}

function renderBookmarkCollection({ bookmarks, emptyMessage, summaryLabel }) {
  bookmarkTitle.textContent = "";
  bookmarkCount.textContent = "";
  bookmarkList.innerHTML = "";
  bookmarkList.className = isPopupMode ? "list popupCardGrid" : "list";
  if (isPopupMode && state.settings.cardDensity === "2-column") {
    bookmarkList.classList.add("popupCardGrid--twoColumn");
  }
  state.renameDraft = selectedBookmarksDraft(bookmarks);

  if (bookmarks.length === 0) {
    bookmarkList.innerHTML = `<div class="rowSub">${emptyMessage}</div>`;
    renderSelectionToolbar([], summaryLabel);
    return;
  }

  for (const bookmark of bookmarks) {
    const row =
      state.activeTab === "captures"
        ? createCaptureRow(bookmark)
        : createBookmarkRow(bookmark);
    if (state.activeTab === "captures") {
      attachCaptureRowEvents(row, bookmark);
    } else {
      attachBookmarkRowEvents(row, bookmark);
      attachImageFallbacks(row);
    }
    bookmarkList.appendChild(row);
  }

  bookmarkTitle.parentElement?.classList.add("hidden");
  renderSelectionToolbar(bookmarks, summaryLabel);
}

function renderBookmarksTab() {
  const context = getBookmarkPanelContext();
  const bookmarks =
    isNewtabMode && state.newtabWorkspaceOpen
      ? context.bookmarks.slice(0, NEWTAB_LIBRARY_LIMIT)
      : context.bookmarks;

  renderBookmarkCollection({
    ...context,
    bookmarks,
  });
}

function renderSessionsTab() {
  renderSessions();
}

function renderRemindersTab() {
  renderReminders();
}

function renderSessions() {
  const q = state.query.trim().toLowerCase();
  const sessions = state.sessions.filter(
    (session) => !q || session.title.toLowerCase().includes(q),
  );
  const rows =
    isNewtabMode && state.newtabWorkspaceOpen
      ? sessions.slice(0, NEWTAB_LIBRARY_LIMIT)
      : sessions;

  sessionList.innerHTML = "";
  sessionList.className = isPopupMode ? "list popupSessionList" : "list";

  if (rows.length === 0) {
    sessionList.innerHTML = `<div class="rowSub">No sessions saved yet.</div>`;
    return;
  }

  for (const session of rows) {
    const previews = session.tabs
      .slice(0, 4)
      .map((tab) =>
        renderFaviconMarkup(tab.url, tab.favIconUrl, tab.title, "avatar"),
      )
      .join("");
    const extraCount =
      session.tabs.length > 4
        ? `<span class="badge">+${session.tabs.length - 4}</span>`
        : "";

    const row = document.createElement("div");
    if (isPopupMode) {
      row.className = "sessionCard";
      row.innerHTML = `
        <div class="cardTop">
          <div class="cardText">
            <div class="cardTitle">${escapeHtml(session.title)}</div>
            <div class="cardUrl">${escapeHtml(
            `${new Date(session.createdAt).toLocaleDateString()} · ${session.tabs.length} tabs`,
          )}</div>
          </div>
          <div class="rowActions">
            <button class="rowAction cardAction" data-action="open" title="Open in new tabs">↗</button>
          </div>
        </div>
        <div class="badges">${previews}${extraCount}</div>
      `;
    } else {
      row.className = "sessionRow";
      row.innerHTML = `
        <div class="rowMeta">
          <div class="rowTitle">${escapeHtml(session.title)}</div>
          <div class="rowSub">${escapeHtml(
            `${new Date(session.createdAt).toLocaleDateString()} · ${session.tabs.length} tabs`,
          )}</div>
          <div class="badges">${previews}${extraCount}</div>
        </div>
        <div class="rowActions">
          <button class="rowAction" data-action="open" title="Open in new tabs">↗</button>
        </div>
      `;
    }

    row.querySelector('[data-action="open"]').addEventListener("click", () => {
      void Promise.all(session.tabs.map((tab) => openTrackedUrl(tab.url)));
    });

    attachImageFallbacks(row);
    sessionList.appendChild(row);
  }
}

function renderWeekdayFilter() {
  if (!weekdayFilter) return;
  weekdayFilter.innerHTML = WEEKDAY_LABELS.map(
    (item) =>
      `<button type="button" class="weekdayPill ${
        state.weekdayFilter === item.id ? "active" : ""
      }" data-weekday="${item.id}">${item.label}</button>`,
  ).join("");

  for (const button of weekdayFilter.querySelectorAll("[data-weekday]")) {
    button.addEventListener("click", () => {
      state.weekdayFilter = button.dataset.weekday;
      renderReminders();
      renderWeekdayFilter();
    });
  }
}

function renderReminderCard(reminder) {
  const timestamp = parseReminderDate(reminder);
  const whenLabel = new Date(timestamp).toLocaleString();
  const urlLine = reminder.url
    ? `<div class="reminderMeta">${escapeHtml(reminder.url)}</div>`
    : "";
  const limitedTag = reminder.limitedTime
    ? `<div class="reminderMeta">Limited-time</div>`
    : "";

  const container = document.createElement("div");
  container.className = "reminderCard";
  container.innerHTML = `
    <div class="reminderHeader">
      <div>
        <div class="reminderTitle">${escapeHtml(reminder.title)}</div>
        <div class="reminderMeta">${escapeHtml(whenLabel)}</div>
        ${urlLine}
        ${limitedTag}
      </div>
    </div>
    <div class="reminderActions">
      ${
        reminder.url
          ? '<button type="button" class="miniButton" data-action="open">Open</button>'
          : ""
      }
      ${
        reminder.status === "pending"
          ? `
            <button type="button" class="miniButton" data-action="done">Done</button>
          `
          : ""
      }
      <button type="button" class="miniButton danger" data-action="delete">Delete</button>
    </div>
  `;

  container
    .querySelector('[data-action="open"]')
    ?.addEventListener("click", () => {
      void openTrackedUrl(reminder.url);
    });
  container
    .querySelector('[data-action="done"]')
    ?.addEventListener("click", () => {
      void markReminderDone(reminder.id);
    });
  container
    .querySelector('[data-action="delete"]')
    ?.addEventListener("click", () => {
      void deleteReminder(reminder.id);
    });
  return container;
}

function renderReminderList(container, reminders, emptyText) {
  if (!container) return;
  container.innerHTML = "";
  if (reminders.length === 0) {
    container.innerHTML = `<div class="rowSub">${emptyText}</div>`;
    return;
  }
  for (const reminder of reminders) {
    container.appendChild(renderReminderCard(reminder));
  }
}

function renderReminderDebug() {
  if (!reminderDebug) return;
  reminderDebug.textContent =
    "Reminders are stored locally and reviewed in this extension. No account or cloud sync required.";
  reminderDebug.className = "reminderDebug";
}

function renderReminderAlert() {
  if (!reminderAlert) return;

  const event = state.lastReminderEvent;
  const isVisible = !!event?.unread;
  reminderAlert.classList.toggle("hidden", !isVisible);

  if (!isVisible) {
    return;
  }

  const titlePrefix =
    event.status === "error" ? "Reminder Failed" : "Reminder Due";
  reminderAlertTitle.textContent = `${titlePrefix}: ${event.title}`;
  reminderAlertMeta.textContent = event.url
    ? event.url
    : `Triggered at ${new Date(event.firedAt).toLocaleString()}`;
  if (reminderAlertOpen) {
    reminderAlertOpen.textContent = event.url ? "Open" : "View";
  }
}

function renderReminders() {
  const groups = getReminderGroups();
  if (reminderCount) {
    reminderCount.textContent = String(
      groups.today.length + groups.week.length + groups.done.length,
    );
  }
  renderWeekdayFilter();
  renderReminderDebug();
  renderReminderList(todayReminders, groups.today, "No reminders for today.");
  renderReminderList(weekReminders, groups.week, "No reminders for this week.");
  renderReminderList(doneReminders, groups.done, "No completed reminders yet.");
}

function renderSettings() {
  if (enableNewtabCheckbox) {
    enableNewtabCheckbox.checked = !!state.settings.newtabEnabled;
  }
  if (privacyModeCheckbox) {
    privacyModeCheckbox.checked = !!state.settings.privacyModeEnabled;
  }
  if (hideDuplicateBookmarksCheckbox) {
    hideDuplicateBookmarksCheckbox.checked =
      !!state.settings.hideDuplicateBookmarks;
  }
  if (privateContextMenuCheckbox) {
    privateContextMenuCheckbox.checked =
      !!state.settings.privateContextMenuEnabled;
  }
  if (localCaptureContextMenuCheckbox) {
    localCaptureContextMenuCheckbox.checked =
      state.settings.localCaptureContextMenuEnabled !== false;
  }
  if (cardDensitySelect) {
    cardDensitySelect.value =
      state.settings.cardDensity === "2-column" ? "2-column" : "list";
  }
  const counts = getLocalCaptureCounts();
  if (localCapturesCountLabel) {
    localCapturesCountLabel.textContent = String(counts.all);
  }
  if (localCountText) {
    localCountText.textContent = `${counts.selection} Text`;
  }
  if (localCountLinks) {
    localCountLinks.textContent = `${counts.link} Links`;
  }
  if (localCountImages) {
    localCountImages.textContent = `${counts.image} Images`;
  }
  if (localCountVideos) {
    localCountVideos.textContent = `${counts.video} Videos`;
  }
  if (localCountPages) {
    localCountPages.textContent = `${counts.page} Pages`;
  }
}

async function refreshLiveTabGroups() {
  return [];
}

function setNewtabVoiceStatus(message, type = "idle") {
  if (!newtabVoiceStatus) return;
  newtabVoiceStatus.textContent = message;
  newtabVoiceStatus.className = `newtabVoiceStatus ${
    type === "error" ? "error" : type === "listening" ? "listening" : ""
  }`.trim();
}

function scrollToWorkspace() {
  newtabWorkspace?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openNewtabWorkspaceTab(tabId) {
  state.activeTab = tabId;
  state.selectedFolderId = "all";
  state.newtabWorkspaceOpen = true;
  if (newtabAppsToggle) {
    newtabAppsToggle.setAttribute("aria-expanded", "false");
  }
  newtabAppsPanel?.classList.add("hidden");
  render();
  scrollToWorkspace();
}

function matchesNewtabTopic(bookmark) {
  const preset = NEWTAB_TOPIC_PRESETS[state.newtabTopic];
  return preset.matcher(bookmark);
}

function getNewtabLaunchpadItems() {
  const seen = new Set();
  const items = [];

  for (const preset of DEFAULT_NEW_TAB_SHORTCUTS) {
    if (!preset.topics.includes(state.newtabTopic)) {
      continue;
    }
    const key = canonicalBookmarkUrl(preset.url);
    if (seen.has(key)) continue;
    seen.add(key);
      items.push({
        ...preset,
        type: "bookmark",
        favIconUrl: "",
        source: "preset",
        folderPath: [],
      });
    if (items.length >= 10) {
      return items;
    }
  }

  const publicBookmarks = maybeDedupeBookmarks(
    flattenBookmarks(state.bookmarksTree),
  )
    .filter((bookmark) => matchesNewtabTopic(bookmark))
    .sort((left, right) => {
      const openDelta =
        getBookmarkOpenCount(right) - getBookmarkOpenCount(left);
      if (openDelta !== 0) return openDelta;
      return (right.dateAdded || 0) - (left.dateAdded || 0);
    });

  for (const bookmark of publicBookmarks) {
    const key = canonicalBookmarkUrl(bookmark.url);
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({
      ...bookmark,
      source: "bookmark",
      meta: safeHostname(bookmark.url),
    });
    if (items.length >= 10) {
      break;
    }
  }

  return items;
}

function createNewtabPreviewItem({
  title,
  meta,
  badge,
  url,
  favIconUrl,
  onClick,
}) {
  const item = document.createElement("button");
  item.type = "button";
  item.className = "newtabPreviewItem";
  item.title = url ? `${title}\n${url}` : title;
  item.innerHTML = `
    ${renderFaviconMarkup(url || "https://urls.ai", favIconUrl, title, "avatar")}
    <div class="newtabPreviewText">
      <div class="newtabPreviewTitle">${escapeHtml(title)}</div>
      ${meta ? `<div class="newtabPreviewMeta">${escapeHtml(meta)}</div>` : ""}
    </div>
    ${badge ? `<div class="newtabPreviewBadge">${escapeHtml(badge)}</div>` : ""}
  `;
  item.addEventListener("click", onClick);
  attachImageFallbacks(item);
  return item;
}

function renderNewtabPreviewList(container, items, emptyText) {
  if (!container) return;
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<div class="newtabPreviewEmpty">${emptyText}</div>`;
    return;
  }

  for (const item of items) {
    container.appendChild(item);
  }
}

function renderNewtabDashboard() {
  if (!isNewtabMode) return;

  const previousQuery = state.query;
  state.query = "";

  const bookmarkTotal = flattenBookmarks(state.bookmarksTree).length;
  if (newtabBookmarkTotal) {
    newtabBookmarkTotal.textContent = String(bookmarkTotal);
  }
  if (newtabSessionTotal) {
    newtabSessionTotal.textContent = String(state.sessions.length);
  }
  if (newtabReminderTotal) {
    newtabReminderTotal.textContent = String(
      state.reminders.filter((reminder) => reminder.status === "pending")
        .length,
    );
  }

  if (newtabLaunchpad) {
    const launchpadItems = getNewtabLaunchpadItems();
    newtabLaunchpad.innerHTML = "";
    if (launchpadItems.length === 0) {
      newtabLaunchpad.innerHTML =
        '<div class="newtabPreviewEmpty">No matching bookmarks in this view yet. Import JSON or use Chrome bookmarks first.</div>';
    } else {
      const addCard = document.createElement("button");
      addCard.type = "button";
      addCard.className = "newtabLaunchCard newtabLaunchCardAdd";
      addCard.title = "Add from bookmarks";
      addCard.innerHTML = `
        <div class="avatar">+</div>
        <div class="newtabLaunchTitle">Add</div>
        <div class="newtabLaunchMeta">Bookmarks</div>
      `;
      addCard.addEventListener("click", () => {
        openNewtabWorkspaceTab("bookmarks");
      });
      newtabLaunchpad.appendChild(addCard);

      for (const bookmark of launchpadItems) {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "newtabLaunchCard";
        card.title = `${bookmark.title}\n${bookmark.url}`;
        card.innerHTML = `
          ${renderFaviconMarkup(bookmark.url, bookmark.favIconUrl, bookmark.title, "avatar")}
          <div class="newtabLaunchTitle">${escapeHtml(bookmark.title)}</div>
          <div class="newtabLaunchMeta">${escapeHtml(
            bookmark.meta ||
              bookmark.folderPath?.[bookmark.folderPath.length - 1] ||
              safeHostname(bookmark.url),
          )}</div>
        `;
        card.addEventListener("click", () => {
          if (bookmark.source === "preset") {
            void openTrackedUrl(bookmark.url);
            return;
          }
          void openBookmark(bookmark);
        });
        attachImageFallbacks(card);
        newtabLaunchpad.appendChild(card);
      }
    }
  }

  const recentItems = getPinnedBookmarks()
    .slice(0, 4)
    .map((bookmark) =>
      createNewtabPreviewItem({
        title: bookmark.title,
        meta: "",
        badge: "",
        url: bookmark.url,
        favIconUrl: bookmark.favIconUrl,
        onClick: () => {
          void openBookmark(bookmark);
        },
      }),
    );
  renderNewtabPreviewList(
    newtabRecentPreview,
    recentItems,
    "Pin a bookmark in the manager and it will show here as a quick shortcut.",
  );

  const bookmarkItems = buildBookmarkRows(flattenBookmarks(state.bookmarksTree))
    .slice(0, 4)
    .map((bookmark) =>
      createNewtabPreviewItem({
        title: bookmark.title,
        meta: "",
        badge: "",
        url: bookmark.url,
        favIconUrl: bookmark.favIconUrl,
        onClick: () => {
          void openBookmark(bookmark);
        },
      }),
    );
  renderNewtabPreviewList(
    newtabBookmarksPreview,
    bookmarkItems,
    "Bookmarks from Chrome will show here automatically. Import JSON is only for backup and cross-device transfer.",
  );

  const sessionItems = [
    ...state.sessions.slice(0, 4).map((session) =>
      createNewtabPreviewItem({
        title: session.title,
        meta: `${session.tabs.length} tabs · ${new Date(
          session.createdAt,
        ).toLocaleDateString()}`,
        badge: "Saved",
        url: session.tabs[0]?.url || "",
        favIconUrl: session.tabs[0]?.favIconUrl,
        onClick: () => {
          void openSessionInNewWindow(session);
        },
      }),
    ),
  ];
  renderNewtabPreviewList(
    newtabSessionsPreview,
    sessionItems,
    "Save Window to keep a full tab set and reopen it later.",
  );

  const reminderGroups = getReminderGroups();
  const reminderItems = [...reminderGroups.today, ...reminderGroups.week]
    .slice(0, 4)
    .map((reminder) =>
      createNewtabPreviewItem({
        title: reminder.title,
        meta: new Date(reminder.scheduledAt).toLocaleString(),
        badge: reminder.status === "done" ? "Done" : "Due",
        url: reminder.url || "",
        favIconUrl: "",
        onClick: () => {
          openNewtabWorkspaceTab("reminders");
        },
      }),
    );
  renderNewtabPreviewList(
    newtabRemindersPreview,
    reminderItems,
    "Keep local reminder notes inside the extension.",
  );

  for (const button of newtabTopicButtons) {
    button.classList.toggle(
      "active",
      button.dataset.newtabTopic === state.newtabTopic,
    );
  }

  state.query = previousQuery;
}

function render() {
  if (!state.settings.privacyModeEnabled && state.activeTab === "private") {
    state.activeTab = "bookmarks";
  }

  renderSettings();

  const sessionsActive = state.activeTab === "sessions";
  const bookmarkLikeActive =
    state.activeTab === "bookmarks" ||
    state.activeTab === "domain" ||
    state.activeTab === "captures" ||
    state.activeTab === "private";
  const settingsActive = state.activeTab === "settings";
  const remindersActive = state.activeTab === "reminders";
  const shouldShowFolders = bookmarkLikeActive;
  const shouldShowSort =
    state.activeTab === "bookmarks" ||
    state.activeTab === "domain" ||
    state.activeTab === "captures" ||
    state.activeTab === "private";
  const shouldShowPinFilters =
    state.activeTab === "bookmarks" ||
    state.activeTab === "domain" ||
    state.activeTab === "captures" ||
    state.activeTab === "private";

  if (shouldShowFolders) {
    renderFolders();
  } else {
    folderList.innerHTML = "";
  }

  if (bookmarkLikeActive) {
    renderBookmarksTab();
  }

  if (sessionsActive) {
    renderSessionsTab();
  } else {
    sessionList.innerHTML = "";
  }

  if (remindersActive) {
    renderRemindersTab();
  }

  bookmarkPanel.classList.toggle("hidden", !bookmarkLikeActive);
  sessionPanel.classList.toggle("hidden", !sessionsActive);
  settingsPanel.classList.toggle("hidden", !settingsActive);
  reminderPanel.classList.toggle("hidden", !remindersActive);
  if (foldersPane) {
    foldersPane.classList.toggle("hidden", !shouldShowFolders);
  }
  if (sortField) {
    sortField.classList.toggle("hidden", !shouldShowSort);
  }
  if (bookmarkFilters) {
    bookmarkFilters.classList.toggle("hidden", !shouldShowPinFilters);
  }
  if (searchInput) {
    searchInput.parentElement?.classList.toggle("hidden", settingsActive);
  }
  if (isNewtabMode && newtabWorkspace) {
    newtabWorkspace.classList.toggle("hidden", !state.newtabWorkspaceOpen);
    const newtabEnabled = !!state.settings.newtabEnabled;
    newtabHero?.classList.toggle("hidden", !newtabEnabled);
    newtabPreviewGrid?.classList.toggle("hidden", !newtabEnabled);
    newtabDisabledState?.classList.toggle("hidden", newtabEnabled);
    if (!newtabEnabled) {
      newtabAppsPanel?.classList.add("hidden");
      newtabAppsToggle?.setAttribute("aria-expanded", "false");
      newtabWorkspace.classList.add("hidden");
    }
  }

  for (const button of tabButtons) {
    if (button.dataset.tab === "private") {
      button.classList.toggle("hidden", !state.settings.privacyModeEnabled);
    }
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  }

  if (sortSelect) {
    sortSelect.value = state.sortMode;
  }
  renderViewFilters();

  renderReminderAlert();
  renderNewtabDashboard();
}

async function setupFullLibraryLink() {
  if (!fullLibraryLink) return;
  fullLibraryLink.href = await resolveFullLibraryUrl();
}

async function runNewtabSearch() {
  const query = String(newtabCommandInput?.value || "").trim();
  if (!query) {
    setNewtabVoiceStatus("Type something first.", "error");
    return;
  }

  try {
    if (chrome.search?.query) {
      await chrome.search.query({ text: query, disposition: "CURRENT_TAB" });
    } else {
      await chrome.tabs.update({
        url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      });
    }
  } catch {
    setNewtabVoiceStatus(
      "Unable to start a Chrome search from this page.",
      "error",
    );
  }
}

async function runNewtabAskAi() {
  const query = String(newtabCommandInput?.value || "").trim();
  if (!query) {
    setNewtabVoiceStatus("Type something first.", "error");
    return;
  }

  await chrome.tabs.update({
    url: `https://chatgpt.com/?q=${encodeURIComponent(query)}`,
  });
}

function startNewtabVoiceInput() {
  const Recognition =
    globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;

  if (!Recognition) {
    setNewtabVoiceStatus(
      "Web Speech API is not available in this Chrome build.",
      "error",
    );
    return;
  }

  const recognition = new Recognition();
  recognition.lang = navigator.language || "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  setNewtabVoiceStatus("Listening for voice input...", "listening");

  recognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript?.trim() || "";
    if (!transcript) {
      setNewtabVoiceStatus(
        "Voice input finished, but no transcript was captured.",
        "error",
      );
      return;
    }
    if (newtabCommandInput) {
      newtabCommandInput.value = transcript;
      newtabCommandInput.focus();
    }
    setNewtabVoiceStatus(`Voice ready: ${transcript}`, "idle");
  };

  recognition.onerror = () => {
    setNewtabVoiceStatus(
      "Voice input failed. Check mic permission in Chrome.",
      "error",
    );
  };

  recognition.onend = () => {
    if (
      newtabVoiceStatus?.classList.contains("listening") &&
      !String(newtabCommandInput?.value || "").trim()
    ) {
      setNewtabVoiceStatus("Voice input stopped.", "idle");
    }
  };

  recognition.start();
}

async function openDownloadsManager() {
  try {
    await chrome.tabs.create({ url: "chrome://downloads/" });
  } catch {
    setStatus("Chrome blocked opening the downloads page directly.", "error");
  }
}

async function addCurrentPageToReadingList() {
  if (!chrome.readingList?.addEntry) {
    setStatus(
      "Reading List API is not available in this Chrome version.",
      "error",
    );
    return;
  }

  try {
    const activeTab = await queryPrimaryPageTab();

    if (!activeTab?.url || !isSupportedWebUrl(activeTab.url)) {
      setStatus("No supported webpage found in this window.", "error");
      return;
    }

    await chrome.readingList.addEntry({
      title: activeTab.title || safeHostname(activeTab.url),
      url: activeTab.url,
      hasBeenRead: false,
    });
    setStatus("Current page added to Chrome Reading List.", "success");
  } catch {
    setStatus(
      "Chrome did not allow adding this page to Reading List.",
      "error",
    );
  }
}

importButton?.addEventListener("click", () => fileInput.click());
exportButton?.addEventListener("click", () => {
  void exportJson();
});
savePageButton?.addEventListener("click", () => {
  void savePrivatePage();
});
saveWindowButton?.addEventListener("click", () => {
  void saveWindow();
});
newtabCommandForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  void runNewtabSearch();
});
newtabSearchButton?.addEventListener("click", (event) => {
  event.preventDefault();
  void runNewtabSearch();
});
newtabAskAiButton?.addEventListener("click", () => {
  void runNewtabAskAi();
});
newtabVoiceButton?.addEventListener("click", () => {
  startNewtabVoiceInput();
});
newtabEnableButton?.addEventListener("click", async () => {
  state.settings.newtabEnabled = true;
  await writeStorage();
  setNewtabVoiceStatus("New Tab dashboard enabled.", "idle");
  render();
});
newtabDisabledSearchButton?.addEventListener("click", async () => {
  const query = String(newtabCommandInput?.value || "").trim() || "Google";
  if (chrome.search?.query) {
    await chrome.search.query({ text: query, disposition: "CURRENT_TAB" });
    return;
  }
  await chrome.tabs.update({
    url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
  });
});
newtabQuickOpenLibrary?.addEventListener("click", () => {
  openNewtabWorkspaceTab("bookmarks");
});
newtabTopicAddButton?.addEventListener("click", () => {
  openNewtabWorkspaceTab("bookmarks");
});
newtabAppsToggle?.addEventListener("click", () => {
  const nextExpanded =
    newtabAppsToggle.getAttribute("aria-expanded") !== "true";
  newtabAppsToggle.setAttribute("aria-expanded", String(nextExpanded));
  newtabAppsPanel?.classList.toggle("hidden", !nextExpanded);
});
document.addEventListener("click", (event) => {
  if (!newtabAppsPanel || !newtabAppsToggle) return;
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (newtabAppsPanel.contains(target) || newtabAppsToggle.contains(target)) {
    return;
  }
  newtabAppsToggle.setAttribute("aria-expanded", "false");
  newtabAppsPanel.classList.add("hidden");
});
openDownloadsButton?.addEventListener("click", () => {
  void openDownloadsManager();
});
openReadingListButton?.addEventListener("click", () => {
  void addCurrentPageToReadingList();
});
for (const button of newtabTopicButtons) {
  button.addEventListener("click", () => {
    state.newtabTopic = button.dataset.newtabTopic || "popular";
    renderNewtabDashboard();
  });
}
for (const card of newtabPreviewCards) {
  card.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.closest(".newtabPreviewItem")) {
      return;
    }
    openNewtabWorkspaceTab(card.dataset.openTab || "bookmarks");
  });
}
searchInput?.addEventListener("input", (event) => {
  state.query = event.target.value;
  state.selectedFolderId = "all";
  render();
});
sortSelect?.addEventListener("change", async (event) => {
  state.sortMode = event.target.value;
  await writeStorage();
  render();
});
for (const button of viewFilterButtons) {
  button.addEventListener("click", async () => {
    const value = button.dataset.viewFilter || "all";
    if (state.activeTab === "domain") {
      state.domainView = value;
    } else {
      state.pinFilter = value;
    }
    state.selectedFolderId = "all";
    await writeStorage();
    render();
  });
}
privacyModeCheckbox?.addEventListener("change", async (event) => {
  state.settings.privacyModeEnabled = event.target.checked;
  await writeStorage();
  render();
});
hideDuplicateBookmarksCheckbox?.addEventListener("change", async (event) => {
  state.settings.hideDuplicateBookmarks = event.target.checked;
  state.selectedFolderId = "all";
  await writeStorage();
  render();
});
enableNewtabCheckbox?.addEventListener("change", async (event) => {
  state.settings.newtabEnabled = event.target.checked;
  if (!event.target.checked) {
    state.newtabWorkspaceOpen = false;
  }
  await writeStorage();
  setStatus(
    event.target.checked
      ? "New Tab dashboard enabled."
      : "New Tab dashboard set to minimal mode.",
    "success",
  );
  render();
});
privateContextMenuCheckbox?.addEventListener("change", async (event) => {
  state.settings.privateContextMenuEnabled = event.target.checked;
  await writeStorage();
  setStatus(
    event.target.checked
      ? "Right-click Save Private Page enabled."
      : "Right-click Save Private Page disabled.",
    "success",
  );
  renderSettings();
});
localCaptureContextMenuCheckbox?.addEventListener("change", async (event) => {
  state.settings.localCaptureContextMenuEnabled = event.target.checked;
  await writeStorage();
  setStatus(
    event.target.checked
      ? "Right-click local capture actions enabled."
      : "Right-click local capture actions disabled.",
    "success",
  );
  renderSettings();
});
cardDensitySelect?.addEventListener("change", async (event) => {
  state.settings.cardDensity =
    event.target.value === "2-column" ? "2-column" : "list";
  await writeStorage();
  setStatus(
    state.settings.cardDensity === "2-column"
      ? "Popup card density set to 2-column."
      : "Popup card density set to list.",
    "success",
  );
  render();
});
captureCurrentPageButton?.addEventListener("click", () => {
  void captureCurrentPageAsLocalPage();
});
exportLocalCapturesButton?.addEventListener("click", () => {
  void exportLocalCapturesByType();
});
reminderUseCurrentPageButton?.addEventListener("click", () => {
  void useCurrentPageForReminder();
});
testReminderButton?.addEventListener("click", () => {
  void addTestReminder();
});
addReminderButton?.addEventListener("click", () => {
  void addReminder();
});
reminderAlertOpen?.addEventListener("click", () => {
  void openReminderAlertTarget();
});
reminderAlertDismiss?.addEventListener("click", () => {
  void dismissReminderAlert();
});

for (const button of tabButtons) {
  button.addEventListener("click", () => {
    if (
      button.dataset.tab === "private" &&
      !state.settings.privacyModeEnabled
    ) {
      return;
    }
    state.activeTab = button.dataset.tab;
    state.selectedFolderId = "all";
    render();
  });
}

fileInput?.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    const result = validateImportPayload(payload);
    if (!result.ok) {
      setStatus(result.message, "error");
      return;
    }

    state.bookmarksTree = result.bookmarksTree;
    state.sessions = result.sessions;
    state.savedPages = result.savedPages;
    state.localEntries = result.localEntries;
    state.reminders = result.reminders;
    state.bookmarkStats = result.bookmarkStats;
    state.pinnedUrls = result.pinnedUrls;
    state.hiddenBookmarkIds = result.hiddenBookmarkIds;
    state.bookmarkFolderOverrides = result.bookmarkFolderOverrides;
    state.bookmarkTitleOverrides = result.bookmarkTitleOverrides;
    state.selectedFolderId = "all";
    state.selectedBookmarkIds = [];
    await writeStorage();
    setStatus(
      `Imported ${flattenBookmarks(state.bookmarksTree).length} bookmarks, ${state.savedPages.length} private bookmarks, ${state.localEntries.length} local captures, ${state.sessions.length} sessions, ${state.reminders.length} reminders, ${state.pinnedUrls.length} pinned links, and ${Object.keys(state.bookmarkStats).length} tracked opens.`,
      "success",
    );
    render();
  } catch (error) {
    setStatus(
      error instanceof SyntaxError
        ? "Invalid JSON format."
        : "Unable to import this file.",
      "error",
    );
  }

  event.target.value = "";
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local" || !changes[STORAGE_KEY]) return;
  const nextState = changes[STORAGE_KEY].newValue || {};
  const previousEventId = state.lastReminderEvent?.id || null;

  state.sessions = nextState.sessions || [];
  state.savedPages = nextState.savedPages || [];
  state.localEntries = normalizeImportedLocalEntries(nextState.localEntries || []);
  state.reminders = normalizeImportedReminders(nextState.reminders || []);
  state.bookmarkStats = normalizeImportedBookmarkStats(
    nextState.bookmarkStats || {},
  );
  state.pinnedUrls = normalizeImportedPinnedUrls(nextState.pinnedUrls || []);
  state.settings = normalizeSettings(nextState.settings || {});
  state.domainView = ["all", "social", "accounts"].includes(
    nextState.domainView,
  )
    ? nextState.domainView
    : state.domainView;
  state.sortMode = nextState.sortMode || state.sortMode;
  state.lastReminderEvent = nextState.lastReminderEvent || null;

  if (state.lastReminderEvent && state.lastReminderEvent.id !== previousEventId) {
    setStatus(`Reminder updated: ${state.lastReminderEvent.title}`, "success");
  }
  render();
});

if (isNewtabMode) {
  window.addEventListener("focus", () => {
    void refreshLiveTabGroups().then(() => renderNewtabDashboard());
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;
    void refreshLiveTabGroups().then(() => renderNewtabDashboard());
  });
}

loadState();
setupFullLibraryLink();
