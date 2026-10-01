import { defineConfig } from '@playwright/test';

// Tests build with test-form endpoints on the real provider domains (the build rejects other domains)
// and fixture events. The tests intercept every request to them, so nothing reaches either service.
// Production builds use neither.
const env =
  'PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/testform PUBLIC_BREVO_FORM_URL=https://test.sibforms.com/serve/testform EVENTS_DIR=./tests/fixtures/events STORIES_FIXTURES=tests/fixtures/stories/*.md';

export default defineConfig({
  testDir: 'tests',
  webServer: {
    command: `${env} npm run build && npm run preview -- --port 4321 --ignore-lock`,
    url: 'http://localhost:4321',
    reuseExistingServer: false,
    timeout: 120_000,
  },
  use: { baseURL: 'http://localhost:4321' },
  // Chromium always; Firefox and a WebKit (Safari) engine too when CROSS_BROWSER=1 (CI, where they are installed).
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          executablePath: process.env.CHROMIUM_PATH || undefined,
        },
      },
    },
    ...(process.env.CROSS_BROWSER
      ? [
          { name: 'firefox', use: { browserName: 'firefox' as const } },
          { name: 'webkit', use: { browserName: 'webkit' as const } },
        ]
      : []),
  ],
});
