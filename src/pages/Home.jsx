import { SmartImage } from "../components/SmartImage.jsx";
import React from "react";
import { splitEvents } from "../lib/events.js";
import { useEventClock } from "../hooks/useEventClock.js";
import { FirstVisit } from "../components/FirstVisit.jsx";
import { HeroMedia } from "../components/HeroMedia.jsx";
import { Link } from "react-router-dom";
import { DATA } from "../data.js";
import { SITE } from "../site.js";
import { Footer } from "../Chrome.jsx";
import { usePageTitle } from "../shared.jsx";
import { EventCard } from "../ds.js";
export default function Home() {
  usePageTitle(null);
  const now = useEventClock();
  const { upcoming } = splitEvents(DATA.events,now);
  const featured=upcoming.filter(e=>e.featured);
  return (
    <>
      <section className="home-hero">
        <HeroMedia />
        <div className="hero-shade" />
        <div className="container hero-copy">
          <span className="eyebrow">Greek roots. Brisbane home.</span>
          <h1>
            Find your
            <br />
            <span>parea.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              Live your Orthodox faith.
              <br />A life of culture, friendship and good company.
            </p>
            <Link className="button button-light" to="/events">
              Explore what’s on <span>↗</span>
            </Link>
          </div>
        </div>
        <span className="hero-caption">GOYA BRISBANE · EST. 1967</span>
      </section>
      <section className="container section">
        <div className="section-top">
          <div>
            <span className="eyebrow">On the calendar</span>
            <h2>Your weekend, sorted.</h2>
          </div>
          <Link className="text-link" to="/events">
            All events ↗
          </Link>
        </div>
        <div className="event-grid">
          {(featured.length ? featured : upcoming).slice(0, 2).map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
        {!upcoming.length && <p className="lead">Our next gatherings are on their way. Explore past events or follow our latest announcements.</p>}
        {upcoming.some(e=>e.tags.includes("GOYA Weekend")) && <div className="weekend-note">
          <span>01—03 OCTOBER 2026</span>
          <p>{upcoming.filter(e=>e.tags.includes("GOYA Weekend")).map(e=>e.title).join(" · ")}</p>
          <Link to="/events">Discover the GOYA Weekend →</Link>
        </div>}
      </section>
      {featured.length > 0 && <section className="container weekend-lineup" aria-label="Friday and Saturday lineup">
        {featured.map((event, index) => (
          <Link to={`/events/${event.id}`} key={event.id}>
            <span className="lineup-index">0{index + 1}</span>
            <span className="lineup-day">{event.dow} {event.day} {event.month}</span>
            <strong>{event.title}</strong>
            <span className="lineup-time">{event.time === "Time TBA" ? "Time to be announced" : event.time}</span>
            <span aria-hidden="true" className="lineup-arrow">↗</span>
          </Link>
        ))}
      </section>}
      <FirstVisit />
      <section className="sand-section">
        <div className="container section editorial-split">
          <div className="editorial-copy">
            <span className="eyebrow">This is GOYA</span>
            <h2>
              Rooted in culture.
              <br />
              Made by us.
            </h2>
            <p className="lead">
              Faith, culture and friendships that feel like home.
            </p>
            <p>
              We’re a community of young Greek Australians. Friends who dance,
              eat and grow up together. Whether you’ve been here forever or
              you’re finding your feet in Brisbane, there’s a place for you.
            </p>
            <Link className="text-link" to="/about">
              Meet your parea ↗
            </Link>
          </div>
          <figure>
            <SmartImage
              src="/assets/photos/goya-banner-team.jpg"
              alt="GOYA members gathered on the verandah with the community banner"
              loading="lazy"
            />
            <figcaption>A familiar face. A place to belong.</figcaption>
          </figure>
        </div>
      </section>
      <section className="container section house-feature">
        <div className="section-top">
          <div>
            <span className="eyebrow">22A Browning Street</span>
            <h2>Meet at the Steki.</h2>
          </div>
          <p>
            Our home in South Brisbane.
            <br />
            Your next Friday starts here.
          </p>
        </div>
        <Link to="/goya-house" className="house-photo">
          <SmartImage
            src="/assets/photos/goya-banner-team.jpg"
            alt="The verandah at GOYA House"
            loading="lazy"
          />
          <span>
            Explore GOYA House <span>↗</span>
          </span>
        </Link>
        <div className="feature-caption">
          <p>
            Friday gatherings, monthly Steki nights and a space for your
            celebrations.
          </p>
          <Link className="text-link" to="/contact?enquiry=hire">
            Enquire about venue hire ↗
          </Link>
        </div>
      </section>
      <section className="blue-section">
        <div className="container section editorial-split junior-feature">
          <figure>
            <SmartImage
              src="/assets/photos/junior-goya.jpg"
              alt="Junior GOYA enjoying a day at the skating rink"
              loading="lazy"
            />
          </figure>
          <div className="editorial-copy">
            <span className="eyebrow">The next generation · Ages 0–18</span>
            <h2>
              Little parea.
              <br />
              Big memories.
            </h2>
            <p>
              Craft, games, Greek culture and family days out. A place for our
              youngest members to make friends and grow up in community.
            </p>
            <Link className="button button-light" to="/junior-goya">
              Discover Junior GOYA ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="container section closing">
        <span className="eyebrow">There’s a place for you</span>
        <h2>
          Come as
          <br />
          you are.
        </h2>
        <div>
          <p>
            No membership required to come along. Follow us for the next
            gathering, or introduce yourself before your first visit.
          </p>
          <div className="action-row">
            <Link className="button" to="/join">
              Say yiasou ↗
            </Link>
            <a
              className="text-link"
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on Instagram ↗
            </a>
          </div>
        </div>
      </section>
      <section className="container section community-teaser"><span className="eyebrow">From our community</span><h2>The people behind the parea.</h2><p>Meet the committee and read moments from GOYA life.</p><Link className="text-link" to="/stories">Read our stories ↗</Link></section>
      <Footer />
    </>
  );
}
