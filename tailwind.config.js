/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {},
    screens: {
      xxs: "320px",
      xs: "480px",
      sm: "640px",
      med: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    }
  },
  plugins: [
    require("flowbite/plugin")
  ],
}