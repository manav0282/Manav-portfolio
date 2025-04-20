/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // B&W Palette Inspired Names
        'jet-black': '#121212',
        'charcoal': '#2C2C2C',
        'gunmetal': '#484848',
        'smoke': '#999999',
        'ash-gray': '#B2B2B2',
        'silver': '#C0C0C0',
        'light-gray': '#E0E0E0',
        'off-white': '#FAFAFA', // Using #FAFAFA for slightly softer white

        // Semantic Mapping (Updated Values)
        primary: 'var(--color-silver)', // Silver for primary accents
        secondary: 'var(--color-smoke)', // Smoke for secondary elements (less emphasis)
        accent: 'var(--color-silver)', // Consistent accent

        light: 'var(--color-off-white)', // Main light text color
        dark: 'var(--color-charcoal)', // Main dark background

        'dark-text': 'var(--color-off-white)', // Alias for main text on dark background
        'dark-card': 'var(--color-jet-black)', // Card background
        'dark-border': 'var(--color-gunmetal)', // Borders

        // Specific Usage Colors
        'text-muted': 'var(--color-smoke)', // Muted text
        'placeholder-color': 'var(--color-ash-gray)', // Placeholder text
      },
      fontFamily: {
        heading: ['var(--font-playfair-display)', 'serif'],
        subheading: ['var(--font-inter)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wave': 'wave 2.5s infinite',
        'tilt': 'tilt 10s infinite linear',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-15deg)' },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(88, 166, 255, 0.5), 0 0 10px rgba(88, 166, 255, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(88, 166, 255, 0.8), 0 0 20px rgba(88, 166, 255, 0.5), 0 0 30px rgba(88, 166, 255, 0.3)' },
        },
      },
      boxShadow: {
        'neumorphic-light': '9px 9px 16px rgba(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.8)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        'neon-blue': '0 0 5px rgba(88, 166, 255, 0.5), 0 0 10px rgba(88, 166, 255, 0.3)',
        'neon-coral': '0 0 5px rgba(249, 117, 131, 0.5), 0 0 10px rgba(249, 117, 131, 0.3)',
        'neon-gray': '0 0 5px rgba(48, 54, 61, 0.5), 0 0 10px rgba(48, 54, 61, 0.3)',
      },
      backdropBlur: {
        'glass': '8px',
      },
    },
  },
  plugins: [
    // Plugin to define CSS variables from the theme colors
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable = colorKey === 'DEFAULT' ? `--color${colorGroup}` : `--color${colorGroup}-${colorKey}`; 

          const newVars = typeof value === 'string'
            ? { [cssVariable]: value }
            : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
} 