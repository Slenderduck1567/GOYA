import { SmartImage } from "../SmartImage.jsx";
import React from 'react';

/**
 * GOYA Avatar — circular member/photo avatar with image or initials fallback.
 * Sizes sm–xl. Optional `ring` for an Aegean ring (e.g. active member).
 */
export function Avatar({ src, name = '', size = 'md', ring = false, style = {}, ...rest }) {
  const dims = { xs: 28, sm: 36, md: 44, lg: 56, xl: 72 };
  const d = dims[size] || dims.md;
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  return (
    <div
      style={{
        width: d,
        height: d,
        borderRadius: '50%',
        background: src ? 'var(--ink-200)' : 'var(--aegean-700)',
        color: 'var(--paper)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        fontSize: d * 0.38,
        overflow: 'hidden',
        flex: 'none',
        boxShadow: ring ? '0 0 0 2px var(--paper), 0 0 0 4px var(--accent)' : 'none',
        ...style,
      }}
      {...rest}
    >
      {src
        ? <SmartImage src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : (initials || '?')}
    </div>
  );
}
