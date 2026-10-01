import { defineConfig } from '@playwright/test';

// Tests build with a mock form endpoint and fixture events; production builds use neither.
const env =
  'PUBLIC_FORM_ENDPOINT=https://forms.example.test/submit EVENTS_DIR=./tests/fixtures/events';

export default defineConfig({
  testDir: 'tests',
  webServer: {
    command: `${env} npm run build && npm run preview -- --port 4321 --ignore-lock`,
    url: 'http://localhost:4321',
    reuseExistingServer: false,
    timeout: 120_000,
  },
  use: {
    baseURL: 'http://localhost:4321',
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || undefined },
  },
});
