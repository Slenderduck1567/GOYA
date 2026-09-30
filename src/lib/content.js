export const safeUrl=(value,local=false)=>!value || /^https:\/\//i.test(value) || (local&&/^\/assets\/[a-z0-9_./-]+$/i.test(value)&&!value.includes('..'));
export function validateContent(data){
 const errors=[];
 if(!data || !Array.isArray(data.events)||!Array.isArray(data.gallery)||!Array.isArray(data.albums)||!Array.isArray(data.stories)||!Array.isArray(data.filters)||!data.media)return ['This is not a GOYA content file.'];
 if(data.events.length>200)return ['Please keep the calendar under 200 events.'];
 const ids=new Set();
 for(const e of data.events){
  const label=e.title||'Untitled event';
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.id||'')||ids.has(e.id))errors.push(`${label}: use a unique lowercase URL name.`);ids.add(e.id);
  if(!e.title?.trim()||!e.venue?.trim()||!e.blurb?.trim())errors.push(`${label}: title, venue and description are required.`);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(e.date||'')||Number.isNaN(Date.parse(e.date)) || (!Number.isNaN(Date.parse(e.date)) && new Date(e.date).toISOString().slice(0,10)!==e.date))errors.push(`${label}: enter a valid event date.`);
  for(const key of ['startTime','endTime'])if(e[key]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(e[key]))errors.push(`${label}: ${key} must be a valid time.`);
  if(!e.archiveAt||Number.isNaN(Date.parse(e.archiveAt))||Date.parse(e.archiveAt)<=Date.parse(`${e.date}T${e.startTime||'00:00'}:00+10:00`))errors.push(`${label}: archive time must be after the event starts.`);
  if(e.endTime&&(!e.startTime||e.endTime<=e.startTime))errors.push(`${label}: end time must follow start time on the same day.`);
  if(!Array.isArray(e.tags))errors.push(`${label}: categories are missing.`);
  for(const key of ['ticketUrl','updatesUrl'])if(!safeUrl(e[key]))errors.push(`${label}: use a secure https link for ${key}.`);
  if(!e.photo||!safeUrl(e.photo,true))errors.push(`${label}: choose a valid photo path or https link.`);
 }
 for(const [collection,fields] of [['albums',['url','cover']],['stories',['url','image']],['gallery',['src']]])for(const item of data[collection])for(const key of fields)if(!safeUrl(item[key],key!=='url'))errors.push(`${collection}: invalid ${key} link.`);
 if(!safeUrl(data.media.heroVideo,true)||!safeUrl(data.media.heroPoster,true))errors.push('Homepage media needs a local asset or secure https link.');
 return errors;
}
export function normalizeEvent(event){const date=new Date(`${event.date}T12:00:00+10:00`);return {...event,day:String(date.getUTCDate()).padStart(2,'0'),month:date.toLocaleDateString('en-AU',{month:'short',timeZone:'Australia/Brisbane'}).toUpperCase(),year:Number(event.date.slice(0,4)),dow:date.toLocaleDateString('en-AU',{weekday:'short',timeZone:'Australia/Brisbane'}).toUpperCase()};}
