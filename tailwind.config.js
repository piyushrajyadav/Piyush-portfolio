const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
			},
			colors: {
				primary: "#6366f1",
				secondary: "#4f46e5",
				tertiary: "#818cf8",
				quaternary: "#06b6d4",
				five: "#c7d2fe",

				ctnPrimaryLight: "#1e293b",
				ctnSecondaryLight: "#475569",

				ctnPrimaryDark: "#f8fafc",
				ctnSecondaryDark: "#94a3b8"
			},
			boxShadow: {
				card: "0px 35px 120px -15px #111428"
			},
			backgroundImage: {
				"hero-pattern": "url('/assets/herobg.png')",
				bgPrimaryDark:
					"linear-gradient(90deg, rgba(11,12,22,1) 0%, rgba(16,18,34,1) 50%, rgba(11,12,22,1) 100%)",
				bgSecondaryDark:
					"linear-gradient(90deg, rgba(16,18,34,1) 0%, rgba(22,25,48,1) 50%, rgba(16,18,34,1) 100%)",
				bgPrimaryLight:
					"linear-gradient(90deg, rgba(241,245,249,1) 0%, rgba(248,250,252,1) 50%, rgba(241,245,249,1) 100%)",
				bgSecondaryLight:
					"linear-gradient(90deg, rgba(226,232,240,1) 0%, rgba(241,245,249,1) 50%, rgba(226,232,240,1) 100%)"
			},
			screens: {
				xs: "320px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px"
			}
		}
	},
	plugins: [addVariablesForColors]
};
