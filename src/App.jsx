import React, { useCallback, useEffect, useState, useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header, BottomNav, SideMenu } from "./Chrome.jsx";
import { ROUTES } from "./site.js";
import { useEditorialMotion } from "./hooks/useEditorialMotion.js";
import { Metadata } from "./components/Metadata.jsx";
import { normalizePath } from "./lib/seo.js";
import Admin from "./pages/Admin.jsx";
import Stories from "./pages/Stories.jsx";
import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import House from "./pages/House.jsx";
import About from "./pages/About.jsx";
import Join from "./pages/Join.jsx";
import Gallery from "./pages/Gallery.jsx";
import Junior from "./pages/Junior.jsx";
import Netball from "./pages/Netball.jsx";
import Contact from "./pages/Contact.jsx";
import Thanks from "./pages/Thanks.jsx";

const keyForPath = (path) => {
  if (path.startsWith("/events/")) return "event";
  const hit = Object.entries(ROUTES).find(([, p]) => p === path);
  return hit ? hit[0] : null;
};

export default function App() {
  const location = useLocation();
  const { search } = location;
  // "/about/" is the same page as "/about".
  const pathname = normalizePath(location.pathname);
  useEditorialMotion(pathname + search);
  const [menu, setMenu] = useState(false);
  const [atTop, setAtTop] = useState(true);
  // Starts false on every first render (like the prerendered HTML) and is corrected right
  // after load. Only the slide-out menu depends on it; CSS handles the visible layout.
  const [wide, setWide] = useState(false);
  const previousPath = useRef(pathname);
  const closeMenu = useCallback(() => setMenu(false), []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenu(false);
    if (previousPath.current !== pathname) {
      requestAnimationFrame(() =>
        document.getElementById("main")?.focus({ preventScroll: true }),
      );
    }
    previousPath.current = pathname;
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 60);
    const onResize = () => setWide(window.innerWidth >= 1180);
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const key = keyForPath(pathname);
  const isEvent = key === "event";
  const transparentHeader =
    ["home", "event", "house", "about", "junior"].includes(key) && atTop;
  // Below 1180px the quick-links bar shows on every page except events (which have their
  // own action bar); CSS hides it on wide screens.
  const showBottomNav = !isEvent;
  const navCurrent = ["home", "events", "house", "join"].includes(key)
    ? key
    : null;

  return (
    <>
      <Metadata path={pathname} />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header
        menuOpen={menu}
        onMenu={() => setMenu(true)}
        transparent={transparentHeader}
        current={key}
      />
      <main
        id="main"
        tabIndex={-1}
        className={showBottomNav ? "with-bottom-nav" : "with-event-action"}
      >
        <div className={`page-root route-${key || pathname.slice(1)}`}>
          <Routes>
            <Route path="/" element={<Home wide={wide} />} />
            <Route path={ROUTES.events} element={<Events wide={wide} />} />
            <Route path="/events/kefi-night" element={<Navigate to="/events/aegean-cup-after-party" replace />} />
            <Route path="/events/:id" element={<EventDetail wide={wide} />} />
            <Route path={ROUTES.house} element={<House wide={wide} />} />
            <Route path={ROUTES.about} element={<About wide={wide} />} />
            <Route path={ROUTES.join} element={<Join wide={wide} />} />
            <Route path={ROUTES.gallery} element={<Gallery wide={wide} />} />
            <Route path={ROUTES.junior} element={<Junior wide={wide} />} />
            <Route path={ROUTES.netball} element={<Netball wide={wide} />} />
            <Route path={ROUTES.contact} element={<Contact wide={wide} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      {showBottomNav && <BottomNav current={navCurrent} />}
      {!wide && <SideMenu open={menu} onClose={closeMenu} current={key} />}
    </>
  );
}
