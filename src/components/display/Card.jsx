import React from 'react';

/**
 * GOYA Card — the base surface container. White, soft shadow, hairline border,
 * restrained radius. Set `interactive` for hover lift (links/clickable cards).
 */
export function Card({
  children,
  padding = 'md',
  interactive = false,
  tint = false,
  as = 'div',
  style = {},
  ...rest
}) {
  const pads = { none: 0, sm: 'var(--space-4)', md: 'var(--space-5)', lg: 'var(--space-6)' };
  const Comp = as;
  return (
    <Comp
      style={{
        background: tint ? 'var(--bg-tint)' : 'var(--bg-surface)',
        border: `1px solid ${tint ? 'var(--aegean-200)' : 'var(--border-hairline)'}`,
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-sm)',
        padding: pads[padding] ?? pads.md,
        transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)',
        cursor: interactive ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={interactive ? (e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      } : undefined}
      onMouseLeave={interactive ? (e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
      } : undefined}
      {...rest}
    >
      {children}
    </Comp>
  );
}
