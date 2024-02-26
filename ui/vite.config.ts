/// <reference types="vitest" />

import { defineConfig } from 'vite';
import { qrcode } from 'vite-plugin-qrcode';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), basicSsl(), qrcode()],
    base: './',

    server: {
        port: 3000,
        host: true,
    },
    preview: {
        port: 3000,
        host: true,
    },

    resolve: {
        alias: {
            '.prisma/client/index-browser': 'node_modules/.prisma/client/index-browser.js',
        },
    },

    test: {
        globals: true,
        reporters: ['verbose'],
        cache: {
            dir: '../../node_modules/.vitest',
        },

        environment: 'jsdom',
        environmentOptions: {
            jsdom: {
                resources: 'usable',
            },
        },

        server: {
            deps: {
                inline: ['vitest-canvas-mock'],
            },
        },

        include: [
            'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
            '__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],

        setupFiles: ['__tests__/setup.js'],
    },
});
