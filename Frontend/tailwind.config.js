/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Add custom breakpoints
        'xs': '480px',     
        'sm': '750px',   
        'lg-xl': '1440px', 
      },
    },
  },
  plugins: [],
}
