export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#2a2a2a",            // igual que variables.css
        green: "#408A71",           // institucional
        "green-light": "#56B28C",   // hover, detalles
        "green-dark": "#2F6A55",    // gradientes
        light: "#ffffff",           // texto/fondo claro
      },
      fontFamily: {
        main: ["Inter", "sans-serif"], // igual que variables.css
      },
      spacing: {
        md: "1rem",
        lg: "2rem",
      },
    },
  },
  plugins: [],
}
