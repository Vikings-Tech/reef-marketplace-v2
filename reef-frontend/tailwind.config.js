
module.exports =
{
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F46E1B",
          light: "#F7EBEF",
          dark: "#A77289",
        }
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),

  ],
}
