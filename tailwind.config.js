/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
const { fontFamily, screens } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "512px",
      ...screens,
    },
    fontSize: {
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    extend: {
      fontFamily: {
        sans: ["Articulat-CF", ...fontFamily.sans],
      },
      letterSpacing: {
        tight: "-0.03em",
        wide: "0.02em",
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extraBold: 800,
      },

      backgroundImage: {
        "button-gradient-pink-purple":
          "linear-gradient(165deg, #ff0080, #7928ca)",
        "button-gradient-orange-yellow":
          "linear-gradient(165deg, #ff4d4d, #f9cb28)",
        "button-gradient-cyan-blue":
          "linear-gradient(165deg, #00dfd8, #007cf0)",
      },

      opacity: {
        1: "0.01",
        2.5: "0.025",
        7.5: "0.075",
        15: "0.15",
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.neutral.700"),
            a: {
              color: theme("colors.orange.700"),
              "&:hover": {
                color: theme("colors.cyan.600"),
              },
              code: { color: theme("colors.blue.400") },
            },
            "h2,h3,h4,h5,h6": {
              color: theme("colors.neutral.800"),
            },
            strong: {
              color: theme("colors.neutral.900"),
            },
            hr: {
              borderColor: theme("colors.neutral.300"),
            },
          },
        },
        invert: {
          css: {
            color: theme("colors.neutral.300"),
            a: {
              color: theme("colors.orange.400"),
              "&:hover": {
                color: theme("colors.cyan.500"),
              },
              code: { color: theme("colors.blue.400") },
            },
            "h2,h3,h4,h5,h6": {
              color: theme("colors.neutral.100"),
            },
            strong: {
              color: theme("colors.neutral.100"),
            },
            hr: {
              borderColor: theme("colors.neutral.700"),
            },
          },
        },
      }),
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "ping-small": {
          "75%, 100%": {
            transform: "scale(1.1)",
            opacity: 0,
          },
        },
        // "gradient-rotate": {
        //   to: {
        //     "--gradient-angle": "360deg",
        //   },
        // },
        // Dropdown menu
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        // Button
        "glow-tilt": {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(0.9deg)",
          },
          "75%": {
            transform: "rotate(-0.9deg)",
          },
        },
        // Toast
        "toast-hide": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "toast-slide-in-right": {
          "0%": { transform: `translateX(calc(100% + 1rem))` },
          "100%": { transform: "translateX(0)" },
        },
        "toast-slide-in-bottom": {
          "0%": { transform: `translateY(calc(100% + 1rem))` },
          "100%": { transform: "translateY(0)" },
        },
        "toast-swipe-out": {
          "0%": { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          "100%": {
            transform: `translateX(calc(100% + 1rem))`,
          },
        },
        // Homepage scrolling carousel
        "horizontal-scroll": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 850ms cubic-bezier(0, 0, 0, 1)",
        "fade-out": "fade-out 850ms cubic-bezier(0, 0, 0, 1)",
        "ping-small": "ping-small 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        // "gradient-rotate": "gradient-rotate 6s linear infinite",
        // Dropdown menu
        "scale-in": "scale-in 0.2s ease-in-out",
        "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        // Button
        "glow-tilt": "glow-tilt 4s infinite ease-in-out",
        // Toast
        "toast-hide": "toast-hide 100ms ease-in forwards",
        "toast-slide-in-right":
          "toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-slide-in-bottom":
          "toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-swipe-out": "toast-swipe-out 100ms ease-out forwards",
        // Homepage scrolling carousel
        "horizontal-scroll":
          "horizontal-scroll var(--horizontal-scroll-duration) linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-radix")(),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
    }),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
