(() => {
  if (!globalThis.chrome?.i18n?.getMessage) return;

  const applyText = (selector, attr, setter) => {
    document.querySelectorAll(selector).forEach((node) => {
      const key = node.getAttribute(attr);
      if (!key) return;
      const message = globalThis.__urlsaiGetMessage?.(key);
      if (!message) return;
      setter(node, message);
    });
  };

  globalThis.__urlsaiGetMessage = (key) => chrome.i18n.getMessage(key);

  document.documentElement.lang = chrome.i18n
    .getUILanguage()
    .replace("_", "-");

  applyText("[data-i18n]", "data-i18n", (node, message) => {
    node.textContent = message;
  });
  applyText(
    "[data-i18n-placeholder]",
    "data-i18n-placeholder",
    (node, message) => {
      node.setAttribute("placeholder", message);
    },
  );
  applyText("[data-i18n-title]", "data-i18n-title", (node, message) => {
    node.setAttribute("title", message);
  });
  applyText(
    "[data-i18n-aria-label]",
    "data-i18n-aria-label",
    (node, message) => {
      node.setAttribute("aria-label", message);
    },
  );
})();
