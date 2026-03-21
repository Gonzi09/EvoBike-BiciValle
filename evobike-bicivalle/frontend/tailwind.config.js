/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#0B0B0F',
          surface: '#111118',
          'green-dark': '#0B3D2E',
          'green-bright': '#39D98A',
          'green-hover': '#2EBB70',
        },
        accent: {
          fuchsia: '#FF2BD6',
          'fuchsia-hover': '#E611BE',
        },
        text: {
          primary: '#EDEDED',
          secondary: '#A0A0A0',
          muted: '#6B6B6B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 24px rgba(57, 217, 138, 0.15)',
        'glow-green': '0 0 20px rgba(57, 217, 138, 0.3)',
        'glow-fuchsia': '0 0 20px rgba(255, 43, 214, 0.3)',
      },
    },
  },
  plugins: [],
}