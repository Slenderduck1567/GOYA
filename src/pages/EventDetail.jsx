import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { DATA } from "../data.js";
import { SITE } from "../site.js";
import { Footer } from "../Chrome.jsx";
import { MapEmbed, usePageTitle } from "../shared.jsx";
export default function EventDetail() {
  const { id } = useParams();
  const e = DATA.events.find((x) => x.id === id);
  usePageTitle(e?.title || "Events");
  if (!e) return <Navigate to="/events" replace />;
  const url = e.ticketUrl || e.updatesUrl || SITE.instagram;
  const action = e.ticketUrl ? "Get tickets" : "Follow for updates";
  return (
    <>
      <section
        className={`page-hero event-hero ${e.category === "Concert" ? "poster-hero" : ""}`}
      >
        <img
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
          <span className="eyebrow">{e.category} · GOYA Weekend</span>
          <h1>{e.title}</h1>
        </div>
      </section>
      <section className="container section event-detail-grid">
        <aside className="event-facts">
          <span className="eyebrow">Your plans, at a glance</span>
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
          </dl>
          <p className="small">
            {e.ticketUrl
              ? "Tickets are available from the organiser."
              : "Ticket and entry details are still being confirmed. Follow the organiser for the latest updates."}
          </p>
          <a
            className="button"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {action} ↗
          </a>
        </aside>
        <div className="event-story">
          <span className="eyebrow">The occasion</span>
          <h2>Be part of it.</h2>
          <p className="lead">{e.blurb}</p>
          <MapEmbed query={e.venue} />
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
