/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slideDown': 'slideDown 0.3s ease-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'scaleIn': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
  // Disable CSS class validation warnings
  future: {
    hoverOnlyWhenSupported: true,
  },
}
