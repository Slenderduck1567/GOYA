import React from 'react';
import manifest from '../content/image-manifest.json';
export function SmartImage({src,sizes,className,...props}){
 const image=manifest[src];
 if(!image)return <img src={src} className={className} {...props}/>;
 return <img src={image.src} srcSet={image.smallWidth<image.width?`${image.small} ${image.smallWidth}w, ${image.src} ${image.width}w`:undefined} sizes={sizes||(className?.includes('hero')?'100vw':'(min-width: 1000px) 50vw, 100vw')} width={image.width} height={image.height} decoding="async" className={className} {...props}/>;
}
