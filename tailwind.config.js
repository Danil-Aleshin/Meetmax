/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      s: '320px',
      sm: '480px',
      md: '768px',
      l: "829.28px",
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      lightGray: "#f8f9fb",
      darkBlue: "#212733",
      lightBlack: "#191c21",
      white: "#ffffff",
      blue: "#4e5e78",
      test: "#6f7e96",
      lightBlue: "#377dfc",
      "lightBlue-2": "#377cfc27",
      black: "#000",
      superLightGray: "#d5d6d8",
      inputBorderBlue: "#353c4d",
      red: "#ff0000",
      green: "#40c691",
      pink: "#ff8585",
      opacityBlack: "rgba(0, 0, 0, 0.3)",
      gray: "#a3a3a3",
      yellow: "#ffe600",
    },
    extend: {
      spacing: {
        0.2: "1px",
        0.3: "1.5px",
        0.6: "3px",
        1.4: "5px",
        1.5: "6px",
        3.3: "12.5px",
        4.5: "18px",
        4.6: "18.5px",
        5.5: "21.5px",
        6.5: "26px",
        "mainContentHeight": " calc(100vh - 90px)",
        "mainContentMobileHeight": " calc(100vh - 135px - 60px)",
        37: "148px",
        8.5: "34px",
        9.5: "38px",
        15: "60px",
        37.5: "150px",
        39: "156px",
        67.5: "269px"
      },
      zIndex: {

      },
      maxWidth: {
        "8x1": "1440px",
      },
      minWidth: {
        75: "300px"
      },
      objectPosition: {
        2.5: "11px"
      },
      width: {
        150: "600px",
        129: "516px",
        5.5: "22px",
        75: "300px",
        85: "340px",
        "54.5": "219px"
      },
      gap: {
        0.5: "2px"
      },
      boxShadow: {
        "default": "box-shadow: 0px 11px 8px 0px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        spin: "spin 4s linear infinite"
      }
    }
  },
  plugins: [],
}
