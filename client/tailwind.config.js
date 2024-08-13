/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Calluna Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      'serif': ['Calluna', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      'calluna-sans': ['Calluna Sans', 'sans-serif'],
      'calluna': ['Calluna', 'serif'],
    },
    extend: {
      colors: {
        littleRockBlue: {
          500: '#1f3763',
          600: '#02284b'
        },
        littleRockWhite: {
          500: '#fdfffe'
        }
      }
    },
  },
  plugins: [],
}

