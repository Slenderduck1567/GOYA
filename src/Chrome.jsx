import { SmartImage } from "./components/SmartImage.jsx";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Icons } from "./Icons.jsx";
import { SITE, pathFor } from "./site.js";
const LINKS = [
  ["events", "Events"],
  ["house", "GOYA House"],
  ["about", "Our story"],
  ["junior", "Junior GOYA"],
  ["gallery", "Gallery"],
  ["stories", "Stories"],
  ["contact", "Contact"],
];
// The desktop links and the mobile "Menu" button are both in the page; CSS shows one or
// the other at the 1180px breakpoint, so the right one appears before any JavaScript runs.
export function Header({ onMenu, transparent, current, menuOpen }) {
  return (
    <header className={`site-header ${transparent ? "is-transparent" : ""}`}>
      <Link to="/" aria-label="GOYA Brisbane — home" className="brand">
        <SmartImage
          src={`/assets/logo-goya-${transparent ? "white" : "ink"}.png`}
          alt="GOYA"
        />
      </Link>
      <nav aria-label="Main">
        {LINKS.map(([k, l]) => (
          <Link
            key={k}
            to={pathFor(k)}
            aria-current={current === k ? "page" : undefined}
          >
            {l}
          </Link>
        ))}
        <Link className="header-join" to="/join">
          Find your parea <Icons.ArrowRight size={16} />
        </Link>
      </nav>
      <button
        className="menu-trigger"
        onClick={onMenu}
        aria-label="Open menu"
        aria-expanded={menuOpen}
        aria-controls="site-menu"
      >
        <span>Menu</span>
        <Icons.Menu size={22} />
      </button>
    </header>
  );
}
export function BottomNav({ current }) {
  return (
    <nav className="bottom-nav" aria-label="Quick links">
      {[
        ["home", "Home", Icons.Home],
        ["events", "Events", Icons.Calendar],
        ["house", "GOYA House", Icons.MapPin],
        ["join", "Join", Icons.Users],
      ].map(([k, l, I]) => (
        <Link
          key={k}
          to={pathFor(k)}
          aria-current={current === k ? "page" : undefined}
        >
          <I size={20} />
          <span>{l}</span>
        </Link>
      ))}
    </nav>
  );
}
export function SideMenu({ open, onClose, current }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement,
      overflow = document.body.style.overflow;
    const background = [
      document.querySelector("main"),
      document.querySelector("header"),
      document.querySelector(".bottom-nav"),
    ].filter(Boolean);
    background.forEach((el) => (el.inert = true));
    document.body.style.overflow = "hidden";
    ref.current.querySelector("button").focus();
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const nodes = [...ref.current.querySelectorAll("a,button")];
        const first = nodes[0],
          last = nodes.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      background.forEach((el) => (el.inert = false));
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="menu-backdrop" onClick={onClose}>
      <aside
        id="site-menu"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="side-menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="menu-top">
          <SmartImage src="/assets/seal-white.png" alt="GOYA seal" />
          <button
            className="icon-control"
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icons.X size={24} />
          </button>
        </div>
        <nav aria-label="Menu">
          {[["home", "Home"], ...LINKS, ["join", "Join GOYA"]].map(
            ([k, l], i) => (
              <Link
                key={k}
                to={pathFor(k)}
                onClick={onClose}
                aria-current={current === k ? "page" : undefined}
              >
                <span className="menu-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {l}
                <Icons.ArrowRight size={18} />
              </Link>
            ),
          )}
        </nav>
        <a
          className="menu-social"
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          {SITE.instagramHandle} ↗
        </a>
      </aside>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" aria-label="GOYA home">
            <SmartImage
              className="footer-logo"
              src="/assets/logo-goya-white.png"
              alt="GOYA"
            />
          </Link>
          <p>
            Live your Orthodox faith.
            <br />
            Find your parea.
          </p>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
            {SITE.instagramHandle} ↗
          </a>
        </div>
        <nav aria-label="Footer">
          {[...LINKS, ["join", "Join GOYA"]].map(([k, l]) => (
            <Link key={k} to={pathFor(k)}>
              {l}
            </Link>
          ))}
        </nav>
        <div>
          <span className="eyebrow">Our home in Brisbane</span>
          <p>
            {SITE.addressShort}
            <br />
            Queensland 4101
          </p>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} GOYA Brisbane</span>
        <span className="footer-signature">
          <SmartImage src="/assets/meander.svg" alt="" aria-hidden="true" />
          Faith. Culture. Friendship.
        </span>
      </div>
    </footer>
  );
}
