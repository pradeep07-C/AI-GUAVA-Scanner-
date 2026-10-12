/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        guava: {
          50: '#f2f9f1',
          100: '#e1f2df',
          200: '#c5e5c0',
          300: '#99d292',
          400: '#68b85f',
          500: '#479c3d',
          600: '#357d2e',
          700: '#2c6326',
          800: '#264f22',
          900: '#20421e',
        },
      },
      animation: {
        'scan-laser': 'scanLaser 2.2s ease-in-out infinite alternate',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scanLaser: {
          '0%': { transform: 'translateY(0%)', opacity: '0.85' },
          '100%': { transform: 'translateY(100%)', opacity: '0.95' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
