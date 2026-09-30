import React from 'react';

/**
 * GOYA IconButton — a square/circular button holding a single icon.
 * Use for nav toggles, close buttons, social links, carousel arrows.
 */
export function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  round = true,
  label,
  disabled = false,
  ...rest
}) {
  const dims = { sm: 36, md: 44, lg: 52 };
  const d = dims[size] || dims.md;

  const variants = {
    ghost: { background: 'transparent', color: 'var(--text-strong)' },
    solid: { background: 'var(--accent)', color: 'var(--text-on-accent)' },
    outline: { background: 'var(--paper)', color: 'var(--text-strong)', border: '1.5px solid var(--ink-300)' },
    inverse: { background: 'rgba(255,255,255,0.14)', color: 'var(--paper)' },
  };

  return (
    <button
      aria-label={label}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: d,
        height: d,
        borderRadius: round ? 'var(--radius-pill)' : 'var(--radius-sm)',
        border: '1.5px solid transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
        WebkitTapHighlightColor: 'transparent',
        ...(variants[variant] || variants.ghost),
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === 'ghost') e.currentTarget.style.background = 'var(--ink-100)';
        if (variant === 'solid') e.currentTarget.style.background = 'var(--accent-hover)';
        if (variant === 'inverse') e.currentTarget.style.background = 'rgba(255,255,255,0.24)';
      }}
      onMouseLeave={(e) => { e.currentTarget.style.background = (variants[variant] || variants.ghost).background; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.92)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      {...rest}
    >
      {children}
    </button>
  );
}
