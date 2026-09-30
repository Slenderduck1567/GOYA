import React from 'react';

/**
 * GOYA Tag — interactive category/filter chip (e.g. event filters).
 * Toggles between resting and `active` (Aegean) states.
 */
export function Tag({ children, active = false, as = 'button', style = {}, ...rest }) {
  const Comp = as;
  return (
    <Comp
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: '0.875rem',
        padding: '7px 14px',
        borderRadius: 'var(--radius-pill)',
        border: `1.5px solid ${active ? 'var(--accent)' : 'var(--ink-200)'}`,
        background: active ? 'var(--accent)' : 'var(--paper)',
        color: active ? 'var(--paper)' : 'var(--text-body)',
        cursor: 'pointer',
        lineHeight: 1,
        transition: 'all var(--dur-fast) var(--ease-standard)',
        WebkitTapHighlightColor: 'transparent',
        ...style,
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.borderColor = 'var(--ink-400)'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = 'var(--ink-200)'; }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
