import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
const {render,metadata,headHtml,publicRoutes,privateRoutes,ORIGIN,validate}=await import('../work/ssr/prerender.js');
validate();
{
 const base=readFileSync('dist/index.html','utf8');
 const seoBlock=/<!-- seo:start[\s\S]*?<!-- seo:end -->/;
 if(!seoBlock.test(base))throw new Error('index.html is missing the <!-- seo:start --> … <!-- seo:end --> block.');
 for(const path of [...publicRoutes,...privateRoutes]){
  let html=base.replace(seoBlock,headHtml(metadata(path)));
  if(path!=='/')html=html.replace(/<link rel="preload" as="image"[^>]*>/,'');
  html=html.replace('<div id="root"></div>',`<div id="root">${render(path)}</div>`);
  const dir=join('dist',path);mkdirSync(dir,{recursive:true});writeFileSync(join(dir,'index.html'),html);
 }
 writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes.map(path=>`<url><loc>${ORIGIN+path}</loc></url>`).join('')}</urlset>`);
 writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${ORIGIN}/sitemap.xml\n`);
 console.log(`Prerendered ${publicRoutes.length+privateRoutes.length} pages with route-specific metadata.`);
}
