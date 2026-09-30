import React from 'react';
// GOYA UI kit — icon set (Lucide-style, 24px, 2px stroke). Attached to window.GOYAIcons.
const I = (paths, props = {}) => (p) => (
  <svg width={p.size || 22} height={p.size || 22} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={p.weight || 2} strokeLinecap="round" strokeLinejoin="round"
    style={p.style} {...props}>{paths}</svg>
);

const Menu = I(<><path d="M3 6h18M3 12h18M3 18h18"/></>);
const X = I(<><path d="M18 6L6 18M6 6l12 12"/></>);
const Home = I(<><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></>);
const Calendar = I(<><rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></>);
const MapPin = I(<><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></>);
const Users = I(<><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6M21 20c0-2.6-1.4-4.5-3.5-5.2"/></>);
const Clock = I(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>);
const ArrowRight = I(<><path d="M5 12h14M13 6l6 6-6 6"/></>);
const ArrowLeft = I(<><path d="M19 12H5M11 18l-6-6 6-6"/></>);
const ChevronRight = I(<><path d="M9 6l6 6-6 6"/></>);
const Image = I(<><rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="8.5" cy="8.5" r="1.8"/><path d="M21 16l-5-5L5 21"/></>);
const Camera = I(<><path d="M3 8.5A2 2 0 0 1 5 6.5h2l1.5-2h7L18 6.5h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><circle cx="12" cy="13" r="3.5"/></>);
const Heart = I(<><path d="M12 20s-7-4.6-9.2-9C1.3 8 2.8 4.8 6 4.8c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.2 0 4.7 3.2 3.2 6.2C19 15.4 12 20 12 20Z"/></>);
const Phone = I(<><path d="M5 4h3l1.5 4.5L7.5 10a12 12 0 0 0 6.5 6.5l1.5-2L20 16v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 7.2 2 2 0 0 1 5 4Z"/></>);
const Mail = I(<><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 6 8-6"/></>);
const Instagram = I(<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></>);
const Facebook = I(<><path d="M14 8.5h2.5V5.2H14c-2 0-3.4 1.5-3.4 3.6V11H8v3.3h2.6V22H14v-7.7h2.6l.5-3.3H14V9.2c0-.5.3-.7.9-.7Z" fill="currentColor" stroke="none"/></>);
const Check = I(<><path d="M20 6L9 17l-5-5"/></>);
const Star = I(<><path d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.9 6.7 19.5l1.1-6L3.4 9.3l6-.8Z"/></>);
const Sparkle = I(<><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/></>);

export const Icons = { Menu, X, Home, Calendar, MapPin, Users, Clock, ArrowRight, ArrowLeft, ChevronRight, Image, Camera, Heart, Phone, Mail, Instagram, Facebook, Check, Star, Sparkle };
