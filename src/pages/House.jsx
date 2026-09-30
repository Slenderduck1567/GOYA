import React from 'react';
import { Button as Btn } from '../ds.js';
import { Icons as Ic2 } from '../Icons.jsx';
import { SITE } from '../site.js';
import { Footer as Ftr } from '../Chrome.jsx';
import { PageHero, MapEmbed, directionsUrl, useGo, usePageTitle } from '../shared.jsx';

export default function GoyaHouseScreen({ wide }) {
  const go = useGo();
  usePageTitle('GOYA House');
  return (
    <div>
      <PageHero photo="/assets/photos/house.jpg" eyebrow="Our place" title="GOYA House" wide={wide} />
      <section style={{ padding: '32px 22px' }}>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-body)', fontWeight: 500 }}>
          GOYA House — known to everyone as <em>the Steki</em> — is our home base in South Brisbane. It's where Friday nights happen, where the dance group rehearses, and where you'll always find a familiar face.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '24px 0' }}>
          {[[Ic2.MapPin, 'Address', '22A Browning St, South Brisbane'], [Ic2.Calendar, 'Open', 'Every Friday from 7:30 PM'], [Ic2.Users, 'Who', 'GOYA members & guests — all welcome']].map(([Ico, k, v], i) => (
            <div key={i} style={{ display: 'flex', gap: 13, alignItems: 'center', padding: '14px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)' }}>
              <span style={{ display: 'inline-flex', width: 42, height: 42, borderRadius: 'var(--radius-sm)', background: 'var(--bg-tint)', color: 'var(--accent)', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Ico size={20} /></span>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{k}</div>
                <div style={{ fontWeight: 600, color: 'var(--text-strong)', fontSize: 15.5 }}>{v}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 12 }}><MapEmbed query={SITE.mapQuery} height={220} /></div>
        <div style={{ marginBottom: 24 }}>
          <Btn variant="secondary" full as="a" href={directionsUrl()} target="_blank" rel="noopener" iconLeft={<Ic2.MapPin size={17} />}>Get directions</Btn>
        </div>
        <Btn variant="primary" size="lg" full iconRight={<Ic2.ArrowRight size={17} />} onClick={() => go('events')}>See what's on</Btn>
      </section>
      <Ftr />
    </div>
  );
}
