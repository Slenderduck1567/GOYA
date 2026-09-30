import React from 'react';

/**
 * GOYA Textarea — multi-line field matching Input's styling.
 */
export function Textarea({ label, hint, error, id, rows = 4, style = {}, ...rest }) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const [focused, setFocused] = React.useState(false);
  const borderColor = error ? 'var(--danger)' : focused ? 'var(--accent)' : 'var(--ink-300)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-strong)',
        }}>{label}</label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '12px 14px',
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--text-body)',
          background: 'var(--paper)',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 'var(--radius-sm)',
          outline: 'none',
          resize: 'vertical',
          boxShadow: focused && !error ? 'var(--shadow-focus)' : 'none',
          transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
        }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontSize: '0.75rem', color: error ? 'var(--danger)' : 'var(--text-muted)' }}>{error || hint}</span>
      )}
    </div>
  );
}
