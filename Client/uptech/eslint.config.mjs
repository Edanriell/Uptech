import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname
});

const eslintConfig = [
	// Import the Next.js plugin explicitly
	{
		plugins: {
			"@next/next": nextPlugin
		}
	},
	// Use compatibility layer for the rest of the configuration
	...compat.extends("next/core-web-vitals", "next/typescript")
];

export default eslintConfig;
