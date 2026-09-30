import React, { useState, useRef, useEffect } from "react";
import { DATA } from "../data.js";
import { Footer } from "../Chrome.jsx";
import { PageIntro, usePageTitle } from "../shared.jsx";
export default function Gallery() {
  usePageTitle("Gallery");
  const [active, setActive] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  const photos = DATA.gallery;
  const close = () => {
    dialog.current.close();
    setActive(null);
    opener.current?.focus();
  };
  useEffect(() => {
    if (active !== null && !dialog.current.open) dialog.current.showModal();
  }, [active]);
  return (
    <>
      <PageIntro eyebrow="From the parea" title="Wish you were here.">
        The nights, the faces, the moments that make us GOYA.
      </PageIntro>
      <section className="container gallery-grid">
        {photos.map((p, i) => (
          <figure key={p.src}>
            <button
              onClick={(e) => {
                opener.current = e.currentTarget;
                setActive(i);
              }}
              aria-label={`Enlarge: ${p.alt}`}
            >
              <img src={p.src} alt={p.alt} loading="lazy" />
              <span aria-hidden="true">↗</span>
            </button>
            <figcaption>
              <span>0{i + 1}</span>
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </section>
      <Footer />
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setActive((i) => (i + 1) % photos.length);
          if (e.key === "ArrowLeft")
            setActive((i) => (i - 1 + photos.length) % photos.length);
        }}
        aria-label="GOYA photo gallery"
      >
        {active !== null && (
          <>
            <button
              className="lightbox-close"
              onClick={close}
              autoFocus
              aria-label="Close image"
            >
              Close ×
            </button>
            <img src={photos[active].src} alt={photos[active].alt} />
            <div className="lightbox-bottom">
              <button
                onClick={() =>
                  setActive((i) => (i - 1 + photos.length) % photos.length)
                }
                aria-label="Previous image"
              >
                ←
              </button>
              <p aria-live="polite">
                {active + 1} / {photos.length} — {photos[active].caption}
              </p>
              <button
                onClick={() => setActive((i) => (i + 1) % photos.length)}
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
