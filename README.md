# **OneClick Translator**

**Version:** 1.1 (Select block with mouse)  
**Type:** Browser Extension  

---

## **Overview**

**OneClick Translator** is a lightweight browser extension that allows you to translate text from a specific block on a webpage with a single click.  

It’s designed to solve a common problem that occurs on multilingual websites — when the website’s **interface language** is in one language (for example, English), but the **main content** is in another (for example, Czech).  
In such cases, the built-in Chrome translator often **detects the wrong language** or **translates the interface instead of the content**.  

With OneClick Translator, you can define **exactly which block of text** should be translated.  
When you click the extension icon, it automatically opens **Google Translate** in a new tab and shows the translation of that specific content block — no need to manually copy, open Google Translate, and paste the text.

---

## Key Features

- 🎯 **Smart Block Selection** - Select any content block on the webpage to add it to translation list
- 📑 **Multiple Blocks Support** - Add multiple blocks from the same site, their content will be combined for translation
- 🌍 **Per-Site Configuration** - Settings are saved individually for each website
- ⚙️ **Flexible Settings** - Configure target language and manage content selectors through options page
- 🔄 **One-Click Translation** - Opens Google Translate in new tab with selected content, no more highlight → copy → open translator → paste.
- 🎛️ **Visual Management** - Edit, remove or add new content selectors through user interface

---

## **How It Works**

1. **Adding Content Blocks:**
   - Right-click on context-menue
   - Choose "Add block for auto-translation"
   - Click on the content block you want to translate
   - Block is saved for this website

2. **Using Translation:**
   - Click extension icon
   - New tab opens with Google Translate
   - Content from all saved blocks is combined and translated
   - Translation is shown in your target language

3. **Managing Settings:**
   - Right-click extension icon → Options
   - Change target language (default is Russian)
   - View and manage saved websites and their content selectors
   - Edit or add new selectors manually

---

## **Installation**

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer Mode" (top-right corner)
4. Click "Load unpacked" and select project folder
5. Extension icon will appear in browser toolbar

---

## Configuration

All settings are managed through the Options page:
- **Target Language:** Choose language for translation (default: ru)
- **Website Settings:** View and manage saved websites
- **Content Selectors:** Edit, remove or add new selectors
- **Manual Input:** Add new selectors directly through options interface

## Usage Tips

- You can add multiple content blocks on the same page
- Use Options page to edit incorrect selectors
- Remove unused websites or selectors through Options
- Target language can be changed at any time
