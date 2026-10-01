import { SmartImage } from "../components/SmartImage.jsx";
import React, { useState, useRef, useEffect } from "react";
import { DATA } from "../data.js";
import { Footer } from "../Chrome.jsx";
import { PageIntro } from "../shared.jsx";
export default function Gallery() {
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
      <section className="container album-section"><div className="section-top"><h2>The full albums.</h2><span className="eyebrow">From GOYA’s official photo links</span></div><div className="album-grid">{DATA.albums.map(album=><a className="album-card" key={album.id} href={album.url} target="_blank" rel="noopener noreferrer"><span className="eyebrow">{album.year} · Photo album</span><h3>{album.title}</h3><p>{album.description}</p><span className="text-link">Open the full collection ↗</span></a>)}</div></section>
      <div className="container section-top gallery-heading"><h2>A few familiar moments.</h2><p>Snapshots from GOYA life.</p></div>
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
              <SmartImage src={p.src} alt={p.alt} loading="lazy" />
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
            <SmartImage key={photos[active].src} src={photos[active].src} alt={photos[active].alt} sizes="100vw" />
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
