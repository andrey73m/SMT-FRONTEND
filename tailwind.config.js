/** @type {import('tailwindcss').Config} */

export default {
  content: [    "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}", "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"  ],
  theme: {
    extend: {
      "animation": {
        "gradient-x":"gradient-x 8s ease infinite",
        "gradient-y":"gradient-y 8s ease infinite",
        "gradient-xy":"gradient-xy 8s ease infinite",
      },
      "keyframes": {
        "gradient-y": {
          "0%, 100%": {
            "background-size":"400% 400%",
            "background-position": "center top"
          },
          "50%": {
            "background-size":"200% 200%",
            "background-position": "center center"
          }
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size":"200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size":"200% 200%",
            "background-position": "right center"
          }
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size":"400% 400%",
            "background-position": "left center"
          },
          "50%": {
            "background-size":"200% 200%",
            "background-position": "right center"
          }
        }
      },
      spacing:{
        "topbar": "3rem"
      }
    },
    fontFamily: {
      poetsen: ["Poetsen One"]
    },
  },
  plugins: [],
}

