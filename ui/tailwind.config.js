/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{tsx,jsx,ts}'],
    theme: {
        fontFamily: {
            sans: ['"Handlee"'],
        },
        fontSize: {
            sm: '0.95rem',
        },
    },

    plugins: [],

    important: '#root',
    corePlugins: {
        preflight: false,
    },
};
