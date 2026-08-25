/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        festive: {
          cream: '#FFFDF9',
          ivory: '#F9F5EC',
          paper: '#FDF8F0',
          gold: '#D97706',
          goldLight: '#FBBF24',
          goldGlow: '#F59E0B',
          saffron: '#EA580C',
          kesari: '#F97316',
          crimson: '#DC2626',
          kumkum: '#B91C1C',
          ruby: '#991B1B',
          haldi: '#EAB308',
          pink: '#E11D48',
          rose: '#F43F5E',
          emerald: '#059669',
          royal: '#7C3AED',
          marigold: '#F59E0B',
          dark: '#1C1917',
          darkMuted: '#292524'
        }
      },
      fontFamily: {
        heading: ['"Cinzel Decorative"', '"Playfair Display"', 'serif', 'system-ui'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        festive: ['"Rozha One"', '"Cinzel"', 'serif'],
        hindi: ['"Yatra One"', '"Rozha One"', 'cursive', 'serif']
      },
      backgroundImage: {
        'festive-gradient': 'radial-gradient(ellipse at top, #FFFDF9 0%, #FDF6E9 50%, #F8EFE0 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #FDE68A 0%, #D97706 50%, #F59E0B 100%)',
        'crimson-gold': 'linear-gradient(135deg, #DC2626 0%, #EA580C 50%, #FBBF24 100%)',
        'mandala-pattern': "radial-gradient(#F59E0B 0.75px, transparent 0.75px), radial-gradient(#DC2626 0.75px, #FFFDF9 0.75px)",
      },
      animation: {
        'spin-slow': 'spin 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'diya-flame': 'flicker 1.8s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        flicker: {
          '0%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.9' },
          '50%': { transform: 'scale(1.08) rotate(1deg)', opacity: '1' },
          '100%': { transform: 'scale(0.96) rotate(-0.5deg)', opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'festive': '0 10px 30px -5px rgba(217, 119, 6, 0.15)',
        'festive-lg': '0 20px 40px -10px rgba(185, 28, 28, 0.2)',
        'gold-glow': '0 0 25px rgba(245, 158, 11, 0.45)',
        'diya-glow': '0 0 35px rgba(234, 88, 12, 0.55)',
      }
    },
  },
  plugins: [],
}
