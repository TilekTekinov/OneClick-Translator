# **OneClick Translator**

**Version:** 1.0 (MVP)  
**Type:** Browser Extension  

---

## **Overview**

**OneClick Translator** is a lightweight browser extension that allows you to translate text from a specific block on a webpage with a single click.  

It’s designed to solve a common problem that occurs on multilingual websites — when the website’s **interface language** is in one language (for example, English), but the **main content** is in another (for example, Czech).  
In such cases, the built-in Chrome translator often **detects the wrong language** or **translates the interface instead of the content**.  

With OneClick Translator, you can define **exactly which block of text** should be translated.  
When you click the extension icon, it automatically opens **Google Translate** in a new tab and shows the translation of that specific content block — no need to manually copy, open Google Translate, and paste the text.

---

## **Features**
- 🧩 **Manual configuration** — choose which text block or element to translate by editing the code.  
- 🌐 **Accurate translation** — avoids incorrect translations caused by multilingual interfaces.  
- ⚙️ **Customizable target language** — set your desired translation language directly in the code.  
- ⚡ **One-click process** — no more highlight → copy → open translator → paste.  
- 💡 **Lightweight and simple** — fast setup and minimal logic for easy customization.

---

## **How It Works**
1. Define the HTML block (element) you want to translate inside the code.  
2. Set your target translation language (e.g., `en`, `ru`, `de`, `cs`).  
3. When you click the extension icon, the script extracts text from the specified block.  
4. It automatically opens a new tab with **Google Translate**, showing the translated version of that text.

---

## **Installation**
1. Clone or download this repository.  
2. Open your browser (e.g., **Chrome**) and go to: **chrome://extensions/**
3. Turn on **Developer Mode** (top-right corner).  
4. Click **“Load unpacked”** and select the project folder.  
5. The extension will appear in your browser toolbar.

---

## **Configuration**
1. Open the file `js/background.js`.  
2. Find the section where the **target selector** and **language** are defined:  
```js
const selector = "#content"; // HTML block to translate
const targetLang = "en";     // Target translation language
```
3. Change these values to match your needs.
4. Save the file and reload the extension on the Extensions page.