import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../site.js";
import { Footer } from "../Chrome.jsx";
import { PageHero, MapEmbed, usePageTitle } from "../shared.jsx";
export default function House() {
  usePageTitle("GOYA House");
  return (
    <>
      <PageHero
        photo="/assets/photos/goya-banner-team.jpg"
        position="center 58%"
        eyebrow="Our home in South Brisbane"
        title="The Steki."
      />
      <section className="container section editorial-split">
        <div className="editorial-copy">
          <span className="eyebrow">GOYA House</span>
          <h2>
            Make yourself
            <br />
            at home.
          </h2>
          <p className="lead">
            A familiar face. Music from the next room. A place to come back to.
          </p>
          <p>
            GOYA House — known to everyone as the Steki — is our home base on
            Browning Street. It’s where Friday nights happen, where the dance
            group rehearses, and where parea comes together.
          </p>
          <Link className="text-link" to="/events">
            See upcoming gatherings ↗
          </Link>
        </div>
        <div className="facts-panel">
          <dl>
            <div>
              <dt>Find us</dt>
              <dd>{SITE.address}</dd>
            </div>
            <div>
              <dt>Friday gatherings</dt>
              <dd>From 7:30 PM. Check our latest updates before visiting.</dd>
            </div>
            <div>
              <dt>Monthly Steki</dt>
              <dd>
                A special Friday night of music, souvla and parea. Dates
                announced with each event.
              </dd>
            </div>
            <div>
              <dt>Who’s welcome</dt>
              <dd>Members and guests. No membership needed to come along.</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="sand-section">
        <div className="container section editorial-split">
          <div>
            <span className="eyebrow">A space to celebrate</span>
            <h2>
              Your people.
              <br />
              Our place.
            </h2>
            <p className="lead">
              Birthdays, christenings, name days and functions. The Steki is
              available to hire.
            </p>
            <p>
              Tell us your preferred date, occasion and approximate guest count.
              We’ll discuss availability and the details with you.
            </p>
            <Link className="button" to="/contact?enquiry=hire">
              Enquire about venue hire ↗
            </Link>
          </div>
          <MapEmbed query={SITE.mapQuery} />
        </div>
      </section>
      <Footer />
    </>
  );
}
