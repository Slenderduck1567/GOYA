import React from "react";
import { Input, Select } from "../ds.js";
import { SITE } from "../site.js";
import { Footer } from "../Chrome.jsx";
import { usePageTitle } from "../shared.jsx";
import {
  useSubmission,
  SubmissionNotice,
  Success,
  Honeypot,
} from "../components/forms/Submission.jsx";
export default function Netball() {
  usePageTitle("Women’s Netball");
  const s = useSubmission();
  const onSubmit = (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    if (f.get("botcheck")) return;
    s.send("Women’s Netball — expression of interest", {
      Name: f.get("name"),
      Email: f.get("email"),
      Mobile: f.get("mobile") || "—",
      Experience: f.get("experience"),
    });
  };
  return (
    <>
      <section className="netball-intro">
        <div className="container form-intro">
          <span className="eyebrow">Women 16–30 · All skill levels</span>
          <h1>
            On your
            <br />
            team.
          </h1>
          <p className="lead">
            Women’s netball. The next chapter for the GOYA girls.
          </p>
        </div>
      </section>
      <section className="container form-layout">
        <div>
          <span className="eyebrow">Expressions of interest open</span>
          <h2>Keen to play?</h2>
          <p className="lead">
            Whether you’ve played for years or haven’t touched a ball since
            school, pop your name down.
          </p>
          <p>
            This is an expression of interest, with no commitment yet. The
            competition, nights and cost are still being locked in. We’ll be in
            touch once the details are set.
          </p>
          <dl>
            <div>
              <dt>Who</dt>
              <dd>GOYA women, 16–30. All experience levels welcome.</dd>
            </div>
            <div>
              <dt>Commitment</dt>
              <dd>None yet — we’re finding out who’s interested.</dd>
            </div>
            <div>
              <dt>Next steps</dt>
              <dd>
                We’ll share the competition, schedule and cost when confirmed.
              </dd>
            </div>
          </dl>
        </div>
        {SITE.netballFormUrl ? (
          <a
            className="button"
            href={SITE.netballFormUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the interest form ↗
          </a>
        ) : s.state === "sent" ? (
          <Success title="You’re on the list.">
            We’ll be in touch once the competition, nights and cost are
            confirmed.
          </Success>
        ) : (
          <form
            className="form-stack"
            onSubmit={onSubmit}
            aria-busy={s.state === "busy"}
          >
            <Honeypot />
            <p className="form-note">Fields marked * are required.</p>
            <Input label="Name" name="name" required autoComplete="name" />
            <Input
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
            <Input
              label="Mobile (optional)"
              name="mobile"
              type="tel"
              autoComplete="tel"
            />
            <Select
              label="Netball experience"
              name="experience"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select your experience
              </option>
              <option>Played for years</option>
              <option>Played a bit</option>
              <option>Haven't played since school</option>
              <option>Never played — keen to learn</option>
            </Select>
            <p className="form-note">
              Your details are sent to GOYA Brisbane for netball updates.
              Registering interest does not commit you to a team or payment.
            </p>
            <SubmissionNotice submission={s} />
            <button
              className="button"
              type="submit"
              disabled={s.state === "busy"}
            >
              {s.state === "busy" ? "Sending…" : "Register your interest ↗"}
            </button>
          </form>
        )}
      </section>
      <Footer />
    </>
  );
}
