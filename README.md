# Oayssis Price List

Interactive service menu for Oayssis Hair & Beauty Bar.

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com and import the repo
3. Leave all settings as default
4. Click Deploy

Your price list will be live at a Vercel URL within 2 minutes.

## Local development

```bash
npm install
npm start
```

## Update pricing

All prices and services are in `src/App.js` inside the `CATEGORIES` array.
Each service has a `prices` object with Short / Medium / Long / Extra Long values.
