module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Solo agregar DM Sans sin sobrescribir defaults
        'dm': ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}