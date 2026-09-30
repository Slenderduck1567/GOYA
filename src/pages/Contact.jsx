import React, { useState } from 'react';
import { Button as Btn, SectionHeading as SH, Input as In, Textarea as TA } from '../ds.js';
import { Icons as Ic2 } from '../Icons.jsx';
import { SITE } from '../site.js';
import { Footer as Ftr } from '../Chrome.jsx';
import { directionsUrl, usePageTitle } from '../shared.jsx';
import { submitForm } from '../lib/submit.js';

export default function ContactScreen({ wide }) {
  usePageTitle('Contact');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    if (f.get('botcheck')) return;
    setBusy(true); setErr('');
    try {
      const r = await submitForm('New message from the GOYA website', { Name: f.get('name'), Email: f.get('email'), Message: f.get('message') });
      if (r === 'sent') setSent(true);
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  const rows = [
    [Ic2.Instagram, SITE.instagramHandle, 'Instagram — quickest reply', SITE.instagram],
    [Ic2.Mail, SITE.email, 'Email us anytime', `mailto:${SITE.email}`],
    [Ic2.MapPin, SITE.addressShort, 'GOYA House', directionsUrl()],
  ];
  return (
    <div>
      <section style={{ padding: '26px 22px 8px' }}>
        <SH eyebrow="Say yiasou" title="Contact" />
        <p style={{ color: 'var(--text-muted)', margin: '14px 0 0', fontSize: 15.5, lineHeight: 1.6 }}>Questions, ideas, or want to get involved? We'd love to hear from you.</p>
      </section>
      <div style={{ display: 'grid', gridTemplateColumns: wide ? '1fr 1fr' : '1fr', gap: wide ? 24 : 0, alignItems: 'start' }}>
        <section style={{ padding: '20px 22px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rows.map(([Ico, v, k, href], i) => (
            <a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="plain" style={{ display: 'flex', gap: 13, alignItems: 'center', padding: '14px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)' }}>
              <span style={{ display: 'inline-flex', width: 42, height: 42, borderRadius: 'var(--radius-sm)', background: 'var(--bg-tint)', color: 'var(--accent)', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Ico size={20} /></span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: 'var(--text-strong)', fontSize: 15.5, overflowWrap: 'anywhere' }}>{v}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{k}</div>
              </div>
            </a>
          ))}
        </section>
        {sent ? (
          <section style={{ padding: '20px 22px 36px' }}>
            <div style={{ background: 'var(--bg-tint)', border: '1px solid var(--aegean-200)', borderRadius: 'var(--radius-lg)', padding: 24, textAlign: 'center' }}>
              <span style={{ display: 'inline-flex', width: 56, height: 56, borderRadius: '50%', background: 'var(--bg-surface)', color: 'var(--accent)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Ic2.Check size={28} /></span>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: 'var(--text-strong)' }}>Message sent — efharisto!</div>
              <p style={{ margin: '6px 0 0', color: 'var(--text-muted)' }}>We'll get back to you soon.</p>
            </div>
          </section>
        ) : (
          <form onSubmit={onSubmit} style={{ padding: '20px 22px 36px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
            <In label="Your name" name="name" placeholder="Name" required autoComplete="name" />
            <In label="Email" name="email" type="email" placeholder="you@email.com" required autoComplete="email" />
            <TA label="Message" name="message" rows={4} placeholder="What's on your mind?" required />
            {err && <p role="alert" style={{ color: 'var(--danger, #b42318)', margin: 0, fontSize: 14 }}>{err}</p>}
            <Btn type="submit" variant="primary" size="lg" full disabled={busy}>{busy ? 'Sending…' : 'Send message'}</Btn>
          </form>
        )}
      </div>
      <Ftr />
    </div>
  );
}
