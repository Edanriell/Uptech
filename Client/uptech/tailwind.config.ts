import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/entities/**/*.{js,ts,jsx,tsx}",
		"./src/next-pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/shared/**/*.{js,ts,jsx,tsx}",
		"./src/widgets/**/*.{js,ts,jsx,tsx}",
		"./src/features/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
			}
		},
		colors: {
			white: {
				"50": "#ffffff",
				"100": "#efefef",
				"200": "#dcdcdc",
				"300": "#bdbdbd",
				"400": "#989898",
				"500": "#7c7c7c",
				"600": "#656565",
				"700": "#525252",
				"800": "#464646",
				"900": "#3d3d3d",
				"950": "#292929"
			}
		}
	},
	plugins: []
};
export default config;
