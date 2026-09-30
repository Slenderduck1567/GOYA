import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pathFor, SITE } from './site.js';

export function useGo() {
  const navigate = useNavigate();
  return (key) => navigate(pathFor(key));
}

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · GOYA Brisbane` : 'GOYA Brisbane — Find your parea';
  }, [title]);
}

export function Meander({ color = 'var(--accent)', w = 84 }) {
  const svg = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='30'%20height='30'%20viewBox='0%200%2030%2030'%3E%3Cpath%20d='M0%2027%20H30%20M3%2027%20V6%20H24%20V21%20H12%20V12%20H18'%20stroke='black'%20stroke-width='3'%20fill='none'/%3E%3C/svg%3E";
  return <div aria-hidden="true" style={{ height: 16, width: w, background: color,
    WebkitMaskImage: `url("${svg}")`, maskImage: `url("${svg}")`,
    WebkitMaskRepeat: 'repeat-x', maskRepeat: 'repeat-x', WebkitMaskSize: 'auto 100%', maskSize: 'auto 100%' }} />;
}

// Hero carousel — cross-fades through images on a timer
export function HeroCarousel({ images, interval = 8000 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {images.map((src, idx) => (
        <img key={src} src={src} alt="" loading={idx === 0 ? 'eager' : 'lazy'} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          opacity: idx === i ? 1 : 0, transition: 'opacity 1.4s var(--ease-standard)',
          transform: idx === i ? 'scale(1.04)' : 'scale(1)', transitionProperty: 'opacity, transform', transitionDuration: '1.4s, 8s',
        }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,15,18,0.45) 0%, rgba(14,15,18,0.2) 35%, rgba(14,15,18,0.88) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 22, right: 22, display: 'flex', gap: 8, zIndex: 3 }}>
        {images.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={'Slide ' + (idx + 1)} style={{
            width: idx === i ? 22 : 8, height: 8, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: idx === i ? '#fff' : 'rgba(255,255,255,0.5)', transition: 'all var(--dur-base) var(--ease-standard)', padding: 0,
          }} />
        ))}
      </div>
    </div>
  );
}

export function PageHero({ photo, photos, eyebrow, title, wide, interval = 6000 }) {
  const imgs = (photos && photos.length) ? photos : [photo];
  const [i, setI] = useState(0);
  useEffect(() => {
    if (imgs.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % imgs.length), interval);
    return () => clearInterval(t);
  }, [imgs.length, interval]);
  return (
    <section style={{ position: 'relative', marginTop: wide ? -108 : -96, height: 300, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {imgs.map((src, idx) => (
          <img key={src} src={src} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            opacity: idx === i ? 1 : 0, transition: 'opacity 1.4s var(--ease-standard), transform 7s var(--ease-standard)',
            transform: idx === i ? 'scale(1.05)' : 'scale(1)',
          }} />
        ))}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,15,18,0.45), rgba(14,15,18,0.85))' }} />
      {imgs.length > 1 && (
        <div style={{ position: 'absolute', bottom: 28, right: 22, display: 'flex', gap: 7, zIndex: 3 }}>
          {imgs.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={'Slide ' + (idx + 1)} style={{
              width: idx === i ? 20 : 7, height: 7, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0,
              background: idx === i ? '#fff' : 'rgba(255,255,255,0.5)', transition: 'all var(--dur-base) var(--ease-standard)',
            }} />
          ))}
        </div>
      )}
      <div style={{ position: 'relative', padding: '0 22px 28px' }}>
        <Meander color="var(--aegean-300)" />
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--aegean-200)', margin: '14px 0 8px' }}>{eyebrow}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.2rem,9vw,3rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, margin: 0, color: '#fff' }}>{title}</h1>
      </div>
    </section>
  );
}

// Real Google map (no API key needed). Falls back to the design's placeholder for "Venue TBA".
export function MapEmbed({ query, height = 200, label }) {
  const tba = !query || /tba/i.test(query);
  if (tba) {
    return (
      <div style={{ position: 'relative', height, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-hairline)', background: 'var(--ink-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, var(--ink-150) 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, var(--ink-150) 0 1px, transparent 1px 28px)' }} />
        <span style={{ position: 'relative', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{label || 'Venue to be announced'}</span>
      </div>
    );
  }
  return (
    <div style={{ height, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-hairline)', background: 'var(--ink-100)' }}>
      <iframe title={`Map: ${query}`} src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        width="100%" height="100%" style={{ border: 0, display: 'block' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  );
}

export const directionsUrl = (q = SITE.mapQuery) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
