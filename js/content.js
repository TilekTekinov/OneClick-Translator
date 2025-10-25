let selectionMode = false;
let lastHovered = null;
let highlightEl = null;
let tooltipEl = null;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "enable-selection") enableSelectionMode();
});

// create highlight and tooltip elements (lazy init)
function ensureUI() {
  if (!highlightEl) {
    highlightEl = document.createElement("div");
    highlightEl.style.position = "absolute";
    highlightEl.style.pointerEvents = "none";
    highlightEl.style.boxSizing = "border-box";
    highlightEl.style.zIndex = "999999999";
    highlightEl.style.background = "rgba(255, 0, 0, 0.08)";
    highlightEl.style.border = "2px solid rgba(255, 0, 0, 0.9)";
    highlightEl.style.borderRadius = "4px";
    document.documentElement.appendChild(highlightEl);
  }
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.position = "fixed";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.zIndex = "1000000000";
    tooltipEl.style.padding = "6px 8px";
    tooltipEl.style.background = "rgba(0,0,0,0.85)";
    tooltipEl.style.color = "white";
    tooltipEl.style.fontSize = "12px";
    tooltipEl.style.borderRadius = "4px";
    tooltipEl.style.maxWidth = "400px";
    tooltipEl.style.wordBreak = "break-word";
    tooltipEl.style.boxShadow = "0 2px 8px rgba(0,0,0,0.4)";
    document.documentElement.appendChild(tooltipEl);
  }
}

function enableSelectionMode() {
  if (selectionMode) return;
  selectionMode = true;
  ensureUI();
  alert("Selection mode enabled.\nClick the element you want, or press Ctrl/Cmd+Shift+X to cancel.");

  document.addEventListener("mousemove", handleHover);
  document.addEventListener("click", handleClick, true);
  document.addEventListener("keydown", handleExitSelection, true);
}

function disableSelectionMode() {
  selectionMode = false;
  clearHighlight();
  document.removeEventListener("mousemove", handleHover);
  document.removeEventListener("click", handleClick, true);
  document.removeEventListener("keydown", handleExitSelection, true);
}

function handleHover(e) {
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (!el || el === document.documentElement || el === document.body) {
    clearHighlight();
    return;
  }
  if (lastHovered !== el) {
    lastHovered = el;
    highlightElement(el);
    updateTooltipByElement(el, e.clientX, e.clientY);
  } else {
    positionTooltip(e.clientX, e.clientY);
  }
}

function clearHighlight() {
  if (highlightEl) {
    highlightEl.style.width = "0px";
    highlightEl.style.height = "0px";
    highlightEl.style.left = "-9999px";
    highlightEl.style.top = "-9999px";
  }
  if (tooltipEl) {
    tooltipEl.style.left = "-9999px";
    tooltipEl.style.top = "-9999px";
    tooltipEl.textContent = "";
  }
  lastHovered = null;
}

function highlightElement(el) {
  const rect = el.getBoundingClientRect();
  highlightEl.style.width = rect.width + "px";
  highlightEl.style.height = rect.height + "px";
  highlightEl.style.left = (rect.left + window.scrollX) + "px";
  highlightEl.style.top = (rect.top + window.scrollY) + "px";
}

function positionTooltip(clientX, clientY) {
  const tooltipRect = tooltipEl.getBoundingClientRect();
  let left = clientX + 12;
  let top = clientY + 12;
  if (left + tooltipRect.width > window.innerWidth - 8) left = window.innerWidth - tooltipRect.width - 8;
  if (top + tooltipRect.height > window.innerHeight - 8) top = clientY - tooltipRect.height - 8;
  tooltipEl.style.left = left + "px";
  tooltipEl.style.top = top + "px";
}

function updateTooltipByElement(el, clientX, clientY) {
  const tag = el.tagName.toLowerCase();
  const classes = el.className ? ("." + String(el.className).trim().split(/\s+/).join(".")) : "";
  const selectorPreview = getStableSelector(el);
  const info = `${tag} | ${classes} | ${selectorPreview}`;
  tooltipEl.textContent = info;
  positionTooltip(clientX, clientY);
}

function handleClick(e) {
  e.preventDefault();
  e.stopPropagation();
  if (!lastHovered) return;

  const selector = getStableSelector(lastHovered);
  const domain = location.hostname;

  chrome.storage.local.get([domain], (data) => {
    let selectors = data[domain];

    if (!Array.isArray(selectors)) selectors = [];

    if (!selectors.includes(selector)) selectors.push(selector);

    chrome.storage.local.set({ [domain]: selectors }, () => {
      alert(`Block added: ${selector}`);
      disableSelectionMode();
    });
  });
}

function handleExitSelection(e) {
  // Windows: Ctrl+Shift+X
  // Mac: Meta+Shift+X
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyX") {
    alert("Selection mode exited");
    disableSelectionMode();
  }
}


function getStableSelector(el) {
  let path = [];
  while (el && el.tagName.toLowerCase() !== 'body') {
    if (el.classList && el.classList.length > 0) {
      path.unshift(el.tagName.toLowerCase() + '.' + [...el.classList].join('.'));
      break;
    }
    el = el.parentElement;
  }
  if (!path.length) path.push(el.tagName.toLowerCase());
  return path.join(' > ');
}
