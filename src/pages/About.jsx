import React from 'react';
import { SectionHeading as SH, Avatar as Av } from '../ds.js';
import { Footer as Ftr } from '../Chrome.jsx';
import { PageHero, usePageTitle } from '../shared.jsx';

const GOYA_TIMELINE = [
  ['1913', 'The first organised Greek group in Queensland — the “Greek Association” — forms in Brisbane, the seed of a community that is still growing today.'],
  ['1944', 'The Greek Orthodox Community of St George is founded as an umbrella community for all Greeks in Queensland — today the oldest and largest in the state.'],
  ['1958', 'The landmark octagonal Church of St George opens in South Brisbane, built during the post-war wave of Greek migration to Queensland.'],
  ['1967', 'The Greek Orthodox Youth of Australia — GOYA — Brisbane Branch is founded under St George, giving young Greek Australians a home of their own.'],
  ['Today', 'GOYA gathers every Friday at GOYA House — “To Steki” — on Browning St, carrying the same parea forward to a new generation.'],
];

const GOYA_EXEC = [
  ['James Kontoudios', 'President'],
  ['Agapi Kalligeros', 'Vice-President'],
  ['Vas Karanicolas', 'Secretary'],
  ['Peter Lahanas', 'Treasurer'],
];

const GOYA_COMMITTEE = [
  ['Zoe Fotinis', 'Sports & Recreation · Junior GOYA'],
  ['Peter Samios', 'Faith & Culture'],
  ['Alyssa Fotinis', 'Sports & Recreation · GOYA House'],
  ['Micheal Penklis', 'GOYA 18+ Events · Socials'],
  ['Anna Ghorayeb', 'GOYA 18+ Events · Socials'],
  ['Manning Mageros', 'GOYA 18+ Events · Sports'],
  ['Steph Sakley', 'Socials · Faith & Culture'],
  ['Nick Penklis', 'GOYA 18+ Events · Socials'],
  ['Jen Sakley', 'Junior GOYA · Faith & Culture'],
  ['Dean Balev', 'Sports & Recreation · Junior GOYA'],
  ['Thomas Paradissis', 'Sports & Recreation · GOYA House'],
  ['Elena Sfouggaristos', 'Socials · GOYA House'],
  ['Luke Karalis', 'Sports & Recreation · Junior GOYA'],
  ['Sofia Papas', 'GOYA House · Junior GOYA'],
];

export default function AboutScreen({ wide }) {
  usePageTitle('About & History');
  return (
    <div>
      <PageHero photos={['/assets/photos/about-building.jpg', '/assets/photos/about-collage.jpg', '/assets/photos/about-group.jpg', '/assets/photos/about-youth.jpg']} eyebrow="About GOYA" title="Our story" wide={wide} />
      <section style={{ padding: '32px 22px', maxWidth: 760, margin: '0 auto' }}>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-body)', fontWeight: 500 }}>
          GOYA — the Greek Orthodox Youth of Australia — is the youth branch of the Greek Orthodox Community of St George here in Brisbane. We're a home for second and third-generation Greek Australians to stay connected to their faith, culture and each other.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-muted)' }}>
          We're not a charity and we're not a club you join from the sidelines. We're parea — friends who organise events, dance, eat, and grow up together. Whether you're 16 or 30, brand new to Brisbane or born here, there's a place for you.
        </p>
      </section>

      {/* History timeline */}
      <section style={{ background: 'var(--bg-tint)', borderTop: '1px solid var(--aegean-200)', borderBottom: '1px solid var(--aegean-200)', padding: '36px 22px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <SH eyebrow="Since 1967" title="Our history" />
          <div style={{ marginTop: 26, position: 'relative', paddingLeft: 28 }}>
            <div style={{ position: 'absolute', left: 7, top: 6, bottom: 6, width: 2, background: 'var(--aegean-300)' }} />
            {GOYA_TIMELINE.map(([year, text]) => (
              <div key={year} style={{ position: 'relative', paddingBottom: 24 }}>
                <div style={{ position: 'absolute', left: -28, top: 2, width: 16, height: 16, borderRadius: '50%', background: 'var(--accent)', border: '3px solid var(--bg-tint)' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--accent)', lineHeight: 1 }}>{year}</div>
                <p style={{ margin: '6px 0 0', fontSize: 15, lineHeight: 1.55, color: 'var(--text-body)' }}>{text}</p>
              </div>
            ))}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-faint)' }}>
            Community history per the Greek Orthodox Community of St George, Brisbane.
          </p>
        </div>
      </section>

      {/* 2026 committee group photo */}
      <section style={{ padding: '40px 22px 8px', maxWidth: 900, margin: '0 auto' }}>
        <SH eyebrow="Meet the team" title="The 2026 committee" />
        <div style={{ marginTop: 22, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-hairline)' }}>
          <img src="/assets/photos/committee-2026.jpg" alt="GOYA 2026 committee" style={{ width: '100%', display: 'block' }} />
        </div>
        <p style={{ margin: '14px 0 0', fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          The volunteers leading the Greek youth of Brisbane this year — across events, sports, faith &amp; culture, Junior GOYA and GOYA House.
        </p>
      </section>

      {/* Executives */}
      <section style={{ padding: '28px 22px 8px', maxWidth: 900, margin: '0 auto' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '0 0 16px' }}>Executive committee</h3>
        <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(4,minmax(0,1fr))' : 'repeat(2,minmax(0,1fr))', gap: 14 }}>
          {GOYA_EXEC.map(([name, role]) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '22px 12px', background: 'var(--bg-surface)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
              <Av name={name} size="xl" ring />
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 15, color: 'var(--text-strong)' }}>{name}</div>
                <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Committee & sub-committee */}
      <section style={{ padding: '24px 22px 40px', maxWidth: 900, margin: '0 auto' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '0 0 16px' }}>Committee members</h3>
        <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(3,minmax(0,1fr))' : 'repeat(2,minmax(0,1fr))', gap: 12 }}>
          {GOYA_COMMITTEE.map(([name, role]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 13px', background: 'var(--bg-surface)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)' }}>
              <Av name={name} size="md" />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, color: 'var(--text-strong)', lineHeight: 1.25 }}>{name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.3 }}>{role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Ftr />
    </div>
  );
}
