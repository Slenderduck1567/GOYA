import { SmartImage } from "./SmartImage.jsx";
import React,{useEffect,useRef,useState} from 'react';
import {DATA} from '../data.js';
export function HeroMedia(){
 const [allowed,setAllowed]=useState(false),[playing,setPlaying]=useState(false),[failed,setFailed]=useState(false);
 const video=useRef(null), userPaused=useRef(false); const src=DATA.media?.heroVideo;
 useEffect(()=>{const motion=matchMedia('(prefers-reduced-motion: reduce)'); const connection=navigator.connection;
 const update=()=>setAllowed(!motion.matches&&!connection?.saveData&&!/2g/.test(connection?.effectiveType||''));
 update();motion.addEventListener('change',update);connection?.addEventListener('change',update);
 return()=>{motion.removeEventListener('change',update);connection?.removeEventListener('change',update)};
 },[]);
 useEffect(()=>{if(!allowed||!src||failed)return;const el=video.current;
 const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting&&!document.hidden&&!userPaused.current)el.play().catch(()=>setPlaying(false));else el.pause()});observer.observe(el);
 const visibility=()=>{if(document.hidden)el.pause()};document.addEventListener('visibilitychange',visibility);
 return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility)};
 },[allowed,src,failed]);
 return <><SmartImage className="hero-image" src={DATA.media?.heroPoster||'/assets/photos/goya-crowd.jpg'} alt="The parea together at a GOYA night" fetchpriority="high"/>
 {allowed&&src&&!failed&&<><video ref={video} className="hero-video" src={src} muted loop playsInline preload="metadata" aria-hidden="true" onError={()=>setFailed(true)} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/><button className="video-control" onClick={()=>{userPaused.current=playing;playing?video.current.pause():video.current.play().catch(()=>setFailed(true))}}>{playing?'Pause film':'Play film'} <span aria-hidden="true">{playing?'Ⅱ':'▷'}</span></button></>}
 </>;
}
