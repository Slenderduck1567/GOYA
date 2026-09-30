import React from 'react';
import { Button, Badge, SectionHeading, EventCard } from '../ds.js';
import { Icons as Ic } from '../Icons.jsx';
import { DATA } from '../data.js';
import { SITE } from '../site.js';
import { Footer } from '../Chrome.jsx';
import { Meander, HeroCarousel, useGo, usePageTitle } from '../shared.jsx';

export default function HomeScreen({ wide }) {
  const go = useGo();
  usePageTitle(null);
  const D = DATA;
  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', marginTop: wide ? -108 : -96, minHeight: 600, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
        <HeroCarousel images={['/assets/photos/goya-crowd.jpg', '/assets/photos/goya-singer.jpg', '/assets/photos/goya-team.jpg', '/assets/photos/goya-flag.jpg']} />
        <div style={{ position: 'relative', padding: '0 22px 40px' }}>
          <div style={{ marginBottom: 16 }}><Meander color="var(--aegean-300)" /></div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.8rem,13vw,3.6rem)', lineHeight: 0.98, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: '0 0 16px', color: '#fff', textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}>
            Find your<br />parea.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.5, color: 'rgba(255,255,255,0.9)', margin: '0 0 26px', maxWidth: 340 }}>
            Events, faith and friendship for young Greek Australians.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="inverse" size="lg" as="a" href={SITE.instagram} target="_blank" rel="noopener" iconLeft={<Ic.Instagram size={18} />}>Follow us</Button>
            <Button variant="ghost" size="lg" onClick={() => go('events')} style={{ color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)' }}>What's on</Button>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section style={{ padding: '44px 22px 8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: wide ? '1fr 1fr' : '1fr', gap: wide ? 44 : 24, alignItems: 'center' }}>
          <div>
            <SectionHeading eyebrow="About us" title="Who we are" />
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-body)', fontWeight: 500, margin: '18px 0 0' }}>
              GOYA is a community of young Greek Australians — a place to keep your faith, culture and friendships alive. We're parea: friends who dance, eat, and grow up together. Come as you are, on a Friday or any time.
            </p>
            <div style={{ marginTop: 16 }}>
              <Button variant="ghost" iconRight={<Ic.ArrowRight size={17} />} onClick={() => go('about')} style={{ paddingLeft: 0, paddingRight: 0, color: 'var(--accent)' }}>Read our story</Button>
            </div>
          </div>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', aspectRatio: wide ? '4 / 3' : '16 / 10' }}>
            <img src="/assets/photos/goya-banner-team.jpg" alt="GOYA committee with the GOYA banner" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 62%', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* What's on */}
      <section style={{ padding: '40px 22px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22 }}>
          <SectionHeading eyebrow="What's on" title="This month" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: wide ? '1fr 1fr' : '1fr', gap: 18 }}>
          {D.events.slice(0, wide ? 4 : 2).map((e) => (
            <EventCard key={e.id} image={e.photo} day={e.day} month={e.month} category={e.category}
              categoryTone={e.tone} free={e.free} title={e.title} time={e.time} venue={e.venue}
              imagePosition={e.photoPos || 'center'}
              onClick={() => go('event:' + e.id)} />
          ))}
        </div>
        <div style={{ marginTop: 22 }}>
          <Button variant="secondary" full iconRight={<Ic.ArrowRight size={17} />} onClick={() => go('events')}>See all events</Button>
        </div>
      </section>

      {/* GOYA House feature */}
      <section style={{ padding: '44px 22px 8px' }}>
        <SectionHeading eyebrow="Our place" title="GOYA House" />
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-body)', fontWeight: 500, margin: '18px 0 22px', maxWidth: 460 }}>
          The Steki — our home on Browning St, South Brisbane. Once a month we throw a Friday-night Steki here: music, a souvla on the grill, and parea till late.
        </p>
        <div onClick={() => go('house')} style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer', boxShadow: 'var(--shadow-md)' }}>
          <img src="/assets/photos/house.jpg" alt="GOYA House" style={{ width: '100%', height: wide ? 320 : 248, objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,15,18,0) 35%, rgba(14,15,18,0.82) 100%)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 22, color: '#fff', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 14 }}>
            <div>
              <Badge tone="accent" solid dot>Monthly Steki · Friday nights</Badge>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'rgba(255,255,255,0.82)', marginTop: 12 }}>22A Browning St · South Brisbane</div>
            </div>
            <span style={{ display: 'inline-flex', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(4px)', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Ic.ArrowRight size={20} /></span>
          </div>
        </div>

        {/* Booking callout */}
        <div style={{ marginTop: 16, background: 'var(--bg-tint)', border: '1px solid var(--aegean-200)', borderRadius: 'var(--radius-lg)', padding: wide ? '22px 24px' : '20px', display: 'flex', flexDirection: wide ? 'row' : 'column', gap: 16, alignItems: wide ? 'center' : 'flex-start' }}>
          <span style={{ display: 'inline-flex', width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', color: 'var(--accent)', alignItems: 'center', justifyContent: 'center', flex: 'none', boxShadow: 'var(--shadow-xs)' }}><Ic.Sparkle size={22} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: 'var(--text-strong)' }}>Host your event at GOYA House</div>
            <p style={{ margin: '4px 0 0', fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>Birthdays, christenings, name days, functions — the Steki is available to hire. Get in touch and we'll sort the details.</p>
          </div>
          <div style={{ flex: 'none', width: wide ? 'auto' : '100%' }}>
            <Button variant="primary" full={!wide} iconRight={<Ic.ArrowRight size={17} />} onClick={() => go('contact')}>Enquire about booking</Button>
          </div>
        </div>
      </section>

      {/* Junior GOYA feature */}
      <section style={{ padding: '36px 22px 40px' }}>
        <div onClick={() => go('junior')} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', display: 'grid', gridTemplateColumns: wide ? '300px 1fr' : '1fr' }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          <div style={{ position: 'relative', minHeight: wide ? 0 : 180 }}>
            <img src="/assets/photos/junior-goya.jpg" alt="Junior GOYA" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: wide ? 'auto' : '16 / 9' }} />
          </div>
          <div style={{ padding: wide ? '26px 28px' : '20px' }}>
            <Badge tone="sand">Ages 0–18</Badge>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22, color: 'var(--text-strong)', margin: '12px 0 8px' }}>Junior GOYA</h3>
            <p style={{ margin: 0, fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              We put on events for our youngest parea too — craft and games mornings, Greek school and dance, and family-friendly days out. A place for the 0–18s to make friends and grow up in community.
            </p>
            <div style={{ marginTop: 14 }}>
              <Button variant="ghost" iconRight={<Ic.ArrowRight size={17} />} onClick={(e) => { e.stopPropagation(); go('junior'); }} style={{ paddingLeft: 0, paddingRight: 0, color: 'var(--accent)' }}>Explore Junior GOYA</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ position: 'relative', background: 'var(--ink-900)', color: '#fff', padding: '48px 22px', overflow: 'hidden' }}>
        <img src="/assets/seal-white.png" alt="" style={{ position: 'absolute', right: -50, top: -30, width: 220, opacity: 0.07 }} />
        <div style={{ position: 'relative' }}>
          <Meander color="var(--aegean-400)" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 36, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, color: '#fff', margin: '18px 0 14px' }}>Come as you are</h2>
          <p style={{ color: 'var(--ink-300)', fontSize: 16, lineHeight: 1.6, margin: '0 0 24px', maxWidth: 320 }}>No membership, no pressure — just turn up on a Friday. Follow us on Instagram to see what's on and say yiasou.</p>
          <Button variant="primary" size="lg" full as="a" href={SITE.instagram} target="_blank" rel="noopener" iconLeft={<Ic.Instagram size={18} />}>Follow @goya.brisbane</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
