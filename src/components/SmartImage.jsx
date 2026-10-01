import React from 'react';
import manifest from '../content/image-manifest.json';
// Photos are served as WebP in several widths and the browser picks the smallest that is
// sharp enough for the screen. Full-width banners ("hero" images) also get a 960px copy.
// `sizes` describes how wide the photo appears: half the page on wide screens, the page
// width minus its 24px margins on phones.
//
// `loading` is passed first on purpose: React 18 sets attributes in the order given, and if
// `src` is set before loading="lazy" the browser starts downloading straight away, which
// made every "lazy" photo download immediately after moving between pages.
export function SmartImage({src,sizes,className,loading,...props}){
 const image=manifest[src];
 if(!image)return <img loading={loading} src={src} className={className} {...props}/>;
 const hero=className?.includes('hero');
 const candidates=[[image.small,image.smallWidth],...(hero&&image.medium?[[image.medium,image.mediumWidth]]:[]),[image.src,image.width]].filter(([file,width])=>file&&(width<image.width||file===image.src));
 const responsive=candidates.length>1;
 return <img loading={loading} src={image.src} srcSet={responsive?candidates.map(([file,width])=>`${file} ${width}w`).join(', '):undefined} sizes={responsive?sizes||(hero?'100vw':'(min-width: 1000px) 50vw, calc(100vw - 48px)'):undefined} width={image.width} height={image.height} decoding="async" className={className} {...props}/>;
}
