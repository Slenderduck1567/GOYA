import React from "react";
import { Link } from "react-router-dom";
export function EventCard({ event: e }) {
  return (
    <article className="event-card">
      <Link to={`/events/${e.id}`} className="event-link">
        <div
          className={`event-image ${e.category === "Concert" ? "is-poster" : ""}`}
        >
          <img
            src={e.photo}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ objectPosition: e.photoPos || "center" }}
          />
          <span className="event-date">
            <strong>{e.day}</strong>
            <span>
              {e.month} {e.year}
            </span>
          </span>
        </div>
        <div className="event-copy">
          <span className="eyebrow">{e.category}</span>
          <h3>
            {e.title}
            <span aria-hidden="true">↗</span>
          </h3>
          <p>
            {e.time} <span aria-hidden="true">·</span> {e.venue}
          </p>
          <span className="event-status">
            {e.ticketUrl ? "Tickets available" : "Details & updates"}{" "}
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
