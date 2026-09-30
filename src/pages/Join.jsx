import React, { useState } from 'react';
import { Button as Btn, SectionHeading as SH, Input as In, Textarea as TA, Select as Sel, Checkbox as Cb } from '../ds.js';
import { Icons as Ic2 } from '../Icons.jsx';
import { Footer as Ftr } from '../Chrome.jsx';
import { useGo, usePageTitle } from '../shared.jsx';
import { submitForm } from '../lib/submit.js';

export default function JoinScreen({ wide }) {
  const go = useGo();
  usePageTitle('Join GOYA');
  const [sent, setSent] = useState(false);
  const [ok, setOk] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    if (f.get('botcheck')) return;
    setBusy(true); setErr('');
    try {
      const r = await submitForm('New GOYA member sign-up', {
        'First name': f.get('first'), 'Last name': f.get('last'), Email: f.get('email'),
        Mobile: f.get('mobile') || '—', Group: f.get('group'), Message: f.get('message') || '—',
        'Mailing list': ok ? 'Yes' : 'No',
      });
      if (r === 'sent') setSent(true);
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  if (sent) {
    return (
      <div>
        <div style={{ minHeight: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 30px' }}>
          <span style={{ display: 'inline-flex', width: 76, height: 76, borderRadius: '50%', background: 'var(--bg-tint)', color: 'var(--accent)', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}><Ic2.Check size={38} /></span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 28, color: 'var(--text-strong)', margin: '0 0 10px' }}>Yiasou! You're in.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.6, maxWidth: 300, margin: '0 0 26px' }}>We'll be in touch before the next Friday at GOYA House. Welcome to the parea.</p>
          <Btn variant="primary" size="lg" onClick={() => go('events')}>See upcoming events</Btn>
        </div>
        <Ftr />
      </div>
    );
  }
  return (
    <div>
      <section style={{ padding: '26px 22px 8px' }}>
        <SH eyebrow="Become a member" title="Join GOYA" />
        <p style={{ color: 'var(--text-muted)', margin: '14px 0 0', fontSize: 15.5, lineHeight: 1.6 }}>Membership is free. Fill this in and we'll say hello before your first Friday.</p>
      </section>
      <form onSubmit={onSubmit} style={{ padding: '20px 22px 36px', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 620, margin: '0 auto', width: '100%' }}>
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <In label="First name" name="first" placeholder="Yianni" required autoComplete="given-name" />
          <In label="Last name" name="last" placeholder="Papadopoulos" required autoComplete="family-name" />
        </div>
        <In label="Email" name="email" type="email" placeholder="you@email.com" hint="For event reminders — no spam." required autoComplete="email" />
        <In label="Mobile" name="mobile" type="tel" placeholder="04xx xxx xxx" autoComplete="tel" />
        <Sel label="Which group?" name="group"><option>GOYA (16–30)</option><option>Junior GOYA (0–18)</option><option>I'd like to help out / volunteer</option></Sel>
        <TA label="Anything you'd like us to know?" name="message" rows={3} placeholder="Say yiasou…" />
        <Cb label="Add me to the GOYA mailing list" checked={ok} onChange={(e) => setOk(e.target.checked)} />
        {err && <p role="alert" style={{ color: 'var(--danger, #b42318)', margin: 0, fontSize: 14 }}>{err}</p>}
        <Btn type="submit" variant="primary" size="lg" full disabled={busy}>{busy ? 'Sending…' : 'Send my details'}</Btn>
        <p style={{ fontSize: 12.5, color: 'var(--text-faint)', textAlign: 'center', margin: 0 }}>By joining you agree to be contacted about GOYA events.</p>
      </form>
      <Ftr />
    </div>
  );
}
