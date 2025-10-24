const selector = ".tab-content";
const targetLang = "ru";

chrome.action.onClicked.addListener(async (tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getAndTranslateTabContent
  });
});

function getAndTranslateTabContent() {
  const el = document.querySelector(selector);
  if (!el) {
    alert(`Block ${selector} not found on this page`);
    return;
  }

  const text = el.innerText.trim();
  if (!text) {
    alert(`In block ${selector} no text found`);
    return;
  }

  const url = `https://translate.google.com/?sl=auto&tl=${targetLang}&text=` + 
  `${encodeURIComponent(text)}&op=translate`;
  window.open(url, "_blank");
}
