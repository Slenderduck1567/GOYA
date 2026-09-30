import React, { useState } from 'react';
import { Button as Btn, Badge as Bdg, Input as In, Select as Sel } from '../ds.js';
import { submitForm } from '../lib/submit.js';
import { Icons as Ic2 } from '../Icons.jsx';
import { SITE } from '../site.js';
import { Footer as Ftr } from '../Chrome.jsx';
import { PageHero, usePageTitle } from '../shared.jsx';

const NETBALL_FORM_URL = SITE.netballFormUrl;

function NetballForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const onSubmit = async (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    if (f.get('botcheck')) return;
    setBusy(true); setErr('');
    try {
      const r = await submitForm("Women's Netball — expression of interest", { Name: f.get('name'), Email: f.get('email'), Mobile: f.get('mobile') || '—', Experience: f.get('experience') });
      if (r === 'sent') setSent(true);
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  if (sent) return (
    <div style={{ background: 'var(--bg-tint)', border: '1px solid var(--aegean-200)', borderRadius: 'var(--radius-lg)', padding: 22, textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: 'var(--text-strong)' }}>You're on the list!</div>
      <p style={{ margin: '6px 0 0', color: 'var(--text-muted)' }}>We'll be in touch once the comp, nights and cost are locked in.</p>
    </div>
  );
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
      <In label="Name" name="name" required autoComplete="name" />
      <In label="Email" name="email" type="email" required autoComplete="email" />
      <In label="Mobile" name="mobile" type="tel" placeholder="04xx xxx xxx" autoComplete="tel" />
      <Sel label="Netball experience" name="experience"><option>Played for years</option><option>Played a bit</option><option>Haven't played since school</option><option>Never played — keen to learn</option></Sel>
      {err && <p role="alert" style={{ color: 'var(--danger, #b42318)', margin: 0, fontSize: 14 }}>{err}</p>}
      <Btn type="submit" variant="primary" size="lg" full disabled={busy} iconRight={<Ic2.ArrowRight size={18} />}>{busy ? 'Sending…' : 'Register your interest'}</Btn>
    </form>
  );
}

export default function NetballScreen({ wide }) {
  usePageTitle("Women's Netball");
  return (
    <div>
      <PageHero photo="/assets/photos/netball.jpg" eyebrow="Women 16–30" title="Women's Netball" wide={wide} />
      <section style={{ padding: '32px 22px', maxWidth: 620, margin: '0 auto' }}>
        <Bdg tone="accent" solid>Expressions of interest open</Bdg>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-body)', fontWeight: 500, margin: '16px 0 0' }}>
          We're putting together a women's netball team for the GOYA girls — and we want to know if you're keen. Whether you've played for years or haven't touched a ball since school, pop your name down.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-muted)', margin: '14px 0 0' }}>
          This is just an expression of interest — no commitment yet. The comp, nights and cost are still being locked in, and we'll be in touch with the details once they're set.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '26px 0' }}>
          {[[Ic2.Users, 'Who', 'GOYA women, 16–30 — all skill levels welcome'], [Ic2.Star, 'Commitment', 'None yet — just register your interest'], [Ic2.Calendar, 'Details', 'Comp, nights & cost — coming soon']].map(([Ico, k, v], i) => (
            <div key={i} style={{ display: 'flex', gap: 13, alignItems: 'center', padding: '14px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)' }}>
              <span style={{ display: 'inline-flex', width: 42, height: 42, borderRadius: 'var(--radius-sm)', background: 'var(--bg-tint)', color: 'var(--accent)', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Ico size={20} /></span>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{k}</div>
                <div style={{ fontWeight: 600, color: 'var(--text-strong)', fontSize: 15.5 }}>{v}</div>
              </div>
            </div>
          ))}
        </div>

        {NETBALL_FORM_URL ? (
          <>
            <Btn variant="primary" size="lg" full as="a" href={NETBALL_FORM_URL} target="_blank" rel="noopener" iconRight={<Ic2.ArrowRight size={18} />}>
              Register your interest
            </Btn>
            <p style={{ fontSize: 12.5, color: 'var(--text-faint)', textAlign: 'center', margin: '12px 0 0' }}>
              Opens our short Google Form in a new tab.
            </p>
          </>
        ) : <NetballForm />}
      </section>
      <Ftr />
    </div>
  );
}
