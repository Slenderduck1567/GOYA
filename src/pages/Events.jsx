import React from "react";
import { splitEvents } from "../lib/events.js";
import { useEventClock } from "../hooks/useEventClock.js";
import { useSearchParams } from "react-router-dom";
import { EventCard } from "../ds.js";
import { DATA } from "../data.js";
import { Footer } from "../Chrome.jsx";
import { PageIntro } from "../shared.jsx";
export default function Events() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("category");
  const filter = DATA.filters.includes(requested) ? requested : "All";
  const now = useEventClock();
  const {upcoming,past} = splitEvents(DATA.events,now);
  const archive = params.get("view") === "past";
  const pool = archive ? past : upcoming;
  const shown =
    filter === "All"
      ? pool
      : pool.filter(
          (e) => e.category === filter || e.tags.includes(filter),
        );
  return (
    <>
      <PageIntro eyebrow="The GOYA calendar" title="Good times ahead.">
        Find your next night out, catch-up or day on the field.
      </PageIntro>
      <section className="container">
        {!archive && upcoming.some(e=>e.tags.includes("GOYA Weekend")) && <div className="weekend-banner">
          <span className="eyebrow">01—03 OCTOBER 2026 · BRISBANE</span>
          <h2>
            The GOYA
            <br />
            Weekend.
          </h2>
          <p>
            {upcoming.filter(e=>e.tags.includes("GOYA Weekend")).map(e=>`${e.title} — ${e.dow} ${e.day} ${e.month}`).join(". ")}.
          </p>
        </div>
        }
        <div className="event-tabs" aria-label="Event period">
          <button aria-pressed={!archive} onClick={()=>setParams({})}>Coming up <span>{upcoming.length}</span></button>
          <button aria-pressed={archive} onClick={()=>setParams({view:"past"})}>Past events <span>{past.length}</span></button>
        </div>
        <div className="event-filters" role="group" aria-label="Filter events">
          {DATA.filters.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() =>
                setParams({...(archive?{view:"past"}:{}),...(f === "All"?{}:{category:f})}, { replace: true })
              }
            >
              {f}
            </button>
          ))}
        </div>
        <p className="small results-count" role="status">
          {shown.length} {shown.length === 1 ? "event" : "events"} · {filter}
        </p>
        {!shown.length && <div className="empty-state"><h2>{archive?"Memories in the making.":"More parea is on its way."}</h2><p>{archive?"Finished events will appear here automatically.":"No events in this selection. Try another category or follow our Instagram for announcements."}</p></div>}
        <div className="event-grid">
          {shown.map((e) => (
            <EventCard event={e} key={e.id} past={archive} />
          ))}
        </div>

      </section>
      <Footer />
    </>
  );
}
