/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'px': '1px',
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
        '10': '80px',
        '12': '96px',
        '16': '128px',
      },
      colors: {
        primary: {
          bg: '#0B1220',
          surface: '#111827',
          'surface-light': '#1a2a3a',
          // Brand blue tokens (replaces legacy green tokens — backward compat preserved)
          blue: '#2E9ED4',
          'blue-dark': '#1a5f8f',
          'blue-hover': '#2589BB',
          'blue-light': '#3BA8E0',
          // Legacy aliases remapped to brand blue so Contact/Success stay consistent
          'green-dark': '#1a5f8f',
          'green-bright': '#2E9ED4',
          'green-hover': '#2589BB',
        },
        accent: {
          // Remapped from fuchsia to brand cyan accent
          cyan: '#00BFFF',
          'cyan-hover': '#009fd6',
          fuchsia: '#00BFFF',
          'fuchsia-hover': '#009fd6',
        },
        brand: {
          primary: '#2E9ED4',
          accent: '#00BFFF',
          dark: '#0B1220',
        },
        text: {
          primary: '#F9FAFB',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
        border: {
          dark: '#1e2d42',
          'dark-light': '#2a3a4a',
        },
      },
      fontSize: {
        'xs': ['8px', { lineHeight: '1rem' }],
        'sm': ['12px', { lineHeight: '1.2' }],
        'base': ['14px', { lineHeight: '1.5' }],
        'lg': ['16px', { lineHeight: '1.6' }],
        'xl': ['18px', { lineHeight: '1.6' }],
        '2xl': ['20px', { lineHeight: '1.4' }],
        '3xl': ['24px', { lineHeight: '1.35' }],
        '4xl': ['32px', { lineHeight: '1.2' }],
        '5xl': ['40px', { lineHeight: '1.1' }],
        '6xl': ['48px', { lineHeight: '1' }],
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['Menlo', 'Courier New', 'monospace'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 8px 28px rgba(46, 158, 212, 0.2)',
        'glow': '0 0 28px rgba(46, 158, 212, 0.45)',
        'glow-cyan': '0 0 32px rgba(0, 191, 255, 0.35)',
        'glow-blue': '0 0 28px rgba(46, 158, 212, 0.45)',
        'glass-inner': 'inset 0 1px 0 rgba(46, 158, 212, 0.1)',
      },
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'glass': '16px',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'fade-in': 'fadeIn 600ms ease-out',
        'fade-in-up': 'fadeInUp 600ms ease-out',
        'slide-in-right': 'slideInRight 400ms ease-out',
        'pulse-glow': 'pulseGlow 1.5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 28px rgba(46, 158, 212, 0.45)' },
          '50%': { boxShadow: '0 0 36px rgba(0, 191, 255, 0.3)' },
        },
      },
    },
  },
  plugins: [],
}
