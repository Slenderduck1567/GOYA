import { SITE } from '../site.js';

const KEY = import.meta.env.VITE_WEB3FORMS_KEY;

// Sends a form to the GOYA inbox via Web3Forms (free). If no key is configured yet,
// falls back to opening the visitor's email app with the details pre-filled.
export async function submitForm(subject, fields) {
  if (KEY) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: KEY, subject, from_name: 'GOYA Brisbane website', ...fields }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false) throw new Error(json.message || 'Something went wrong — please try again.');
    return 'sent';
  }
  const body = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n');
  window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}
