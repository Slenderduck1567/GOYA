import React from 'react';

/**
 * GOYA Stat — a big number with a label, for community figures
 * (members, events held, years running). Display type, optional accent.
 */
export function Stat({ value, label, accent = false, align = 'left', style = {}, ...rest }) {
  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: accent ? 'var(--accent)' : 'var(--text-strong)',
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 8,
          fontFamily: 'var(--font-heading)',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--text-muted)',
        }}
      >
        {label}
      </div>
    </div>
  );
}
