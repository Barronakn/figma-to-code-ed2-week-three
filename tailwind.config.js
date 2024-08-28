module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: { 
    extend:
    {
      fontSize: {
        xxs: "10px",
      },
      colors: {
        "light-gray" : "#F3F4F6",
        "gray" : "#D1D5DB",
        "dark-gray" : "#6B7280",
        "yellow" : "#F2D604",
        "green" : "#01B130",
        "red" : "#CB0101",
        "blue" : "#006EFF",
        "dark-2" : "#0065EA",
        "dark-blue-1" : "#171923",
        "dark-blue-2" : "#292C3B",
      },
      spacing: {
        1.1: "5px",
        5.5: "22px",
        6.5: "26px",
        9.5: "38px",
        84: "362px",
        22: "86px",
        8.5: "38px",
      },
      borderRadius: {
        10: "10px",
        100: "100px",
      },
      opacity : {
        6: "6%",
        7: "7%",
        15: "15%",
      },
      width : {
        4.5 : "18px",
        64.5 : "259px",
      },
      height : {
        4.5 : "18px",
        48.5 : "194px",
      }
    },
  },
  plugins: [],
};
