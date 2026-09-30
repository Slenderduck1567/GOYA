import { SITE } from '../site.js';

// Web3Forms access keys are public by design (they only allow sending TO the inbox they were created for),
// so it's fine to keep it here. Get one free at https://web3forms.com.
const KEY = import.meta.env.VITE_WEB3FORMS_KEY || SITE.web3formsKey;

// Sends a form to the GOYA inbox via Web3Forms. If no key is configured yet,
// falls back to opening the visitor's email app with the details pre-filled.
export async function submitForm(subject, fields) {
  if (KEY) {
    let res, json = {};
    try {
      res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: KEY, subject, from_name: 'GOYA Brisbane website', ...fields }),
      });
      json = await res.json().catch(() => ({}));
    } catch {
      throw new Error(`Couldn't send — check your connection, or email us at ${SITE.email}.`);
    }
    if (!res.ok || json.success === false) throw new Error(json.message || `Something went wrong — please email us at ${SITE.email}.`);
    return 'sent';
  }
  const body = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n');
  window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}
