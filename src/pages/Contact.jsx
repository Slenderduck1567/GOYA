import React,{useState,useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { Input, Select, Textarea } from "../ds.js";
import { SITE } from "../site.js";
import { Footer } from "../Chrome.jsx";
import { directionsUrl } from "../shared.jsx";
import {
  useSubmission,
  SubmissionNotice,
  Success,
  Honeypot,
} from "../components/forms/Submission.jsx";
export default function Contact() {
  const [params] = useSearchParams();
  const enquiry=params.get("enquiry");
  const initialTopic=enquiry==="hire"?"GOYA House hire":enquiry==="junior"?"Junior GOYA":"General enquiry";
  const [topic,setTopic]=useState(initialTopic);
  useEffect(()=>setTopic(initialTopic),[initialTopic]);
  const hire=topic==="GOYA House hire";
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
      ...(f.get("date")?{Preferred_date:f.get("date"),Guest_count:f.get("guests"),Occasion:f.get("occasion")}:{}),
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
              label="What’s it about?"
              name="topic"
              value={topic}
              onChange={e=>setTopic(e.target.value)}
            >
              <option>General enquiry</option>
              <option>GOYA House hire</option>
              <option>Events</option>
              <option>Junior GOYA</option>
              <option>Volunteering</option>
            </Select>
            {hire && <><Input label="Preferred date" type="date" name="date" required /><div className="field-pair"><Input label="Approximate guest count" type="number" name="guests" min="1" max="10000" required/><Input label="Occasion" name="occasion" required /></div><p className="form-note">An enquiry does not reserve the venue. Capacity and availability will be confirmed by the committee.</p></>}
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
              {s.state === "busy" ? "Sending…" : s.direct ? "Send message ↗" : "Prepare email message ↗"}
            </button>
          </form>
        )}
      </section>
      <Footer />
    </>
  );
}
