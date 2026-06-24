/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        void: '#07070d',
        panel: '#0f0f1a',
        neon: '#00f5ff',
        plasma: '#ff2d95',
        acid: '#b8ff00',
      },
      boxShadow: {
        neon: '0 0 20px rgba(0, 245, 255, 0.35)',
        plasma: '0 0 20px rgba(255, 45, 149, 0.35)',
      },
    },
  },
  plugins: [],
}
