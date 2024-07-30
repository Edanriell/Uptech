import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Uptech",
	description: "Redefining Your Tech Experience",
	keywords: ["Uptech", "Tech"],
	authors: [{ name: "Edanriell", url: "https://github.com/Edanriell" }],
	category: "Tech"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
