/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#070918",
        sidebar: "#050714",
        card: "#0C1025",
        accent: {
          DEFAULT: "#5C7CFA",
          muted: "#3949AB"
        },
        success: "#22C55E",
        warning: "#FACC15",
        danger: "#EF4444"
      },
      borderRadius: {
        xl: "1rem"
      },
      boxShadow: {
        card: "0 18px 45px rgba(15, 23, 42, 0.65)"
      }
    }
  },
  plugins: []
};

