import React from "react";
import { useSearchParams } from "react-router-dom";
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
          <span className="eyebrow">01—03 OCTOBER 2026 · BRISBANE</span>
          <h2>
            The GOYA
            <br />
            Weekend.
          </h2>
          <p>
            Meet Anastasia on Thursday, see her live on Friday, then join us for the Aegean Cup and its 18+ After Party on Saturday.
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

      </section>
      <Footer />
    </>
  );
}
