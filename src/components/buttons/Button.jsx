import React from 'react';

/**
 * GOYA Button — the primary call-to-action primitive.
 * Variants: primary (Aegean fill), secondary (ink outline), ghost (text), inverse (on dark).
 * Sizes: sm, md, lg. Optional leading/trailing icon (pass an SVG/element).
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { fontSize: '0.8125rem', padding: '0 14px', height: 36, gap: 7 },
    md: { fontSize: '0.9375rem', padding: '0 20px', height: 46, gap: 9 },
    lg: { fontSize: '1.0625rem', padding: '0 28px', height: 56, gap: 10 },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: full ? 'flex' : 'inline-flex',
    width: full ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: s.fontSize,
    letterSpacing: '0.01em',
    lineHeight: 1,
    borderRadius: 'var(--radius-pill)',
    border: '1.5px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    WebkitTapHighlightColor: 'transparent',
  };

  const variants = {
    primary: { background: 'var(--accent)', color: 'var(--text-on-accent)' },
    secondary: { background: 'transparent', color: 'var(--text-strong)', borderColor: 'var(--ink-300)' },
    ghost: { background: 'transparent', color: 'var(--text-strong)' },
    inverse: { background: 'var(--paper)', color: 'var(--ink-900)' },
  };

  const Comp = as;
  return (
    <Comp
      style={{ ...base, ...(variants[variant] || variants.primary), ...style }}
      disabled={as === 'button' ? disabled : undefined}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === 'primary') e.currentTarget.style.background = 'var(--accent-hover)';
        if (variant === 'secondary') { e.currentTarget.style.borderColor = 'var(--ink-900)'; }
        if (variant === 'ghost') e.currentTarget.style.background = 'var(--ink-100)';
        if (variant === 'inverse') e.currentTarget.style.background = 'var(--ink-150)';
      }}
      onMouseLeave={(e) => {
        const v = variants[variant] || variants.primary;
        e.currentTarget.style.background = v.background;
        e.currentTarget.style.borderColor = v.borderColor || 'transparent';
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.97)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Comp>
  );
}
