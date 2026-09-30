import { SITE } from '../site.js';

// Sends a form to the GOYA inbox via FormSubmit (free, no account).
// Uses a normal form POST (no CORS issues); FormSubmit then redirects back to /thanks.
// The inbox owner clicks a one-time "Activate" link emailed after the very first submission.
export function submitForm(subject, fields) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = `https://formsubmit.co/${SITE.email}`;
  form.style.display = 'none';
  const all = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    _next: `${window.location.origin}/thanks`,
    ...(fields.Email ? { _replyto: fields.Email } : {}),
    ...fields,
  };
  for (const [k, v] of Object.entries(all)) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = k;
    input.value = v == null ? '' : String(v);
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
  return new Promise(() => {}); // page navigates away
}
