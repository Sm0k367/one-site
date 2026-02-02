/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0a0a0a',
          text: '#00ff00',
          border: '#00ff00',
          input: '#ffffff',
          error: '#ff0000',
          success: '#00ff00',
          warning: '#ffff00',
          cyan: '#00ffff',
          yellow: '#ffff00',
          purple: '#ff00ff',
          green: '#00ff00',
        }
      },
      fontFamily: {
        mono: ['"Courier New"', 'monospace'],
      }
    },
  },
  plugins: [],
}
