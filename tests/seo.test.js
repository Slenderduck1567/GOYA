import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { SITE } from '../src/site.js';

// seo.js imports the content JSON the Vite way; load it with the JSON inlined instead.
const src = new URL('../src/lib/seo.js', import.meta.url);
const content = readFileSync(new URL('../src/content/site-content.json', import.meta.url), 'utf8');
const code = readFileSync(src, 'utf8')
  .replace("import {DATA} from '../data.js';", `const DATA=${content};`)
  .replace("import {SITE} from '../site.js';", `import {SITE} from '${new URL('../src/site.js', import.meta.url).href}';`);
const file = join(mkdtempSync(join(tmpdir(), 'seo-')), 'seo.mjs');
writeFileSync(file, code);
const seo = await import(pathToFileURL(file).href);
const data = JSON.parse(content);

test('every public page has its own title, description and canonical link', () => {
  const titles = new Set(), descriptions = new Set();
  for (const path of seo.publicRoutes) {
    const m = seo.metadata(path);
    assert.ok(m.title && m.description, path);
    titles.add(m.title); descriptions.add(m.description);
    assert.equal(m.url, SITE.url + path);
    assert.equal(m.noindex, false);
    assert.ok(m.description.length <= 200, `${path} description is ${m.description.length} characters`);
  }
  assert.equal(titles.size, seo.publicRoutes.length);
  assert.equal(descriptions.size, seo.publicRoutes.length);
});
test('private pages are noindex and stay out of the sitemap', () => {
  for (const path of seo.privateRoutes) {
    assert.equal(seo.metadata(path).noindex, true);
    assert.ok(!seo.publicRoutes.includes(path));
  }
});
test('a trailing slash describes the same page', () => {
  assert.deepEqual(seo.metadata('/goya-house/'), seo.metadata('/goya-house'));
  assert.equal(seo.normalizePath('/'), '/');
});
test('pages share the branded 1200x630 card; events share their own photo', () => {
  const home = seo.metadata('/');
  assert.equal(home.image.url, `${SITE.url}/assets/share-card.jpg`);
  assert.deepEqual([home.image.width, home.image.height], [1200, 630]);
  const event = data.events[0], m = seo.metadata(`/events/${event.id}`);
  assert.equal(m.image.url, SITE.url + event.photo);
  const ld = m.schema['@graph'].find(n => n['@type'] === 'Event');
  assert.equal(ld.name, event.title);
  assert.ok(ld.startDate.startsWith(event.date));
  assert.equal(ld.location.name, event.venue);
});
test('head tags are escaped and cover social previews', () => {
  const html = seo.headHtml({ ...seo.metadata('/'), title: 'A "quoted" <title>' });
  assert.ok(html.includes('<title>A &quot;quoted&quot; &lt;title&gt;</title>'));
  for (const tag of ['og:title', 'og:image', 'og:image:width', 'twitter:card', 'twitter:image', 'canonical', 'application/ld+json']) assert.ok(html.includes(tag), tag);
});
