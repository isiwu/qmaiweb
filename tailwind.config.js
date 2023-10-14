/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green7: "#DCF6D0",
        green6: "#B9ECA1",
        green5: "#96E371",
        green4: "#73D942",
        green3: "#50D013",
        green2: "#40A60F",
        green1: "#307D0B",
        qmaiGreen: "#004703",
        black3: '#CCCCCC',
        black2: "#999999",
        black1: "#666666",
        black0: "#333333",
        textWhite: "#F9F9F9",
        backgroundWhite: "#F5F5F5",
        transparentBlack: "rgba(0, 0, 0, 0.1)",
        transparentBlack1: "rgba(0, 0, 0, 0.9)",
      },
      backgroundImage: {
        qmaiButton: "linear-gradient(180deg, #3CCE2A 0%, #006A04 100%)",
        text: "linear-gradient(180deg, #3CCE2A 0%, #006A04 100%)",
        text2: "linear-gradient(180deg, #11C75A 0%, #50D013 100%)",
        
      },
      fontFamily: {
        lexend: ["Lexend"]
      },
      keyframes: {
        spin: {
          "0%": {transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadeIn: {
          "0%": {opacity: "0"},
          // "45%": {opacity: "0.4"},
          // "75%": {opacity: "0.7"},
          "100%": {opacity: "1"}
        },
        fadeOut: {
          "0%": {opacity: "1"},
          // "45%": {opacity: "0.4"},
          // "75%": {opacity: "0.7"},
          "100%": {opacity: "0"}
        },
        slideDown: {
          "0%": {top: "-50%", left: "50%", transform: "translate(-50%, -50%)"},
          "25%": {top: "0%", left: "50%", transform: "translate(-50%, -50%)"},
          "50%": {top: "10%", left: "50%", transform: "translate(-50%, -50%)"},
          "75%": {top: "30%", left: "50%", transform: "translate(-50%, -50%)"},
          '100%': {top: "50%", left: "50%", transform: "translate(-50%, -50%)"},
        },
        slideDown2: {
          "0%": {top: "50%", left: "50%", transform: "translate(-50%, -50%)"},
          "25%": {top: "60%", left: "50%", transform: "translate(-50%, -50%)"},
          "50%": {top: "70%", left: "50%", transform: "translate(-50%, -50%)"},
          "75%": {top: "100%", left: "50%", transform: "translate(-50%, -50%)"},
          "100%": {top: "150%", left: "50%", transform: "translate(-50%, -50%)"},
        },
        fade: {
          "0%": {transform: "scale(0)"},
          "25%": {transform: "scale(0.4)"},
          "75%": {transform: "scale(0.8)"},
          "100%": {transform: "scale(1)"}
        }
      },
      animation: {
        spin: "spin 2s linear infinite",
        fade: "fadeIn 24s, fadeOut 5s 2.5s",
        slideDown: "slideDown .5s ease-out forwards",
        slideDown2: "slideDown2 .5s ease-out forwards",
        fadeIn: "fade 1s ease-out forwards",
      },
    },
  },
  plugins: [],
}
