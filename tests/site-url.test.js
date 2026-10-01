import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '../src/site.js';
import { calendarFile } from '../src/lib/events.js';

const content = JSON.parse(readFileSync(new URL('../src/content/site-content.json', import.meta.url)));

test('the site address is one setting, with no trailing slash', () => {
  assert.match(SITE.url, /^https:\/\/[^/]+$/);
});
test('calendar files use the configured site address', () => {
  const ics = calendarFile(content.events[0]).replace(/\r\n /g, '');
  assert.match(ics, new RegExp(`UID:${content.events[0].id}@${new URL(SITE.url).host}`));
  assert.ok(ics.includes(`URL:${SITE.url}/events/${content.events[0].id}`));
});
test('no other source file hard-codes the domain', () => {
  const host = new URL(SITE.url).host;
  const files = [];
  const walk = dir => { for (const f of readdirSync(dir)) { const p = join(dir, f); statSync(p).isDirectory() ? walk(p) : files.push(p); } };
  walk(new URL('../src', import.meta.url).pathname); walk(new URL('../scripts', import.meta.url).pathname);
  files.push(new URL('../index.html', import.meta.url).pathname);
  const offenders = files.filter(f => !f.endsWith('site.js') && /\.(js|jsx|mjs|html|json)$/.test(f) && readFileSync(f, 'utf8').includes(host));
  assert.deepEqual(offenders, []);
});
