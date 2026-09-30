import React from 'react';
import { Badge, SectionHeading, Tag, EventCard } from '../ds.js';
import { Icons as Ic } from '../Icons.jsx';
import { DATA } from '../data.js';
import { Footer } from '../Chrome.jsx';
import { Meander, useGo, usePageTitle } from '../shared.jsx';

export default function EventsScreen({ wide }) {
  const go = useGo();
  usePageTitle('Events');
  const D = DATA;
  const [filter, setFilter] = React.useState('All');
  const shown = filter === 'All' ? D.events : D.events.filter((e) => e.category === filter || (e.tags || []).includes(filter));
  return (
    <div style={{ minHeight: '100%' }}>
      <div style={{ padding: '24px 22px 8px' }}>
        <SectionHeading eyebrow="What's on" title="Events" />
        <p style={{ color: 'var(--text-muted)', margin: '14px 0 0', fontSize: 15 }}>Something on most weeks. Tap an event for details and to RSVP.</p>
      </div>

      {/* GOYA Weekend banner */}
      <section style={{ padding: '18px 22px 0' }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--ink-900)', color: '#fff', borderRadius: 'var(--radius-lg)', padding: '24px 22px', boxShadow: 'var(--shadow-md)' }}>
          <img src="/assets/seal-white.png" alt="" style={{ position: 'absolute', right: -34, top: -24, width: 168, opacity: 0.08 }} />
          <div style={{ position: 'relative' }}>
            <Meander color="var(--aegean-400)" w={72} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--aegean-200)', margin: '14px 0 8px' }}>2–4 OCT · BRISBANE</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.9rem,8vw,2.4rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, color: '#fff', margin: '0 0 12px' }}>The GOYA Weekend</h2>
            <p style={{ color: 'var(--ink-300)', fontSize: 15, lineHeight: 1.6, margin: 0, maxWidth: 420 }}>
              Three days of parea — a concert, the Aegean Cup, Kefi Night and the Gazi club night. Interstate? Make the trip — this is the one to be in Brisbane for. Tickets and details landing soon.
            </p>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', gap: 9, overflowX: 'auto', padding: '20px 22px 18px', WebkitOverflowScrolling: 'touch' }}>
        {D.filters.map((f) => (
          <div key={f} style={{ flex: 'none' }}><Tag active={filter === f} onClick={() => setFilter(f)}>{f}</Tag></div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: wide ? '1fr 1fr 1fr' : '1fr', gap: 18, padding: '0 22px 28px' }}>
        {shown.map((e) => (
          <EventCard key={e.id} image={e.photo} day={e.day} month={e.month} category={e.category}
            categoryTone={e.tone} free={e.free} title={e.title} time={e.time} venue={e.venue}
            imagePosition={e.photoPos || 'center'}
            onClick={() => go('event:' + e.id)} />
        ))}
        {shown.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>Nothing in this category just yet — check back soon.</p>}
      </div>

      {/* Women's netball EOI promo */}
      <section style={{ padding: '0 22px 36px' }}>
        <div onClick={() => go('netball')} style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'var(--bg-tint)', border: '1px solid var(--aegean-200)', borderRadius: 'var(--radius-lg)', padding: 16, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
          <img src="/assets/photos/netball.jpg" alt="Women's netball" style={{ width: 84, height: 84, borderRadius: 'var(--radius-md)', objectFit: 'cover', flex: 'none' }} />
          <div style={{ minWidth: 0 }}>
            <Badge tone="accent">Now open</Badge>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: 'var(--text-strong)', marginTop: 8 }}>Women's Netball</div>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--text-muted)' }}>Women 16–30 — register your interest.</p>
          </div>
          <Ic.ChevronRight size={22} style={{ marginLeft: 'auto', color: 'var(--accent)', flex: 'none' }} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
