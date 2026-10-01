import {DATA} from '../data.js';
import {SITE} from '../site.js';
export const ORIGIN=SITE.url.replace(/\/+$/,'');
const SITE_NAME='GOYA Brisbane';
// The default link-preview image (1200×630). If the design changes, give the new file a
// new name so Facebook, WhatsApp and others fetch it instead of their cached copy.
const DEFAULT_IMAGE={path:'/assets/share-card.jpg',width:1200,height:630,alt:'GOYA Brisbane — Find your parea. Faith. Culture. Friendship.'};
const pages={
 '/':['GOYA Brisbane — Find your parea','Events, faith, culture and friendship for young Greek Australians in Brisbane. Find your next gathering and meet the parea.'],
 '/events':['Events · GOYA Brisbane','Explore upcoming GOYA Brisbane events, confirmed venue details, calendar reminders and the community event archive.'],
 '/goya-house':['GOYA House · The Steki','Discover GOYA House at 22A Browning Street, South Brisbane. Plan a visit or enquire about venue hire.'],
 '/about':['Our story · GOYA Brisbane','Meet the GOYA Brisbane committee and discover the story behind our Greek Orthodox youth community.'],
 '/junior-goya':['Junior GOYA · Brisbane','Find Junior GOYA family activities, parent information and a welcoming introduction for children and teenagers.'],
 '/gallery':['Photo albums · GOYA Brisbane','Explore GOYA Brisbane community photographs and official event photo albums.'],
 '/join':['Join the parea · GOYA Brisbane','New to GOYA? Introduce yourself or your family before your first visit.'],
 '/contact':['Contact · GOYA Brisbane','Contact the volunteer team about events, Junior GOYA, community involvement or GOYA House hire.'],
 '/stories':['Stories from the parea · GOYA Brisbane','Read community stories and meet the people behind GOYA Brisbane.'],
 '/netball':['Netball archive · GOYA Brisbane','GOYA’s netball activity has finished. Explore the community’s next events.'],
 '/admin':['Committee editor · GOYA Brisbane','Prepare public website content updates for GOYA Brisbane.'],
 '/thanks':['Thank you · GOYA Brisbane','Thanks for getting in touch with GOYA Brisbane.'],
};
// Pages that exist but should stay out of search results and the sitemap.
export const privateRoutes=['/admin','/thanks'];
// "/about/" and "/about" are the same page.
export const normalizePath=path=>(path||'/').replace(/\/+$/,'')||'/';

const DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const eventDate=date=>{const [y,m,d]=date.split('-').map(Number);return `${DAYS[new Date(Date.UTC(y,m-1,d)).getUTCDay()]} ${d} ${MONTHS[m-1]} ${y}`;};
const clip=(text,max)=>{if(text.length<=max)return text;const cut=text.lastIndexOf(' ',max-1);return text.slice(0,cut>0?cut:max-1).replace(/[,;:.\s]+$/,'')+'…';};
function eventDescription(e){
 const when=[eventDate(e.date),e.time==='Time TBA'?'time to be announced':e.time,e.venue,e.age].filter(Boolean).join(' · ');
 return clip(`${when}. ${e.blurb}`,200);
}
const organization={'@type':'Organization','@id':`${ORIGIN}/#organization`,name:SITE_NAME,alternateName:'Greek Orthodox Youth of Australia, Brisbane',url:`${ORIGIN}/`,
 logo:{'@type':'ImageObject',url:`${ORIGIN}/assets/logo-goya-ink.png`,width:1732,height:908},email:SITE.email,foundingDate:'1967',
 address:{'@type':'PostalAddress',streetAddress:'22A Browning St',addressLocality:'South Brisbane',addressRegion:'QLD',postalCode:'4101',addressCountry:'AU'},
 sameAs:['https://www.instagram.com/goya.brisbane/']};
const website={'@type':'WebSite','@id':`${ORIGIN}/#website`,name:SITE_NAME,url:`${ORIGIN}/`,inLanguage:'en-AU',publisher:{'@id':organization['@id']}};

export function metadata(rawPath){
 const path=normalizePath(rawPath);
 const event=DATA.events.find(e=>path===`/events/${e.id}`);
 const [title,description]=event?[`${event.title} · ${SITE_NAME}`,eventDescription(event)]:pages[path]||pages['/'];
 const url=ORIGIN+path;
 const absolute=src=>src.startsWith('https://')?src:ORIGIN+src;
 const image=event?{url:absolute(event.photo),alt:event.title}:{url:ORIGIN+DEFAULT_IMAGE.path,width:DEFAULT_IMAGE.width,height:DEFAULT_IMAGE.height,alt:DEFAULT_IMAGE.alt};
 const graph=[organization];
 if(path==='/')graph.push(website);
 if(event)graph.push({'@type':'Event',name:event.title,description:event.blurb,
  startDate:event.startTime?`${event.date}T${event.startTime}:00+10:00`:event.date,...(event.endTime?{endDate:`${event.date}T${event.endTime}:00+10:00`}:{}),
  eventStatus:'https://schema.org/EventScheduled',eventAttendanceMode:'https://schema.org/OfflineEventAttendanceMode',
  location:{'@type':'Place',name:event.venue,address:{'@type':'PostalAddress',streetAddress:event.venue,addressRegion:'QLD',addressCountry:'AU'}},
  image:[image.url],url,organizer:{'@id':organization['@id']}});
 return {title,description,image,url,schema:{'@context':'https://schema.org','@graph':graph},noindex:privateRoutes.includes(path)};
}

// The <head> tags each page carries. Used by the build (prerender) and kept in sync by
// the Metadata component when visitors move between pages.
export function headTags(meta){
 const tags=[
  ['meta',{name:'description',content:meta.description}],
  ['link',{rel:'canonical',href:meta.url}],
  ['meta',{name:'robots',content:meta.noindex?'noindex,nofollow':'index,follow'}],
  ['meta',{property:'og:type',content:'website'}],
  ['meta',{property:'og:site_name',content:SITE_NAME}],
  ['meta',{property:'og:locale',content:'en_AU'}],
  ['meta',{property:'og:title',content:meta.title}],
  ['meta',{property:'og:description',content:meta.description}],
  ['meta',{property:'og:url',content:meta.url}],
  ['meta',{property:'og:image',content:meta.image.url}],
  ...(meta.image.width?[['meta',{property:'og:image:width',content:String(meta.image.width)}],['meta',{property:'og:image:height',content:String(meta.image.height)}]]:[]),
  ['meta',{property:'og:image:alt',content:meta.image.alt}],
  ['meta',{name:'twitter:card',content:'summary_large_image'}],
  ['meta',{name:'twitter:title',content:meta.title}],
  ['meta',{name:'twitter:description',content:meta.description}],
  ['meta',{name:'twitter:image',content:meta.image.url}],
  ['meta',{name:'twitter:image:alt',content:meta.image.alt}],
 ];
 return tags;
}
const esc=v=>String(v).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function headHtml(meta){
 const tags=headTags(meta).map(([tag,attrs])=>`<${tag} ${Object.entries(attrs).map(([k,v])=>`${k}="${esc(v)}"`).join(' ')} data-seo />`);
 return [`<title>${esc(meta.title)}</title>`,...tags,`<script type="application/ld+json" data-seo>${JSON.stringify(meta.schema).replaceAll('<','\\u003c')}</script>`].join('\n  ');
}
export const publicRoutes=Object.keys(pages).filter(p=>!privateRoutes.includes(p)).concat(DATA.events.map(e=>`/events/${e.id}`));
