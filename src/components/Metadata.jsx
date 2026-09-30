import {useEffect} from 'react';
import {metadata} from '../lib/seo.js';
export function Metadata({path}){useEffect(()=>{
 const data=metadata(path);document.title=data.title;
 const tag=(selector,attrs)=>{let el=document.head.querySelector(selector);if(!el){el=document.createElement(selector.startsWith('link')?'link':'meta');document.head.appendChild(el)}Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v))};
 tag('meta[name="description"]',{name:'description',content:data.description});
 for(const key of ['title','description','image','url'])tag(`meta[property="og:${key}"]`,{property:`og:${key}`,content:data[key]});
 tag('link[rel="canonical"]',{rel:'canonical',href:data.url});
 tag('meta[name="robots"]',{name:'robots',content:data.noindex?'noindex,nofollow':'index,follow'});
 let schema=document.getElementById('structured-data');if(!schema){schema=document.createElement('script');schema.id='structured-data';schema.type='application/ld+json';document.head.appendChild(schema)}schema.textContent=JSON.stringify(data.schema);
 },[path]);return null;}
