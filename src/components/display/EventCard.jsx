import React from 'react';
import { Badge } from './Badge.jsx';

/**
 * GOYA EventCard — the workhorse for the Events list. Photo with a date chip,
 * category badge, title, time + venue meta. Whole card is clickable.
 */
export function EventCard({
  image,
  day,
  month,
  category,
  categoryTone = 'accent',
  title,
  time,
  venue,
  free = false,
  onClick,
  imagePosition = 'center',
  style = {},
  ...rest
}) {
  return (
    <article
      onClick={onClick}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      <div style={{ position: 'relative', aspectRatio: '16 / 10', background: 'var(--ink-200)' }}>
        {image
          ? <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: imagePosition, display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--aegean-700), var(--aegean-900))' }} />}
        {/* Date chip */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'var(--paper)', borderRadius: 'var(--radius-sm)',
          padding: '6px 10px', textAlign: 'center', minWidth: 48,
          boxShadow: 'var(--shadow-md)', lineHeight: 1,
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.375rem', color: 'var(--text-strong)' }}>{day}</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 2 }}>{month}</div>
        </div>
        {free && (
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <Badge tone="success" solid>Free</Badge>
          </div>
        )}
      </div>
      <div style={{ padding: 'var(--space-5)' }}>
        {category && <div style={{ marginBottom: 10 }}><Badge tone={categoryTone}>{category}</Badge></div>}
        <h3 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem',
          lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--text-strong)', margin: '0 0 12px',
        }}>{title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          {time && <MetaRow icon="clock">{time}</MetaRow>}
          {venue && <MetaRow icon="pin">{venue}</MetaRow>}
        </div>
      </div>
    </article>
  );
}

function MetaRow({ icon, children }) {
  const paths = {
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    pin: <><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[icon]}</svg>
      <span>{children}</span>
    </div>
  );
}
