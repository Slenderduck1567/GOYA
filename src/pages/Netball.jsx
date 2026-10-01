import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../Chrome.jsx';
import { PageIntro } from '../shared.jsx';
export default function Netball() {
  return <>
    <PageIntro eyebrow="Past activities · GOYA Brisbane" title="Thanks for playing.">
      Our netball activity has finished. Expressions of interest are now closed.
    </PageIntro>
    <section className="container section archive-note">
      <span className="eyebrow">The parea keeps going</span>
      <h2>See what’s next.</h2>
      <p>Find our upcoming events and the next chance to get together.</p>
      <Link className="button" to="/events">Explore upcoming events ↗</Link>
    </section>
    <Footer />
  </>;
}
