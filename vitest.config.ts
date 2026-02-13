import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.ts?(x)'],
    reporters: ['default', 'junit'],
    outputFile: {
      junit: 'reports/junit.xml'
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov']
    }
  }
});
