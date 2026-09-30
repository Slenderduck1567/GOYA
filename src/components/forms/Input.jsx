import React from 'react';

/**
 * GOYA Input — labelled text field. Clean, generous height, Aegean focus ring.
 * Supports label, hint, error, and an optional leading icon.
 */
export function Input({
  label,
  hint,
  error,
  id,
  icon = null,
  style = {},
  ...rest
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const [focused, setFocused] = React.useState(false);
  const borderColor = error ? 'var(--danger)' : focused ? 'var(--accent)' : 'var(--ink-300)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.8125rem',
          color: 'var(--text-strong)',
        }}>{label}</label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && <span style={{ position: 'absolute', left: 14, display: 'inline-flex', color: 'var(--text-faint)' }}>{icon}</span>}
        <input
          id={inputId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            height: 48,
            padding: icon ? '0 14px 0 42px' : '0 14px',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-body)',
            background: 'var(--paper)',
            border: `1.5px solid ${borderColor}`,
            borderRadius: 'var(--radius-sm)',
            outline: 'none',
            boxShadow: focused && !error ? 'var(--shadow-focus)' : 'none',
            transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{ fontSize: '0.75rem', color: error ? 'var(--danger)' : 'var(--text-muted)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
