/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ["class"],
  theme: {
    extend: {
      animation: {
        'wave-pulse': 'wave-pulse 4s ease-in-out infinite',
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        'wave-pulse': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.7 },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};