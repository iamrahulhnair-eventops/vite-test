import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,             // ✅ enables describe, it, expect
    environment: 'jsdom',      // ✅ browser-like DOM
    setupFiles: './src/setupTests.ts', // optional: jest-dom matchers
    coverage: {
      provider: 'c8',
      reporter: ['text', 'lcov'],
    },
  },
});
