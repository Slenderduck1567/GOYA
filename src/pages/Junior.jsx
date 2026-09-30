import React from 'react';
import { Button as Btn, Card as Crd } from '../ds.js';
import { Icons as Ic2 } from '../Icons.jsx';
import { Footer as Ftr } from '../Chrome.jsx';
import { PageHero, useGo, usePageTitle } from '../shared.jsx';

export default function JuniorScreen({ wide }) {
  const go = useGo();
  usePageTitle('Junior GOYA');
  return (
    <div>
      <PageHero photo="/assets/photos/event-junior.jpg" eyebrow="Ages 0–18" title="Junior GOYA" wide={wide} />
      <section style={{ padding: '32px 22px' }}>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-body)', fontWeight: 500 }}>
          Junior GOYA is where it all begins. A warm, supervised space for our youngest members to make friends, learn about their heritage, and have a lot of fun doing it.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '24px 0' }}>
          {[['Craft & games mornings', 'Hands-on, age-appropriate and always a bit messy.'], ['Greek school & dance', 'Language and dance, taught gently and patiently.'], ['Family-friendly', 'Parents are always welcome to stay.']].map(([t, d], i) => (
            <Crd key={i} padding="md">
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ display: 'inline-flex', width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--bg-tint)', color: 'var(--accent)', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Ic2.Sparkle size={20} /></span>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16, color: 'var(--text-strong)' }}>{t}</div>
                  <p style={{ margin: '4px 0 0', fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>{d}</p>
                </div>
              </div>
            </Crd>
          ))}
        </div>
        <Btn variant="primary" size="lg" full onClick={() => go('join')}>Register your child</Btn>
      </section>
      <Ftr />
    </div>
  );
}
