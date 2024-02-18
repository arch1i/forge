/// <reference types="vitest" />

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

    test: {
        globals: true,
        cache: {
            dir: '../../node_modules/.vitest',
        },

        environment: 'jsdom',
        environmentOptions: {
            jsdom: {
                resources: 'usable',
            },
        },

        deps: {
            inline: ['vitest-canvas-mock'],
        },

        include: [
            'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
            '__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],

        setupFiles: ['__tests__/setup.js'],
    },
});
