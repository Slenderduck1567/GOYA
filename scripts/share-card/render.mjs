// Renders share-card.html to public/assets/share-card.jpg (1200×630), the image shown
// when a GOYA link is shared on Instagram, Facebook, WhatsApp, iMessage, etc.
//
// Only needed if the card's design changes. Requires Playwright with Chromium:
//   npx -y playwright@1 install chromium
//   npm i --no-save playwright@1 && node scripts/share-card/render.mjs
// After changing the image, also rename it (and update DEFAULT_IMAGE in src/lib/seo.js)
// so social networks fetch the new version instead of their cached copy.
import { fileURLToPath } from 'node:url';

let chromium;
try { ({ chromium } = await import('playwright')); }
catch { console.error('Playwright is not installed. See the comment at the top of this file.'); process.exit(1); }

const template = new URL('./share-card.html', import.meta.url);
const output = fileURLToPath(new URL('../../public/assets/share-card.jpg', import.meta.url));
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(template.href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: output, type: 'jpeg', quality: 88 });
await browser.close();
console.log('Wrote', output);
