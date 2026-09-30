import React from 'react';

/**
 * GOYA Checkbox — custom-styled checkbox with label. Aegean when checked.
 */
export function Checkbox({ label, checked, onChange, id, style = {}, ...rest }) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <label htmlFor={inputId} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', ...style }}>
      <span style={{ position: 'relative', display: 'inline-flex', flex: 'none' }}>
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
          {...rest}
        />
        <span style={{
          width: 22, height: 22,
          borderRadius: 'var(--radius-xs)',
          border: `1.5px solid ${checked ? 'var(--accent)' : 'var(--ink-300)'}`,
          background: checked ? 'var(--accent)' : 'var(--paper)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all var(--dur-fast) var(--ease-standard)',
        }}>
          {checked && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          )}
        </span>
      </span>
      {label && <span style={{ fontSize: '0.9375rem', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
