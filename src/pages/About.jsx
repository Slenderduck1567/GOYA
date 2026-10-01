import { SmartImage } from "../components/SmartImage.jsx";
import React from "react";
import { Footer } from "../Chrome.jsx";
import { PageHero } from "../shared.jsx";
const GOYA_TIMELINE = [
  [
    "1913",
    "The first organised Greek group in Queensland — the “Greek Association” — forms in Brisbane, the seed of a community that is still growing today.",
  ],
  [
    "1944",
    "The Greek Orthodox Community of St George is founded as an umbrella community for all Greeks in Queensland — today the oldest and largest in the state.",
  ],
  [
    "1958",
    "The landmark octagonal Church of St George opens in South Brisbane, built during the post-war wave of Greek migration to Queensland.",
  ],
  [
    "1967",
    "The Greek Orthodox Youth of Australia — GOYA — Brisbane Branch is founded under St George, giving young Greek Australians a home of their own.",
  ],
  [
    "Today",
    "GOYA gathers every Friday at GOYA House — “To Steki” — on Browning St, carrying the same parea forward to a new generation.",
  ],
];

const GOYA_EXEC = [
  ["James Kontoudios", "President"],
  ["Agapi Kalligeros", "Vice-President"],
  ["Vas Karanicolas", "Secretary"],
  ["Peter Lahanas", "Treasurer"],
];

const GOYA_COMMITTEE = [
  ["Zoe Fotinis", "Sports & Recreation · Junior GOYA"],
  ["Peter Samios", "Faith & Culture"],
  ["Alyssa Fotinis", "Sports & Recreation · GOYA House"],
  ["Micheal Penklis", "GOYA 18+ Events · Socials"],
  ["Anna Ghorayeb", "GOYA 18+ Events · Socials"],
  ["Manning Mageros", "GOYA 18+ Events · Sports"],
  ["Steph Sakley", "Socials · Faith & Culture"],
  ["Nick Penklis", "GOYA 18+ Events · Socials"],
  ["Jen Sakley", "Junior GOYA · Faith & Culture"],
  ["Dean Balev", "Sports & Recreation · Junior GOYA"],
  ["Thomas Paradissis", "Sports & Recreation · GOYA House"],
  ["Elena Sfouggaristos", "Socials · GOYA House"],
  ["Luke Karalis", "Sports & Recreation · Junior GOYA"],
  ["Sofia Papas", "GOYA House · Junior GOYA"],
];

const portrait = (name) =>
  "/assets/team/" + name.toLowerCase().replaceAll(" ", "-") + ".jpg";
function Portrait({ name }) {
  const crop =
    name === "Luke Karalis"
      ? "247 851 240 245"
      : name === "Sofia Papas"
        ? "592 849 241 246"
        : null;
  return crop ? (
    <svg className="portrait" viewBox={crop} preserveAspectRatio="xMidYMid slice" role="img" aria-label={name}>
      <image
        href="/assets/team/committee-source.jpg"
        width="1080"
        height="1350"
      />
    </svg>
  ) : (
    <span className="portrait">
      <SmartImage src={portrait(name)} alt={name} loading="lazy" />
    </span>
  );
}
export default function About() {
  return (
    <>
      <PageHero
        photo="/assets/photos/goya-team.jpg"
        eyebrow="Faith. Culture. Friendship."
        title="Our story."
      />
      <section className="container section editorial-split">
        <div>
          <span className="eyebrow">Brisbane, since 1967</span>
          <h2>
            Greek roots.
            <br />
            Open hearts.
          </h2>
        </div>
        <div className="editorial-copy">
          <p className="lead">
            GOYA — the Greek Orthodox Youth of Australia — is the youth branch
            of the Greek Orthodox Community of St George here in Brisbane.
          </p>
          <p>
            We’re a home for second and third-generation Greek Australians to
            stay connected to their faith, culture and each other. Friends who
            organise events, dance, eat and grow up together.
          </p>
          <p>
            Whether you’re 16 or 30, brand new to Brisbane or born here, there’s
            a place for you.
          </p>
        </div>
      </section>
      <section className="sand-section">
        <div className="container section">
          <div className="section-top">
            <div>
              <span className="eyebrow">The people behind the parea</span>
              <h2>Your 2026 committee.</h2>
            </div>
            <p>
              Volunteers bringing our community together
              <br />
              across events, sport, faith and culture.
            </p>
          </div>
          <figure className="committee-photo">
            <SmartImage
              src="/assets/photos/committee-2026.jpg"
              alt="The GOYA Brisbane 2026 committee together"
              loading="lazy"
            />
          </figure>
          <h3 className="roster-heading">Executive committee</h3>
          <div className="executive-grid">
            {GOYA_EXEC.map(([name, role]) => (
              <article key={name}>
                <Portrait name={name} />
                <h3>{name}</h3>
                <p>{role}</p>
              </article>
            ))}
          </div>
          <h3 className="roster-heading">Committee members</h3>
          <div className="committee-grid">
            {GOYA_COMMITTEE.map(([name, role]) => (
              <article key={name}>
                <Portrait name={name} />
                <div>
                  <h3>{name}</h3>
                  <p>{role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container section history-layout">
        <div>
          <span className="eyebrow">A story still being written</span>
          <h2>
            Generations
            <br />
            of parea.
          </h2>
        </div>
        <div className="timeline">
          {GOYA_TIMELINE.map(([year, text]) => (
            <div key={year}>
              <h3>{year}</h3>
              <p>{text}</p>
            </div>
          ))}
          <p className="small">
            Community history per the Greek Orthodox Community of St George,
            Brisbane.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
