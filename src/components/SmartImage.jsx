import React from 'react';
import manifest from '../content/image-manifest.json';
// `loading` is passed first on purpose: React 18 sets attributes in the order given, and if
// `src` is set before loading="lazy" the browser starts downloading straight away, which
// made every "lazy" photo download immediately after moving between pages.
export function SmartImage({src,sizes,className,loading,...props}){
 const image=manifest[src];
 if(!image)return <img loading={loading} src={src} className={className} {...props}/>;
 const responsive=image.small&&image.smallWidth<image.width;
 return <img loading={loading} src={image.src} srcSet={responsive?`${image.small} ${image.smallWidth}w, ${image.src} ${image.width}w`:undefined} sizes={responsive?sizes||(className?.includes('hero')?'100vw':'(min-width: 1000px) 50vw, 100vw'):undefined} width={image.width} height={image.height} decoding="async" className={className} {...props}/>;
}
