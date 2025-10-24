chrome.action.onClicked.addListener(async (tab) => {
  // Выполняем скрипт на активной вкладке
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getAndTranslateTabContent
  });
});

function getAndTranslateTabContent() {
  const el = document.querySelector(".tab-content");
  if (!el) {
    alert("Элемент .tab-content не найден на странице");
    return;
  }

  const text = el.innerText.trim();
  if (!text) {
    alert("В элементе .tab-content нет текста для перевода");
    return;
  }

  const url =
    "https://translate.google.com/?sl=auto&tl=ru&text=" +
    encodeURIComponent(text) +
    "&op=translate";
  window.open(url, "_blank");
}
