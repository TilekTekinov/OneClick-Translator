function escapeHtml(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// Render all domains and their selectors
function renderDomains(data) {
  const container = document.getElementById("domainsContainer");
  container.innerHTML = "";

  // Remove "lang" key (global language)
  const domains = Object.keys(data).filter(k => k !== "lang").sort();
  if (!domains.length) {
    container.innerHTML = "<p class='empty'>No saved selectors yet.</p>";
    return;
  }

  domains.forEach(domain => {
    const selectors = Array.isArray(data[domain]) ? data[domain] : [];

    const block = document.createElement("div");
    block.className = "domain-block";

    const header = document.createElement("div");
    header.innerHTML = `<strong>${escapeHtml(domain)}</strong>
      <button class="removeDomainBtn">Remove site</button>`;
    block.appendChild(header);

    const selWrap = document.createElement("div");
    selWrap.className = "selectors";
    selWrap.innerHTML = "<div><strong>Selectors</strong></div>";

    if (!selectors.length) {
      const p = document.createElement("p");
      p.className = "empty";
      p.textContent = "No selectors saved for this site.";
      selWrap.appendChild(p);
    } else {
      selectors.forEach((sel, idx) => {
        const row = document.createElement("div");
        row.className = "selector-item";
        row.innerHTML = `<input type="text" class="selectorInput" value="${escapeHtml(sel)}" style="flex:1" />
                         <button class="updateSelectorBtn">Update</button>
                         <button class="deleteSelectorBtn">Delete</button>`;
        selWrap.appendChild(row);
      });
    }

    // Add new selector row
    const addRow = document.createElement("div");
    addRow.className = "selector-item";
    addRow.innerHTML = `<input class="newSelectorInput" placeholder="Paste selector or use selection mode on the site" style="flex:1" />
                        <button class="addSelectorBtn">Add</button>`;
    selWrap.appendChild(addRow);

    block.appendChild(selWrap);
    container.appendChild(block);

    // Events
    header.querySelector(".removeDomainBtn").addEventListener("click", () => {
      if (!confirm("Remove all selectors for " + domain + "?")) return;
      chrome.storage.local.remove(domain, loadAll);
    });

    // Update existing selector
    Array.from(block.querySelectorAll(".updateSelectorBtn")).forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        const val = block.querySelectorAll(".selectorInput")[idx].value.trim();
        if (!val) return alert("Selector cannot be empty.");
        selectors[idx] = val;
        chrome.storage.local.set({ [domain]: selectors }, loadAll);
      });
    });

    // Delete selector
    Array.from(block.querySelectorAll(".deleteSelectorBtn")).forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        if (!confirm("Delete this selector?")) return;
        selectors.splice(idx, 1);
        chrome.storage.local.set({ [domain]: selectors }, loadAll);
      });
    });

    // Add new selector
    addRow.querySelector(".addSelectorBtn").addEventListener("click", () => {
      const val = addRow.querySelector(".newSelectorInput").value.trim();
      if (!val) return alert("Provide a selector to add.");
      selectors.push(val);
      chrome.storage.local.set({ [domain]: selectors }, () => {
        addRow.querySelector(".newSelectorInput").value = "";
        loadAll();
      });
    });
  });
}

// Load all storage and render
function loadAll() {
  chrome.storage.local.get(null, renderDomains);
}

// Global language handling
document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("globalLang");
  chrome.storage.local.get(["lang"], (data) => {
    if (data.lang) langSelect.value = data.lang;
  });

  document.getElementById("saveGlobalLang").addEventListener("click", () => {
    const lang = langSelect.value;
    chrome.storage.local.set({ lang }, () => {
      alert("Global language saved: " + lang);
    });
  });

  loadAll();
});
