chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "add-translate-block",
    title: "Add block for auto-translation",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "add-translate-block") {
    chrome.tabs.sendMessage(tab.id, { action: "enable-selection" });
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getAndTranslateTabContent
  });
});

function getAndTranslateTabContent() {
  const DEFAULT_LANG = "ru";
  const domain = location.hostname;

  chrome.storage.local.get([domain, "lang"], (data) => {
    const selectors = data[domain];
    const lang = data["lang"] || DEFAULT_LANG;

    if (!selectors || !selectors.length) {
      alert("No saved blocks for this site");
      return;
    }

    let text = "";
    selectors.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) text += el.innerText + "\n\n";
    });

    if (!text.trim()) {
      alert("No text found for translation");
      return;
    }

    const url =
      "https://translate.google.com/?sl=auto&tl=" +
      encodeURIComponent(lang) +
      "&text=" +
      encodeURIComponent(text.slice(0, 2000)) +
      "&op=translate";

    window.open(url, "_blank");
  });
}
