export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "var(--color-dark)",
        green: "var(--color-green)",
        "green-light": "var(--color-green-light)",
        "green-dark": "var(--color-green-dark)",
        light: "var(--color-light)",
      },
      fontFamily: {
        main: ["var(--font-main)", "sans-serif"],
      },
      spacing: {
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
      },
    },
  },
  plugins: [],
}
