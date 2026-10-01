import {useEffect} from 'react';
import {metadata,headTags} from '../lib/seo.js';
// Keeps the page title, description, canonical link, social preview tags and structured
// data in step with the current page as visitors move around the site. The first page
// load already has the same tags from the build (scripts/prerender.mjs).
export function Metadata({path}){useEffect(()=>{
 const data=metadata(path);document.title=data.title;
 document.head.querySelectorAll('[data-seo]').forEach(el=>el.remove());
 for(const [tag,attrs] of headTags(data)){const el=document.createElement(tag);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,v);el.setAttribute('data-seo','');document.head.appendChild(el);}
 const schema=document.createElement('script');schema.type='application/ld+json';schema.setAttribute('data-seo','');schema.textContent=JSON.stringify(data.schema);document.head.appendChild(schema);
 },[path]);return null;}
