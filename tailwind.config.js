/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          primary: '#6B2737',
          secondary: '#C9A961',
        },
        match: {
          green: '#5A9367',
          yellow: '#E8B44C',
          red: '#C75450',
        },
        bg: {
          primary: '#FAF9F7',
        },
        text: {
          primary: '#2D2D2D',
          secondary: '#787878',
        },
        personality: {
          'fresh-classic': '#5A9367',
          'smooth-operator': '#C9A961',
          'bold-adventurer': '#8B2252',
          'crisp-minimalist': '#87CEEB',
          'rich-indulger': '#6B2737',
          'sweet-tooth': '#E8B44C',
          'wild-experimenter': '#D2691E',
          'elegant-classicist': '#4A4A6A',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-work-sans)', 'sans-serif'],
      },
      fontSize: {
        h1: ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        caption: ['0.75rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        md: '8px',
        lg: '12px',
        xl: '24px',
      },
      spacing: {
        '4.5': '18px',
        '7': '28px',
        '13': '52px',
        '14': '56px',
      },
      keyframes: {
        'bounce-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scan-line': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(240px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
      animation: {
        'bounce-in': 'bounce-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-up': 'slide-up 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.35s ease-out forwards',
        'scan-line': 'scan-line 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
