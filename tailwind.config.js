/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pageColors: {
          purple: '#8b5cf6',
          purpleLight: '#f3e8ff',
          text: '#111827',
          subtle: '#9ca3af',
          cardHeader: '#f8fafc',
          border: '#e5e7eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}