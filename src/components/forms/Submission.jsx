import React, { useState, useEffect, useRef } from "react";
import { submitForm, KEY } from "../../lib/submit.js";
import { SITE } from "../../site.js";
export function useSubmission() {
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");
  const [emailHref, setEmailHref] = useState("");
  const lock = useRef(false);
  const send = async (subject, fields) => {
    if (lock.current) return;
    lock.current = true;
    setState("busy");
    setError("");
    const body = Object.entries(fields)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    setEmailHref(
      `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
    try {
      setState(await submitForm(subject, fields));
    } catch (e) {
      setState("error");
      setError(e.message);
    } finally {
      lock.current = false;
    }
  };
  return { state, error, emailHref, send, direct: Boolean(KEY) };
}
export function SubmissionNotice({ submission: s }) {
  if (!KEY && s.state === "idle") return <p className="form-note">This form currently prepares an email draft. You’ll need to press Send in your email app to deliver it.</p>;
  if (s.state === "mailto")
    return (
      <div className="form-notice" role="status">
        Your details haven’t been sent yet. If your email app opened a draft, review it and press Send there.{" "}
        <a href={s.emailHref}>Open the email draft again</a>.
      </div>
    );
  if (s.error)
    return (
      <div className="form-notice" role="alert">
        {s.error} <a href={s.emailHref}>Send your details by email instead</a>.
      </div>
    );
  return null;
}
export function Success({ title, children }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div className="form-success" tabIndex={-1} ref={ref} role="status">
      <span className="eyebrow">Efharisto — thank you</span>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}
export function Honeypot() {
  return (
    <input
      type="checkbox"
      name="botcheck"
      tabIndex={-1}
      autoComplete="off"
      className="visually-hidden"
      aria-hidden="true"
    />
  );
}
