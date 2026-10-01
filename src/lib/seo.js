import {DATA} from '../data.js';
import {SITE} from '../site.js';
export const ORIGIN=SITE.url.replace(/\/+$/,'');
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
};
export function metadata(path){
 const event=DATA.events.find(e=>path===`/events/${e.id}`);
 const [title,description]=event?[`${event.title} · GOYA Brisbane`,`${event.dow} ${event.day} ${event.month} ${event.year}. ${event.time}. ${event.venue}. ${event.age||''}`]:pages[path]||pages['/'];
 const photo=event?.photo||'/assets/og-image.jpg';
 const image=photo.startsWith('https://')?photo:ORIGIN+photo;
 const schema=event?{'@context':'https://schema.org','@type':'Event',name:event.title,description:event.blurb,startDate:event.startTime?`${event.date}T${event.startTime}:00+10:00`:event.date,...(event.endTime?{endDate:`${event.date}T${event.endTime}:00+10:00`}:{}),eventAttendanceMode:'https://schema.org/OfflineEventAttendanceMode',location:{'@type':'Place',name:event.venue,address:event.venue},image:[image],url:ORIGIN+path,organizer:{'@type':'Organization',name:'GOYA Brisbane',url:ORIGIN}}:{'@context':'https://schema.org','@type':'Organization',name:'GOYA Brisbane',url:ORIGIN,logo:ORIGIN+'/assets/logo-goya-ink.png',sameAs:['https://www.instagram.com/goya.brisbane/']};
 return {title,description,image,url:ORIGIN+path,schema,noindex:path==='/admin'||path==='/thanks'};
}
export const publicRoutes=Object.keys(pages).filter(p=>p!=='/admin').concat(DATA.events.map(e=>`/events/${e.id}`));
