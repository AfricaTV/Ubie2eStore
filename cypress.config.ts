import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://eu.store.ui.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,
  },
});

