import React from "react";
import { useSearchParams } from "react-router-dom";
import { Input, Select, Textarea } from "../ds.js";
import { SITE } from "../site.js";
import { Footer } from "../Chrome.jsx";
import { directionsUrl, usePageTitle } from "../shared.jsx";
import {
  useSubmission,
  SubmissionNotice,
  Success,
  Honeypot,
} from "../components/forms/Submission.jsx";
export default function Contact() {
  usePageTitle("Contact");
  const [params] = useSearchParams();
  const hire = params.get("enquiry") === "hire";
  const s = useSubmission();
  const onSubmit = (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    if (f.get("botcheck")) return;
    s.send(`GOYA enquiry — ${f.get("topic")}`, {
      Name: f.get("name"),
      Email: f.get("email"),
      Topic: f.get("topic"),
      Message: f.get("message"),
    });
  };
  return (
    <>
      <section className="container form-layout">
        <div className="form-intro">
          <span className="eyebrow">A conversation starts here</span>
          <h1>
            Say
            <br />
            yiasou.
          </h1>
          <p className="lead">
            Questions, ideas or a celebration in mind? We’d love to hear from
            you.
          </p>
          <p>
            We’re a volunteer team. Instagram is usually the quickest way to
            reach us.
          </p>
          <div className="contact-methods">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              {SITE.instagramHandle} ↗<small>Instagram</small>
            </a>
            <a href={`mailto:${SITE.email}`}>
              {SITE.email}
              <small>Email us anytime</small>
            </a>
            <a href={directionsUrl()} target="_blank" rel="noopener noreferrer">
              {SITE.addressShort} ↗<small>Find GOYA House</small>
            </a>
          </div>
        </div>
        {s.state === "sent" ? (
          <Success title="Message received.">
            Thanks for getting in touch. A GOYA volunteer will reply as soon as
            they can.
          </Success>
        ) : (
          <form
            className="form-stack"
            onSubmit={onSubmit}
            aria-busy={s.state === "busy"}
          >
            <Honeypot />
            <p className="form-note">Fields marked * are required.</p>
            <Input label="Your name" name="name" required autoComplete="name" />
            <Input
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
            <Select
              key={String(hire)}
              label="What’s it about?"
              name="topic"
              defaultValue={hire ? "GOYA House hire" : "General enquiry"}
            >
              <option>General enquiry</option>
              <option>GOYA House hire</option>
              <option>Events</option>
              <option>Junior GOYA</option>
              <option>Volunteering</option>
            </Select>
            <Textarea
              label="Message"
              name="message"
              rows={6}
              required
              placeholder={
                hire
                  ? "Tell us your preferred date, occasion and approximate guest count."
                  : "What’s on your mind?"
              }
              hint="For venue hire, include your preferred date and approximate guest count."
            />
            <p className="form-note">
              Your details are sent to GOYA Brisbane to respond to this enquiry.
            </p>
            <SubmissionNotice submission={s} />
            <button
              className="button"
              type="submit"
              disabled={s.state === "busy"}
            >
              {s.state === "busy" ? "Sending…" : "Send message ↗"}
            </button>
          </form>
        )}
      </section>
      <Footer />
    </>
  );
}
