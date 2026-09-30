import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
const {render,metadata,publicRoutes,ORIGIN,validate}=await import('../work/ssr/prerender.js');
validate();
{
 const base=readFileSync('dist/index.html','utf8');
 const esc=v=>v.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
 for(const path of [...publicRoutes,'/admin']){
  const meta=metadata(path);
  let html=base.replace(/<title>.*?<\/title>/,`<title>${esc(meta.title)}</title>`).replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${esc(meta.description)}" />`);
  for(const key of ['title','description','image'])html=html.replace(new RegExp(`<meta property="og:${key}"[^>]*>`),`<meta property="og:${key}" content="${esc(meta[key])}" />`);
  html=html.replace('</head>',`<link rel="canonical" href="${meta.url}"/><meta property="og:url" content="${meta.url}"/><meta name="robots" content="${meta.noindex?'noindex,nofollow':'index,follow'}"/><script type="application/ld+json" id="structured-data">${JSON.stringify(meta.schema).replaceAll('<','\\u003c')}</script></head>`);
  if(path!=='/')html=html.replace(/<link rel="preload" as="image"[^>]*>/,'');
  html=html.replace('<div id="root"></div>',`<div id="root">${render(path)}</div>`);
  const dir=join('dist',path);mkdirSync(dir,{recursive:true});writeFileSync(join(dir,'index.html'),html);
 }
 writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes.map(path=>`<url><loc>${ORIGIN+path}</loc></url>`).join('')}</urlset>`);
 writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${ORIGIN}/sitemap.xml\n`);
 console.log(`Prerendered ${publicRoutes.length+1} pages with route-specific metadata.`);
}
