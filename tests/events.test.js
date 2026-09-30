import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {isPast,splitEvents,calendarFile} from '../src/lib/events.js';
import {validateContent,normalizeEvent} from '../src/lib/content.js';
const content=JSON.parse(readFileSync(new URL('../src/content/site-content.json',import.meta.url)));
const party=content.events.find(e=>e.id==='aegean-cup-after-party');
test('overnight events archive at Brisbane cutoff, not at midnight',()=>{
 assert.equal(isPast(party,new Date('2026-10-03T15:00:00Z')),false);
 assert.equal(isPast(party,new Date('2026-10-04T02:00:00Z')),true);
 const parts=splitEvents(content.events,new Date('2026-10-02T00:00:00Z'));
 assert.equal(parts.upcoming.length,3);assert.equal(parts.past[0].id,'anastasia-meet-and-greet');
});
test('calendar translates Brisbane time to UTC and unknown times stay all-day',()=>{
 assert.match(calendarFile(party),/DTSTART:20261003T110000Z/);
 assert.doesNotMatch(calendarFile(party),/DTEND:/);
 const concert=calendarFile(content.events.find(e=>e.id==='anastasia'));
 assert.match(concert,/DTSTART;VALUE=DATE:20261002/);assert.match(concert,/DTEND;VALUE=DATE:20261003/);
});
test('calendar escapes line injection and commas',()=>{
 const calendar=calendarFile({...party,title:'Hello, world\nBEGIN:FAKE'});
 assert.match(calendar,/SUMMARY:Hello\\, world\\nBEGIN:FAKE/);
});
test('editor rejects unsafe links, duplicate IDs and malformed dates',()=>{
 assert.deepEqual(validateContent(content),[]);
 const bad=structuredClone(content);bad.events[0].ticketUrl='javascript:alert(1)';bad.events[1].id=bad.events[0].id;bad.events[2].date='2026-02-31';
 assert.equal(validateContent(bad).length,3);
 assert.equal(normalizeEvent({...party,date:'2026-10-04'}).dow,'SUN');
});
