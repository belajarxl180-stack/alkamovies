/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'horror-black': '#0B0B0D',
        'horror-dark': '#121214',
        'horror-orange': '#FF6A00',
      },
      fontFamily: {
        'creepster': ['Creepster', 'cursive'],
        'nosifer': ['Nosifer', 'cursive'],
        'eater': ['Eater', 'cursive'],
      },
      boxShadow: {
        'horror': '0 10px 40px rgba(255, 106, 0, 0.15)',
        'horror-glow': '0 0 30px rgba(255, 106, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
