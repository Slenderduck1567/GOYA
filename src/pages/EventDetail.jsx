import { SmartImage } from "../components/SmartImage.jsx";
import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { isPast, calendarUrl } from "../lib/events.js";
import { useEventClock } from "../hooks/useEventClock.js";
import { DATA } from "../data.js";
import { SITE } from "../site.js";
import { Footer } from "../Chrome.jsx";
import { MapEmbed } from "../shared.jsx";
export default function EventDetail() {
  const { id } = useParams();
  const now = useEventClock();
  const e = DATA.events.find((x) => x.id === id);
  if (!e) return <Navigate to="/events" replace />;
  const past = isPast(e,now);
  const url = (!past && e.ticketUrl) || e.updatesUrl || SITE.instagram;
  const action = past ? "View original announcement" : e.ticketUrl ? "Get tickets" : "View announcement";
  return (
    <>
      <section
        className={`page-hero event-hero ${e.category === "Concert" ? "poster-hero" : ""}`}
      >
        <SmartImage
          className="hero-image"
          src={e.photo}
          alt=""
          style={{ objectPosition: e.photoPos || "center" }}
        />
        <div className="hero-shade" />
        <div className="container hero-copy">
          <Link className="back-link" to="/events">
            ← All events
          </Link>
          <span className="eyebrow">{past ? "Past event" : e.category} · GOYA Brisbane</span>
          <h1>{e.title}</h1>
        </div>
      </section>
      <section className="container section event-detail-grid">
        <aside className="event-facts">
          <span className="eyebrow">{past ? "From the archive" : "Your plans, at a glance"}</span>
          {past && <p>This event has finished. <Link to="/events">See what’s coming up.</Link></p>}
          <dl>
            <div>
              <dt>Date</dt>
              <dd>
                {e.dow} {e.day} {e.month} {e.year}
              </dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{e.time === "Time TBA" ? "To be announced" : e.time}</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>{e.venue}</dd>
            </div>
            {e.age && <div><dt>Age requirement</dt><dd>{e.age}</dd></div>}
            <div><dt>Entry / tickets</dt><dd>{e.price || "Check with the organiser"}</dd></div>
          </dl>
          <p className="small">
            {e.entryNote || (e.ticketUrl
              ? "Tickets are available from the organiser."
              : "Ticket and entry details are still being confirmed. Follow the organiser for the latest updates.")}
          </p>
          <a
            className="button"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {action} ↗
          </a>
          {!past && <><a className="text-link calendar-link" href={calendarUrl(e)} download={`${e.id}.ics`}>Add to calendar ↓</a>{!e.startTime && <p className="small">Saves an all-day reminder. Confirm the start time before you travel.</p>}</>}
        </aside>
        <div className="event-story">
          <span className="eyebrow">The occasion</span>
          <h2>{past ? "A moment with the parea." : "Be part of it."}</h2>
          <p className="lead">{e.blurb}</p>
          <div className="faq-list event-planning">
            <details><summary>Tickets and entry</summary><p>{e.price || "A price has not been confirmed on this site. Check the organiser’s announcement for current entry and booking details."}</p>{e.ticketUrl && !past && <a href={e.ticketUrl} target="_blank" rel="noopener noreferrer">Book with the organiser ↗</a>}</details>
            <details><summary>Age requirements and dress code</summary><p>{e.age || "Check age requirements with the organiser before booking."} {e.dressCode || "No dress code has been published here; contact the organiser if you’re unsure."}</p></details>
            <details><summary>Getting there and accessibility</summary><p>Use the directions link to plan your trip to {e.venue}. Check parking and return transport before travelling.</p><p>{e.accessibility || "For step-free access, seating or other access needs, contact the organiser before attending."}</p></details>
          </div>
          <MapEmbed query={e.venue} />
          <div className="event-related"><span className="eyebrow">Keep exploring</span><Link className="text-link" to={past?"/events?view=past":"/events"}>{past?"Browse the event archive":"Explore the full calendar"} ↗</Link></div>
        </div>
      </section>
      <Footer />
      <div className="event-mobile-action">
        <a
          className="button"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {action} ↗
        </a>
      </div>
    </>
  );
}
