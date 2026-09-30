import React from 'react';

/**
 * GOYA Badge — small status/category pill. Tones: neutral, accent, success, warning, danger, sand.
 * Optional `dot` for a leading status dot. Use `solid` for filled emphasis.
 */
export function Badge({ children, tone = 'neutral', solid = false, dot = false, style = {}, ...rest }) {
  const tones = {
    neutral: { soft: ['var(--ink-100)', 'var(--ink-700)'], solid: ['var(--ink-900)', 'var(--paper)'] },
    accent:  { soft: ['var(--aegean-100)', 'var(--aegean-800)'], solid: ['var(--accent)', 'var(--paper)'] },
    success: { soft: ['#E4F1EA', 'var(--success)'], solid: ['var(--success)', 'var(--paper)'] },
    warning: { soft: ['#F8EFDC', '#8A5A0C'], solid: ['var(--warning)', 'var(--paper)'] },
    danger:  { soft: ['#F6E3E2', 'var(--danger)'], solid: ['var(--danger)', 'var(--paper)'] },
    sand:    { soft: ['var(--sand-200)', 'var(--ink-700)'], solid: ['var(--ink-700)', 'var(--paper)'] },
  };
  const pair = (tones[tone] || tones.neutral)[solid ? 'solid' : 'soft'];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: pair[0],
        color: pair[1],
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        fontSize: '0.6875rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        lineHeight: 1,
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />}
      {children}
    </span>
  );
}
