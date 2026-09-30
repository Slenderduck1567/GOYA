import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { EventCard } from "../ds.js";
import { DATA } from "../data.js";
import { Footer } from "../Chrome.jsx";
import { PageIntro, usePageTitle } from "../shared.jsx";
export default function Events() {
  usePageTitle("Events");
  const [params, setParams] = useSearchParams();
  const requested = params.get("category");
  const filter = DATA.filters.includes(requested) ? requested : "All";
  const shown =
    filter === "All"
      ? DATA.events
      : DATA.events.filter(
          (e) => e.category === filter || e.tags.includes(filter),
        );
  return (
    <>
      <PageIntro eyebrow="The GOYA calendar" title="Good times ahead.">
        Find your next night out, catch-up or day on the field.
      </PageIntro>
      <section className="container">
        <div className="weekend-banner">
          <span className="eyebrow">02—04 OCTOBER 2026 · BRISBANE</span>
          <h2>
            The GOYA
            <br />
            Weekend.
          </h2>
          <p>
            Three days of parea. A concert, the Aegean Cup, Kefi Night and Gazi.
            Interstate? Make the trip. More details are on their way.
          </p>
        </div>
        <div className="event-filters" role="group" aria-label="Filter events">
          {DATA.filters.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() =>
                setParams(f === "All" ? {} : { category: f }, { replace: true })
              }
            >
              {f}
            </button>
          ))}
        </div>
        <p className="small results-count" role="status">
          {shown.length} {shown.length === 1 ? "event" : "events"} · {filter}
        </p>
        <div className="event-grid">
          {shown.map((e) => (
            <EventCard event={e} key={e.id} />
          ))}
        </div>
        <Link className="netball-promo" to="/netball">
          <span className="eyebrow">Expressions of interest open</span>
          <h2>On your team.</h2>
          <p>Women’s netball · Ages 16–30 · All experience levels</p>
          <span className="text-link">Register your interest ↗</span>
        </Link>
      </section>
      <Footer />
    </>
  );
}
