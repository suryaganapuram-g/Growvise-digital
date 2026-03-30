# GrowVise Digital — AI Marketing Platform

## 🚀 Quick Start (2 commands only)

Open terminal/command prompt IN this folder, then run:

```
npm install
npm run dev
```

Then open your browser → http://localhost:5173

## 📦 Deploy to Live Website

### Build for production:
```
npm run build
```

### Deploy free on Vercel:
1. Go to vercel.com
2. Drag & drop this entire folder
3. Your site is live in 60 seconds!

### Deploy free on Netlify:
1. Run `npm run build` first
2. Go to netlify.com
3. Drag & drop the `dist/` folder

## 🔑 Add Your API Key (for production)

Create a `.env` file in this folder:
```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your free API key at: https://console.anthropic.com

Then in src/growvise-digital.jsx, update callClaude() headers:
```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
}
```

## 🛠️ Features
- AI SEO Audit
- AI Blog Generator
- AI Keyword Planner
- AI Ad Copy Generator
- AI Analytics Interpreter
- AI Chatbot (floating, every page)
- Lead Capture & Dashboard
