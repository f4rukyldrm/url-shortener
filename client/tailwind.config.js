/* @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'main-color': '#333',
                'accent-color': '#222',
                'color-white': '#d3dcdf'
            },
        },
    },
    plugins: [],
}