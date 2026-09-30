import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header, BottomNav, SideMenu } from './Chrome.jsx';
import { ROUTES } from './site.js';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import EventDetail from './pages/EventDetail.jsx';
import House from './pages/House.jsx';
import About from './pages/About.jsx';
import Join from './pages/Join.jsx';
import Gallery from './pages/Gallery.jsx';
import Junior from './pages/Junior.jsx';
import Netball from './pages/Netball.jsx';
import Contact from './pages/Contact.jsx';

const keyForPath = (path) => {
  if (path.startsWith('/events/')) return 'event';
  const hit = Object.entries(ROUTES).find(([, p]) => p === path);
  return hit ? hit[0] : null;
};

export default function App() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [wide, setWide] = useState(() => window.innerWidth >= 900);
  const closeMenu = useCallback(() => setMenu(false), []);

  useEffect(() => { window.scrollTo(0, 0); setMenu(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 60);
    const onResize = () => setWide(window.innerWidth >= 900);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  const key = keyForPath(pathname);
  const isEvent = key === 'event';
  const transparentHeader = (key === 'home' || isEvent) && atTop;
  const showBottomNav = !isEvent && !wide;
  const navCurrent = ['home', 'events', 'house', 'join'].includes(key) ? key : null;

  return (
    <>
      <a href="#main" className="visually-hidden">Skip to content</a>
      <Header onMenu={() => setMenu(true)} transparent={transparentHeader} wide={wide} current={key} />
      <main id="main" style={{ paddingTop: wide ? 108 : 96, paddingBottom: showBottomNav ? 'calc(64px + env(safe-area-inset-bottom))' : 0 }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home wide={wide} />} />
            <Route path={ROUTES.events} element={<Events wide={wide} />} />
            <Route path="/events/:id" element={<EventDetail wide={wide} />} />
            <Route path={ROUTES.house} element={<House wide={wide} />} />
            <Route path={ROUTES.about} element={<About wide={wide} />} />
            <Route path={ROUTES.join} element={<Join wide={wide} />} />
            <Route path={ROUTES.gallery} element={<Gallery wide={wide} />} />
            <Route path={ROUTES.junior} element={<Junior wide={wide} />} />
            <Route path={ROUTES.netball} element={<Netball wide={wide} />} />
            <Route path={ROUTES.contact} element={<Contact wide={wide} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      {showBottomNav && <BottomNav current={navCurrent} />}
      {!wide && <SideMenu open={menu} onClose={closeMenu} current={key} />}
    </>
  );
}
