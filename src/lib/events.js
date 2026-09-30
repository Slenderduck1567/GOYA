export const BRISBANE = 'Australia/Brisbane';
export function isPast(event, now = new Date()) {
  const cutoff = event.archiveAt || `${nextDay(event.date)}T00:00:00+10:00`;
  return now.getTime() >= new Date(cutoff).getTime();
}
export function nextDay(date) { return new Date(Date.parse(`${date}T00:00:00Z`) + 86400000).toISOString().slice(0,10); }
export function splitEvents(events, now = new Date()) {
  const upcoming = events.filter(e=>!isPast(e,now)).sort((a,b)=>`${a.date} ${a.startTime||'23:59'}`.localeCompare(`${b.date} ${b.startTime||'23:59'}`));
  const past = events.filter(e=>isPast(e,now)).sort((a,b)=>b.date.localeCompare(a.date));
  return {upcoming,past};
}
const escapeICS = value => String(value).replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
const utc = value => new Date(value).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
export function calendarFile(event) {
  const date=event.date.replaceAll('-','');
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//GOYA Brisbane//Events//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${event.id}@goya-nu.vercel.app`,'DTSTAMP:20260930T000000Z'];
  if(event.startTime) {
    lines.push(`DTSTART:${utc(`${event.date}T${event.startTime}:00+10:00`)}`);
    if(event.endTime) lines.push(`DTEND:${utc(`${event.date}T${event.endTime}:00+10:00`)}`);
  } else lines.push(`DTSTART;VALUE=DATE:${date}`,`DTEND;VALUE=DATE:${nextDay(event.date).replaceAll('-','')}`);
  lines.push(`SUMMARY:${escapeICS(event.title)}`,`LOCATION:${escapeICS(event.venue)}`,`DESCRIPTION:${escapeICS(`${event.blurb}\n${event.startTime?'':'Start time to be confirmed. This is an all-day reminder.\n'}${event.updatesUrl||''}`)}`,`URL:https://goya-nu.vercel.app/events/${event.id}`,'END:VEVENT','END:VCALENDAR');
  return lines.map(line => {
    let folded='',bytes=0;
    for(const character of line){const length=new TextEncoder().encode(character).length;if(bytes+length>73){folded+='\r\n ';bytes=1;}folded+=character;bytes+=length;}
    return folded;
  }).join('\r\n')+'\r\n';
}
export function calendarUrl(event) { return `data:text/calendar;charset=utf-8,${encodeURIComponent(calendarFile(event))}`; }
