// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        // THESE ARE SPECIAL FONTS
        display: ["Outfit", "sans-serif"],
        modern: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      colors: {
        primary: "#0f172a", // Slate 900
        secondary: "#475569", // Slate 600
        accent: "#4f46e5", // Indigo 600 - Refined Primary Accent
        "accent-dark": "#4338ca", // Indigo 700
        "accent-subtle": "#e0e7ff", // Indigo 100
        "surface-paper": "#ffffff",
        "surface-muted": "#f8fafc", // Slate 50
        "border-subtle": "#e2e8f0", // Slate 200
      },
      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'), // Updated this line
  ],
}