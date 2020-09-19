module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.js", "./src/**/*.jsx"],
  theme: {
    fontFamily: {
      serif: [
        '"EB Garamond"',
        "Georgia",
        "Cambria",
        '"Times New Roman"',
        "Times",
        "serif",
      ],
    },
    boxShadow: {
      default:
        "0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
    },
    extend: {
      animation: {
        cycle: "cycle 20s linear infinite 0s",
      },
      keyframes: {
        cycle: {
          "0%": { opacity: "0", transform: "translateY(0px)" },
          "1%": { opacity: "1", transform: "translateY(0px)" },
          "22%": { opacity: "1", transform: "translateY(0px)" },
          "25%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "0", transform: "translateY(50px)" },
        },
      },
      colors: {
        "sky-blue": "#285d81",
      },
    },
  },
  variants: {},
  plugins: [],
};
