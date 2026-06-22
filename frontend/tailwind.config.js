/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDF8F3',
          100: '#FAF0E6',
          200: '#F5E0D0',
          300: '#EED0B8',
          400: '#E6B898',
          500: '#DEA078',
          600: '#D68858',
          700: '#CE7038',
          800: '#C65818',
          900: '#BE4000',
        },
        beige: {
          50: '#FDFBF7',
          100: '#FAF7EF',
          200: '#F5EFDF',
          300: '#EFE7CF',
          400: '#E9DFBF',
          500: '#E3D7AF',
          600: '#DDCF9F',
          700: '#D7C78F',
          800: '#D1BF7F',
          900: '#CBB76F',
        },
        brown: {
          50: '#F5F0EB',
          100: '#EAE0D5',
          200: '#D5C0AB',
          300: '#C0A081',
          400: '#AB8057',
          500: '#96602D',
          600: '#814003',
          700: '#6C3500',
          800: '#572A00',
          900: '#421F00',
        },
        gold: {
          50: '#FFFBF0',
          100: '#FFF7E0',
          200: '#FFEFBF',
          300: '#FFE79F',
          400: '#FFDF7F',
          500: '#FFD75F',
          600: '#FFCF3F',
          700: '#FFC71F',
          800: '#FFBF00',
          900: '#FFB700',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
