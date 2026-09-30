import React from 'react';

/**
 * GOYA SectionHeading — eyebrow kicker + heading, with an optional Greek-key
 * meander rule. The signature way to open a section.
 */
export function SectionHeading({
  eyebrow,
  title,
  align = 'left',
  meander = true,
  level = 'h2',
  style = {},
  ...rest
}) {
  const Heading = level;
  const meanderSvg = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='30'%20height='30'%20viewBox='0%200%2030%2030'%3E%3Cpath%20d='M0%2027%20H30%20M3%2027%20V6%20H24%20V21%20H12%20V12%20H18'%20stroke='black'%20stroke-width='3'%20fill='none'/%3E%3C/svg%3E";
  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      {meander && (
        <div
          style={{
            height: 16,
            width: 84,
            margin: align === 'center' ? '0 auto 14px' : '0 0 14px',
            background: 'var(--accent)',
            WebkitMaskImage: `url("${meanderSvg}")`,
            maskImage: `url("${meanderSvg}")`,
            WebkitMaskRepeat: 'repeat-x',
            maskRepeat: 'repeat-x',
            WebkitMaskSize: 'auto 100%',
            maskSize: 'auto 100%',
          }}
        />
      )}
      {eyebrow && (
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: 'var(--accent)',
            marginBottom: 10,
          }}
        >
          {eyebrow}
        </div>
      )}
      <Heading
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          color: 'var(--text-strong)',
          margin: 0,
        }}
      >
        {title}
      </Heading>
    </div>
  );
}
