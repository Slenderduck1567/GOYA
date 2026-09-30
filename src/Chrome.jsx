// GOYA website chrome — Header, SideMenu, BottomNav, Footer
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from './Icons.jsx';
import { SITE, pathFor } from './site.js';

const { Menu, X, Home, Calendar, MapPin, Users, Instagram, Facebook, ArrowRight } = Icons;

export function Header({ onMenu, transparent, wide, current }) {
  const links = [['home', 'Home'], ['events', 'Events'], ['house', 'GOYA House'], ['about', 'About'], ['junior', 'Junior'], ['gallery', 'Gallery'], ['contact', 'Contact']];
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40, height: wide ? 108 : 96,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 18,
      padding: wide ? '0 max(24px, calc((100% - 1180px) / 2 + 24px))' : '0 18px',
      background: transparent ? 'transparent' : 'rgba(255,255,255,0.86)',
      backdropFilter: transparent ? 'none' : 'saturate(180%) blur(12px)',
      WebkitBackdropFilter: transparent ? 'none' : 'saturate(180%) blur(12px)',
      borderBottom: transparent ? '1px solid transparent' : '1px solid var(--border-hairline)',
      transition: 'all var(--dur-base) var(--ease-standard)',
    }}>
      <Link to="/" aria-label="GOYA Brisbane — home" style={{ display: 'inline-flex' }}>
        <img src={transparent ? '/assets/logo-goya-white.png' : '/assets/logo-goya-ink.png'}
          alt="GOYA" style={{ height: wide ? 90 : 78 }} />
      </Link>

      {wide ? (
        <nav aria-label="Main" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map(([key, label]) => {
            const active = current === key;
            return (
              <Link key={key} to={pathFor(key)} className="plain" aria-current={active ? 'page' : undefined} style={{
                padding: '8px 14px', borderRadius: 'var(--radius-pill)',
                fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15,
                color: transparent ? (active ? '#fff' : 'rgba(255,255,255,0.82)') : (active ? 'var(--accent)' : 'var(--text-body)'),
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = transparent ? 'rgba(255,255,255,0.14)' : 'var(--ink-100)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                {label}
              </Link>
            );
          })}
          <Link to={pathFor('join')} className="plain" style={{
            marginLeft: 8, display: 'inline-flex', alignItems: 'center',
            padding: '0 20px', height: 42, borderRadius: 'var(--radius-pill)',
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15,
            background: transparent ? '#fff' : 'var(--accent)',
            color: transparent ? 'var(--ink-900)' : '#fff',
          }}>Join GOYA</Link>
        </nav>
      ) : (
        <button onClick={onMenu} aria-label="Open menu" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 42, height: 42, borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer',
          background: transparent ? 'rgba(255,255,255,0.18)' : 'var(--ink-100)',
          color: transparent ? 'var(--paper)' : 'var(--ink-900)',
        }}>
          <Menu size={22} />
        </button>
      )}
    </header>
  );
}

const NAV = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'events', label: 'Events', icon: Calendar },
  { key: 'house', label: 'GOYA House', icon: MapPin },
  { key: 'join', label: 'Join', icon: Users },
];

export function BottomNav({ current }) {
  return (
    <nav aria-label="Quick links" style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 40, height: 'calc(64px + env(safe-area-inset-bottom))',
      paddingBottom: 'env(safe-area-inset-bottom)',
      display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderTop: '1px solid var(--border-hairline)',
    }}>
      {NAV.map(({ key, label, icon: Ico }) => {
        const active = current === key;
        return (
          <Link key={key} to={pathFor(key)} className="plain" aria-current={active ? 'page' : undefined} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
            color: active ? 'var(--accent)' : 'var(--text-faint)',
            fontFamily: 'var(--font-heading)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.02em',
          }}>
            <Ico size={21} weight={active ? 2.4 : 2} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

const MENU_LINKS = [
  ['home', 'Home'], ['events', 'Events'], ['netball', "Women's Netball"], ['house', 'GOYA House'],
  ['about', 'About & History'], ['junior', 'Junior GOYA'], ['gallery', 'Gallery'],
  ['join', 'Join GOYA'], ['contact', 'Contact'],
];

export function SideMenu({ open, onClose, current }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);
  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(14,15,18,0.5)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity var(--dur-base) var(--ease-standard)',
      }} />
      <aside aria-hidden={!open} inert={open ? undefined : ''} style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 51, width: '82%', maxWidth: 340,
        background: 'var(--ink-900)', color: 'var(--paper)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform var(--dur-slow) var(--ease-out)',
        display: 'flex', flexDirection: 'column', padding: '20px 22px', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <img src="/assets/seal-white.png" alt="GOYA" style={{ height: 44 }} />
          <button onClick={onClose} aria-label="Close menu" style={{
            width: 42, height: 42, borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.12)', color: 'var(--paper)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}><X size={22} /></button>
        </div>
        <nav aria-label="Menu" style={{ display: 'flex', flexDirection: 'column' }}>
          {MENU_LINKS.map(([key, label]) => (
            <Link key={key} to={pathFor(key)} onClick={onClose} className="plain" style={{
              padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.01em',
              color: current === key ? 'var(--aegean-300)' : 'var(--paper)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              {label}
              <ArrowRight size={18} />
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', gap: 12, alignItems: 'center', color: 'var(--ink-300)' }}>
          <a href={SITE.instagram} target="_blank" rel="noopener" aria-label="Instagram" style={{ color: 'inherit' }}><Instagram size={22} /></a>
          {SITE.facebook && <a href={SITE.facebook} target="_blank" rel="noopener" aria-label="Facebook" style={{ color: 'inherit' }}><Facebook size={22} /></a>}
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)' }}>{SITE.instagramHandle}</span>
        </div>
      </aside>
    </>
  );
}

const socialStyle = { display: 'inline-flex', width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', color: '#fff' };

export function Footer() {
  return (
    <footer style={{ background: 'var(--ink-900)', color: 'var(--ink-300)', padding: '40px 22px 28px' }}>
      <img src="/assets/logo-goya-white.png" alt="GOYA" style={{ height: 30, marginBottom: 18 }} />
      <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-400)', margin: '0 0 20px', maxWidth: 280 }}>
        The Brisbane home for young Greek Australians. Live your Orthodox faith, find your parea.
      </p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <a href={SITE.instagram} target="_blank" rel="noopener" aria-label="GOYA on Instagram" style={socialStyle}><Instagram size={20} /></a>
        {SITE.facebook && <a href={SITE.facebook} target="_blank" rel="noopener" aria-label="GOYA on Facebook" style={socialStyle}><Facebook size={20} /></a>}
      </div>
      <nav aria-label="Footer" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13 }}>
        {[['events', 'Events'], ['house', 'GOYA House'], ['about', 'About'], ['join', 'Join'], ['contact', 'Contact']].map(([k, l]) =>
          <Link key={k} to={pathFor(k)} style={{ color: 'var(--ink-300)' }}>{l}</Link>)}
      </nav>
      <div style={{ marginTop: 26, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' }}>
        © {new Date().getFullYear()} GOYA Brisbane · {SITE.addressShort}
      </div>
    </footer>
  );
}
