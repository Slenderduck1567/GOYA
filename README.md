# GOYA Brisbane website

Website for GOYA — Brisbane branch of the Greek Orthodox Youth of Australia. Built from the GOYA Design System (Claude Design export) with React + Vite.

## Run locally
```
npm install
npm run dev
```

## Where to edit things
- **Events** (add/change, set `ticketUrl` when tickets go live): `src/data.js`
- **Links & contact details** (Instagram, Facebook, email, netball form): `src/site.js`
- **Photos**: `public/assets/photos/`
- **Pages**: `src/pages/`

## Forms (Join, Contact, Netball)
Get a free access key at https://web3forms.com using the inbox that should receive submissions, then paste it into `web3formsKey` in `src/site.js` (or add it
as the environment variable `VITE_WEB3FORMS_KEY` in your host (Vercel → Project → Settings → Environment Variables) and redeploy.
Until then, forms open the visitor's email app addressed to the email in `src/site.js`.

## Deploy
Vercel: import this repo — it auto-detects Vite. Every push to `main` redeploys.
