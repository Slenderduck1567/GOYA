import { SmartImage } from "../components/SmartImage.jsx";
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Input, Select, Textarea } from "../ds.js";
import { Footer } from "../Chrome.jsx";
import {
  useSubmission,
  SubmissionNotice,
  Success,
  Honeypot,
} from "../components/forms/Submission.jsx";
export default function Join() {
  const [params] = useSearchParams();
  const [group, setGroup] = useState(
    params.get("group") === "junior" ? "Junior GOYA (0–18)" : "GOYA (16–30)",
  );
  const [mailing, setMailing] = useState(false);
  const submission = useSubmission();
  const junior = group === "Junior GOYA (0–18)";
  useEffect(() => {
    setGroup(
      params.get("group") === "junior" ? "Junior GOYA (0–18)" : "GOYA (16–30)",
    );
  }, [params]);
  const onSubmit = (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    if (f.get("botcheck")) return;
    submission.send(
      junior ? "Junior GOYA — family introduction" : "New GOYA member sign-up",
      {
        "First name": f.get("first"),
        "Last name": f.get("last"),
        Email: f.get("email"),
        Mobile: f.get("mobile") || "—",
        Group: group,
        ...(junior
          ? {
              "Parent or guardian confirmation": f.get("guardian")
                ? "Yes"
                : "No",
              "Child first name": f.get("child"),
              "Child age": f.get("age"),
            }
          : {}),
        Message: f.get("message") || "—",
        "Mailing list": mailing ? "Yes" : "No",
      },
    );
  };
  return (
    <>
      <section className="container form-layout">
        <div className="form-intro">
          <span className="eyebrow">Your place in the parea</span>
          <h1>
            Start with
            <br />
            yiasou.
          </h1>
          <p className="lead">
            Membership is free. Good company comes with it.
          </p>
          <p>
            You don’t need to sign up to come along. If you’d like an
            introduction before your first visit, leave your details and we’ll
            be in touch.
          </p>
          <SmartImage
            className="form-intro-photo"
            src="/assets/photos/goya-banner-team.jpg"
            alt="GOYA friends welcoming the parea at the house"
            loading="lazy"
          />
        </div>
        {submission.state === "sent" ? (
          <Success title="Your introduction is on its way.">
            We’ve received your details. A GOYA volunteer will be in touch.{" "}
            <Link to="/events">Explore upcoming events.</Link>
          </Success>
        ) : (
          <form
            className="form-stack"
            onSubmit={onSubmit}
            aria-busy={submission.state === "busy"}
          >
            <Honeypot />
            <p className="form-note">Fields marked * are required.</p>
            <Select
              label="Which group?"
              name="group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option>GOYA (16–30)</option>
              <option>Junior GOYA (0–18)</option>
              <option>I'd like to help out / volunteer</option>
            </Select>
            {junior && (
              <p className="form-notice">
                A parent or guardian should complete this introduction. Use your
                own contact details below. We’ll discuss suitable activities
                before any registration is finalised.
              </p>
            )}
            <div className="field-pair">
              <Input
                label={junior ? "Parent / guardian first name" : "First name"}
                name="first"
                autoComplete="given-name"
                required
              />
              <Input
                label={junior ? "Parent / guardian last name" : "Last name"}
                name="last"
                autoComplete="family-name"
                required
              />
            </div>
            <Input
              label={junior ? "Parent / guardian email" : "Email"}
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <Input
              label="Mobile (optional)"
              name="mobile"
              type="tel"
              autoComplete="tel"
            />
            {junior && (
              <fieldset>
                <legend>About your child</legend>
                <Input
                  label="Child’s first name"
                  name="child"
                  required
                  autoComplete="off"
                />
                <Select label="Child’s age" name="age" defaultValue="" required>
                  <option value="" disabled>
                    Select an age
                  </option>
                  {Array.from({ length: 19 }, (_, i) => (
                    <option key={i} value={i}>
                      {i === 0 ? "Under 1" : i}
                    </option>
                  ))}
                </Select>
                <label className="checkbox-label">
                  <input type="checkbox" name="guardian" required />I am this
                  child’s parent or guardian. *
                </label>
              </fieldset>
            )}
            <Textarea
              label="Anything you’d like us to know? (optional)"
              name="message"
              rows={4}
              hint="Please avoid including sensitive personal or medical information."
            />
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="mailing"
                checked={mailing}
                onChange={(e) => setMailing(e.target.checked)}
              />
              Also send me occasional GOYA news and event updates.
            </label>
            <p className="form-note">
              These details are sent to GOYA Brisbane so our volunteers can
              reply to your enquiry. Mailing-list updates are optional.
            </p>
            <SubmissionNotice submission={submission} />
            <button
              className="button"
              type="submit"
              disabled={submission.state === "busy"}
            >
              {submission.state === "busy"
                ? "Sending…"
                : submission.direct
                  ? (junior ? "Introduce my family ↗" : "Send my introduction ↗")
                  : "Prepare email introduction ↗"}
            </button>
          </form>
        )}
      </section>
      <Footer />
    </>
  );
}
