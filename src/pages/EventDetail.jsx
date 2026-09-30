import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Button, IconButton, Badge } from '../ds.js';
import { Icons as Ic } from '../Icons.jsx';
import { DATA } from '../data.js';
import { SITE } from '../site.js';
import { MapEmbed, useGo, usePageTitle } from '../shared.jsx';

export default function EventDetailScreen({ wide }) {
  const go = useGo();
  const { id } = useParams();
  const e = DATA.events.find((x) => x.id === id);
  usePageTitle(e ? e.title : 'Events');
  if (!e) return <Navigate to="/events" replace />;
  return (
    <div>
      <section style={{ position: 'relative', marginTop: wide ? -108 : -96, height: 340, color: '#fff' }}>
        <img src={e.photo} alt={e.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: e.photoPos || 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,15,18,0.5) 0%, rgba(14,15,18,0.1) 40%, rgba(14,15,18,0.9) 100%)' }} />
        <div style={{ position: 'absolute', top: wide ? 124 : 112, left: 18 }}>
          <IconButton variant="inverse" label="Back to events" onClick={() => go('events')}><Ic.ArrowLeft size={20} /></IconButton>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 22 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <Badge tone={e.tone} solid>{e.category}</Badge>
            {e.free && <Badge tone="success" solid>Free entry</Badge>}
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0, color: '#fff' }}>{e.title}</h1>
        </div>
      </section>

      <section style={{ padding: '22px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 22 }}>
          {[[Ic.Calendar, e.dateLabel || `${e.dow} ${e.day} ${e.month}`], [Ic.Clock, e.time], [Ic.MapPin, e.venue]].map(([Ico, txt], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'inline-flex', width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--bg-tint)', color: 'var(--accent)', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Ico size={20} /></span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 16, color: 'var(--text-strong)' }}>{txt}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-body)' }}>{e.blurb}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '18px 0 26px' }}>
          {(e.tags || []).map((t) => <Badge key={t} tone="neutral">{t}</Badge>)}
        </div>
        <div style={{ marginBottom: 26 }}>
          <MapEmbed query={e.venue} height={180} />
        </div>
      </section>

      <div style={{ position: 'sticky', bottom: 0, zIndex: 5, padding: '14px 22px calc(14px + env(safe-area-inset-bottom))', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderTop: '1px solid var(--border-hairline)' }}>
        {e.ticketUrl ? (
          <Button variant="primary" size="lg" full as="a" href={e.ticketUrl} target="_blank" rel="noopener" iconRight={<Ic.ArrowRight size={18} />}>Get tickets</Button>
        ) : (
          <Button variant="primary" size="lg" full as="a" href={SITE.instagram} target="_blank" rel="noopener" iconLeft={<Ic.Instagram size={18} />}>Tickets soon — follow for updates</Button>
        )}
      </div>
    </div>
  );
}
