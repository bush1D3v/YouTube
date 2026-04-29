/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        muted: '#64748b',
        surface: '#ffffff',
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490'
        }
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: []
};
