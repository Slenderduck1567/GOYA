import { SmartImage } from "./components/SmartImage.jsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pathFor, SITE } from "./site.js";
export function useGo() {
  const navigate = useNavigate();
  return (key) => navigate(pathFor(key));
}
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} · GOYA Brisbane`
      : "GOYA Brisbane — Find your parea";
  }, [title]);
}
export function Meander() {
  return (
    <SmartImage
      className="meander"
      src="/assets/meander.svg"
      alt=""
      aria-hidden="true"
    />
  );
}
export function PageHero({
  photo,
  photos,
  eyebrow,
  title,
  position = "center",
}) {
  return (
    <section className="page-hero">
      <SmartImage
        src={photo || photos?.[0]}
        alt=""
        className="hero-image"
        style={{ objectPosition: position }}
        fetchpriority="high"
      />
      <div className="hero-shade" />
      <div className="container hero-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
      </div>
    </section>
  );
}
export function MapEmbed({ query, label }) {
  const [show, setShow] = useState(false);
  const tba = !query || /tba/i.test(query);
  return (
    <div className="map-panel">
      {tba ? (
        <p>
          {label ||
            "Venue to be announced. Check the event updates before travelling."}
        </p>
      ) : (
        <>
          <div className="map-summary">
            <div>
              <span className="eyebrow">Find us</span>
              <p>{query}</p>
            </div>
            <a
              className="text-link"
              href={directionsUrl(query)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions ↗
            </a>
          </div>
          {show ? (
            <>
              <iframe
                title={`Map: ${query}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className="small">
                Map not displaying? Use “Get directions” to open Google Maps.
              </p>
            </>
          ) : (
            <button
              className="text-link map-toggle"
              onClick={() => setShow(true)}
            >
              Show interactive map +
            </button>
          )}
        </>
      )}
    </div>
  );
}
export const directionsUrl = (q = SITE.mapQuery) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
export function PageIntro({ eyebrow, title, children }) {
  return (
    <div className="container page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {children && <p className="lead">{children}</p>}
    </div>
  );
}
