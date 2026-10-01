import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Build files with a content hash in their name (scripts, styles, fonts) go to /_app/,
  // which vercel.json lets browsers cache for a year. /assets/ is left for photos and
  // logos that keep the same name when replaced.
  build: { assetsDir: '_app' },
});
