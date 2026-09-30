import { SITE } from '../site.js';

// Optional: a Web3Forms key (VITE_WEB3FORMS_KEY) takes priority if one is ever added.
const KEY = import.meta.env.VITE_WEB3FORMS_KEY;

// Sends a form to the GOYA inbox. Default: FormSubmit (free, no account — the inbox owner
// clicks a one-time "Activate" link emailed after the very first submission).
export async function submitForm(subject, fields) {
  const url = KEY ? 'https://api.web3forms.com/submit' : `https://formsubmit.co/ajax/${SITE.email}`;
  const payload = KEY
    ? { access_key: KEY, subject, from_name: 'GOYA Brisbane website', ...fields }
    : { _subject: subject, _template: 'table', _captcha: 'false', ...fields, ...(fields.Email ? { _replyto: fields.Email } : {}) };
  let res, json = {};
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    json = await res.json().catch(() => ({}));
  } catch {
    throw new Error(`Couldn't send — check your connection, or email us at ${SITE.email}.`);
  }
  const ok = res.ok && json.success !== false && json.success !== 'false';
  if (!ok) throw new Error(json.message || `Something went wrong — please email us at ${SITE.email}.`);
  return 'sent';
}
