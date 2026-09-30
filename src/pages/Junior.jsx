import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../site.js";
import { Footer } from "../Chrome.jsx";
import { PageHero, usePageTitle } from "../shared.jsx";
export default function Junior() {
  usePageTitle("Junior GOYA");
  return (
    <>
      <PageHero
        photo="/assets/photos/junior-goya.jpg"
        eyebrow="Ages 0–18 · Families welcome"
        title="Growing up GOYA."
      />
      <section className="container section editorial-split">
        <div>
          <span className="eyebrow">Our youngest parea</span>
          <h2>
            Where it
            <br />
            all begins.
          </h2>
          <p className="lead">
            Friends to grow up with. A culture to grow into.
          </p>
          <p>
            Junior GOYA is a warm, supervised space for our youngest members to
            make friends, learn about their heritage and have a lot of fun doing
            it. Parents are always welcome to stay.
          </p>
          <Link className="button" to="/join?group=junior">
            Introduce your family ↗
          </Link>
        </div>
        <div className="numbered-list">
          {[
            [
              "Craft & games",
              "Hands-on, age-appropriate and always a bit messy.",
            ],
            ["Greek culture", "Language, dance and the traditions we share."],
            [
              "Days out together",
              "Family-friendly activities and memories with the parea.",
            ],
          ].map(([t, d], i) => (
            <div key={t}>
              <span className="eyebrow">0{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="sand-section">
        <div className="container section narrow">
          <span className="eyebrow">Before your first visit</span>
          <h2>Let’s find your place.</h2>
          <p>
            Activities suit different ages across the 0–18 group. A parent or
            guardian can introduce the family using our form, and we’ll help
            with the next suitable activity, timing and what to bring.
          </p>
          <p>
            For the latest Junior events and announcements, follow GOYA
            Brisbane.
          </p>
          <a
            className="text-link"
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            See our latest updates ↗
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}
