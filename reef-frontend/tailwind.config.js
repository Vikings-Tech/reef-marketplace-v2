
module.exports =
{
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#034059",
          light: "#B1D4E0",
          dark: "#0C2D48",
        }
      },
      fontFamily: {
        'otoman': ['Otomanopee One'],
        'sans': ['Roboto',
          'system-ui',]
      }
    },
  },
  variants: {
    display: ["responsive", "group-hover", "group-focus"],

  },
  plugins: [
    require('@tailwindcss/forms'),

  ],
}
