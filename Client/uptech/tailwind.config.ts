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
			},
			gridTemplateColumns: {
				"mobile-navigation-auto-fit": "repeat(auto-fit, minmax(147px, 1fr))"
			},
			width: {
				"fill-chrome": "-webkit-fill-available",
				"fill-firefox": "-moz-available"
			}
		},
		screens: {
			mobile: "390px",
			tablet: "990px",
			laptop: "1366px",
			desktop: "1440px"
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
			},
			shark: {
				"50": "#f6f6f6",
				"100": "#e7e7e7",
				"200": "#d1d1d1",
				"300": "#b0b0b0",
				"400": "#888888",
				"500": "#6d6d6d",
				"600": "#5d5d5d",
				"700": "#4f4f4f",
				"800": "#454545",
				"900": "#3d3d3d",
				"950": "#1f1f1f"
			},
			"alizarin-crimson": {
				"50": "#fff1f3",
				"100": "#ffdfe3",
				"200": "#ffc5cc",
				"300": "#ff9ca8",
				"400": "#ff6477",
				"500": "#ff334c",
				"600": "#ef233c",
				"700": "#c80d24",
				"800": "#a50f21",
				"900": "#891321",
				"950": "#4b040d"
			}
		}
	},
	plugins: []
};
export default config;
