import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../site.js";
import { Footer } from "../Chrome.jsx";
import { PageHero } from "../shared.jsx";
export default function Junior() {
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
            Junior GOYA is a welcoming community for our youngest members to
            make friends, learn about their heritage and have a lot of fun doing
            it. Check each activity’s supervision and parent attendance arrangements before booking.
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
            For the latest Junior events and announcements, follow Junior GOYA.
          </p>
          <a
            className="text-link"
            href="https://www.instagram.com/junior.goya/"
            target="_blank"
            rel="noopener noreferrer"
          >
            See our latest updates ↗
          </a>
        </div>
      </section>
      <section className="container section junior-guide"><span className="eyebrow">For parents & guardians</span><h2>Find the right fit.</h2><div className="junior-age-grid"><article><span className="age-number">0–12</span><h3>Family activities</h3><p>Ask which upcoming activities suit your child’s age and whether a parent needs to stay.</p></article><article><span className="age-number">13–17</span><h3>Teen parea</h3><p>To Steki youth nights have their own age limits, times and entry details. Check the specific announcement.</p></article><article><span className="age-number">18</span><h3>The next chapter</h3><p>Explore GOYA’s wider calendar. Each event lists its own admission requirements.</p></article></div><div className="faq-list"><details><summary>What is coming up?</summary><p>New Junior activities are announced on <a href="https://www.instagram.com/junior.goya/" target="_blank" rel="noopener noreferrer">Junior GOYA’s Instagram</a>. Contact us to find the next suitable activity; previous posts are not a current schedule.</p></details><details><summary>Who should complete the introduction?</summary><p>A parent or guardian should complete the Junior introduction form. Include the child’s first name and age so we can direct the enquiry.</p></details><details><summary>Who can answer questions about care and access?</summary><p>Use the Junior enquiry option to reach GOYA. Ask about supervision, collection and any access arrangements before attending. Please keep medical or sensitive details out of the website form.</p></details></div><Link className="button" to="/contact?enquiry=junior">Ask the Junior GOYA team ↗</Link></section>
      <Footer />
    </>
  );
}
