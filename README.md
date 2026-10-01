# GOYA Brisbane website

Website for GOYA — Brisbane branch of the Greek Orthodox Youth of Australia. Built from the GOYA Design System (Claude Design export) with React + Vite.

## Run locally
```
npm install
npm run dev
```

## Where to edit things
- **Events** (add/change, set `ticketUrl` when tickets go live): `src/content/site-content.json`
- **Website address** (for the custom domain): `url` in `src/site.js` — canonical links, sitemap, robots.txt, share previews and calendar files all follow it
- **Links & contact details** (Instagram, Facebook, email, netball form): `src/site.js`
- **Photos**: `public/assets/photos/` (then run `python3 scripts/optimize-images.py` to make the web-sized copies)
- **Link preview image** (what shows when the site is shared): `public/assets/share-card.jpg`, made from `scripts/share-card/share-card.html`
- **Pages**: `src/pages/`

## Forms (Join, Contact, Netball)
Get a free access key at https://web3forms.com using the inbox that should receive submissions, then paste it into `web3formsKey` in `src/site.js` (or add it
as the environment variable `VITE_WEB3FORMS_KEY` in your host (Vercel → Project → Settings → Environment Variables) and redeploy.
Until then, forms open the visitor's email app addressed to the email in `src/site.js`.

## Deploy
Vercel: import this repo — it auto-detects Vite. Every push to `main` redeploys. `vercel.json` holds the
redirects, security headers and caching rules. When the custom domain is connected in Vercel, change `url`
in `src/site.js` to match and redeploy, then add the new domain to Google Search Console and submit
`/sitemap.xml`.

## Committee editor
Visit `/admin` to edit events, albums, stories and the optional homepage film. Drafts are local to the browser. Download validated `site-content.json`, then upload it into `src/content` through an authorised GitHub account and commit. The editor does not grant publishing access or store private member records.

Event dates and archive cutoffs use Brisbane time. Set archive cutoffs after overnight events finish. Only enter confirmed prices, ticket links and times; unknown start times produce an explicitly labelled all-day calendar reminder.

## Build and checks
`npm test` checks forms, motion, event/content logic, page metadata and the site address. `npm run build` validates content and generates HTML for each public route, social metadata, event structured data, sitemap and robots rules. The editor and thank-you page are marked noindex. Fonts (Archivo, Hanken Grotesk, Space Mono) are bundled from npm rather than loaded from Google Fonts; see `src/styles/fonts.css`.

## Media
Approved GOYA footage can be configured in `media.heroVideo`. The photo remains the fallback for reduced motion, data saving and playback failures. A pause control is provided. No community film is currently configured. Photo variants (640/960/1280px WebP), web-sized logos and `src/content/image-manifest.json` can be regenerated with `python3 scripts/optimize-images.py` (Pillow required).

## Still requiring committee input
- Web3Forms inbox verification/access key to enable direct delivery. Until connected, forms explicitly prepare an email draft for the visitor to send.
- Approved GOYA community video and confirmed venue capacity/facilities/accessibility details.
- A separately configured authenticated CMS integration if one-click publishing is needed; current publishing uses GitHub permissions.
