/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    preflight: false, // Disable preflight to prevent Bootstrap conflict
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'thns-red': '#e30019',
        'thns-orange': '#f89a20',
        'thns-gray-bg': '#f8fafc',
        'thns-text': '#1e293b',
        'thns-blue': '#0066cc'
      },
    },
  },
  plugins: [],
}
