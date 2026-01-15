/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#DC2626',
                    dark: '#B91C1C',
                },
                accent: {
                    DEFAULT: '#16A34A',
                    dark: '#15803D',
                },
            },
        },
    },
    plugins: [],
}
