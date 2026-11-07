/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        equestrian: {
          dark: '#263428',        // Main deep pine/hunter green
          primary: '#2F4132',     // Brand primary green
          light: '#425A46',       // Medium sage/olive
          soft: '#E8ECE6',        // Soft muted greenish tint
          accent: '#A9834F',      // Warm leather/cognac accent
          accentLight: '#F3EDE2', // Soft warm sand/leather tint
          bg: '#F7F5F0',          // Warm off-white/canvas background
          surface: '#FFFFFF',     // Card surface
          muted: '#737A72',       // Subdued text
          border: '#E5E1D8',      // Elegant divider/card border
          tag: '#DFE7DE',         // Pill badge background
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(44, 62, 45, 0.06), 0 2px 6px -1px rgba(44, 62, 45, 0.03)',
        'float': '0 10px 30px -4px rgba(38, 52, 40, 0.15)',
        'nav': '0 -4px 20px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}

