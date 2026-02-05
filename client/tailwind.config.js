/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                blood: {
                    light: '#ff4d4d',
                    DEFAULT: '#e63946',
                    dark: '#b91c1c',
                },
                medical: {
                    blue: '#457b9d',
                    teal: '#2a9d8f',
                    cream: '#f1faee',
                    navy: '#1d3557',
                }
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
