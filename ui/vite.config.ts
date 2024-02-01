import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: './',

  resolve: {
    alias: {
      '.prisma/client/index-browser': 'node_modules/.prisma/client/index-browser.js',
    },
  },
});
