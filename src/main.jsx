import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/index.css';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </React.StrictMode>
);

// Built pages arrive with their HTML already rendered (scripts/prerender.mjs). Attach to it
// instead of throwing it away and drawing the page a second time. Links with options in the
// address (?view=past, ?enquiry=hire…) are drawn fresh, because the built HTML only knows
// the plain page.
if (container.hasChildNodes() && !window.location.search) {
  hydrateRoot(container, app, {
    // If the page has changed since the build (say an event has since moved to "past"),
    // React simply redraws it. Nothing for visitors to see.
    onRecoverableError: (error) => { if (import.meta.env.DEV) console.warn(error); },
  });
} else {
  createRoot(container).render(app);
}
