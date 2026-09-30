import React from 'react';
import { SectionHeading as SH } from '../ds.js';
import { DATA } from '../data.js';
import { Footer as Ftr } from '../Chrome.jsx';
import { usePageTitle } from '../shared.jsx';

export default function GalleryScreen({ wide }) {
  usePageTitle('Gallery');
  const D = DATA;
  return (
    <div>
      <section style={{ padding: '24px 22px 18px' }}>
        <SH eyebrow="From the parea" title="Gallery" />
        <p style={{ color: 'var(--text-muted)', margin: '14px 0 0', fontSize: 15 }}>Moments from Friday nights, glendia and everything in between.</p>
      </section>
      <section style={{ padding: '0 22px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(3,1fr)' : '1fr 1fr', gap: 10 }}>
          {D.gallery.map((src, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: i % 5 === 0 ? '1 / 1.3' : '1 / 1', gridRow: i % 5 === 0 ? 'span 2' : 'span 1', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--ink-200)' }}>
              <img src={src} alt="GOYA moment" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </section>
      <Ftr />
    </div>
  );
}
