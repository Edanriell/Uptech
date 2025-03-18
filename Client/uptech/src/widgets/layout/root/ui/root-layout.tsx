import "@app/_styles/styles.css";

import { type FC, type ReactNode } from "react";
import localFont from "next/font/local";
import { Metadata } from "next";

import { Header } from "@widgets/header/ui";
import { Footer } from "@widgets/footer/ui";

import { generateStaticMetadata } from "@shared/lib/functions";

type MainLayoutProps = {
	children: ReactNode;
};

const generalSans = localFont({
	src: "../../../../../public/fonts/GeneralSans-Variable.ttf",
	variable: "--font-general-sans",
	display: "swap",
	preload: true,
	weight: "200 700",
	fallback: ["system-ui", "Arial", "Helvetica Neue", "Segoe UI", "sans-serif"]
});

export const metadata: Metadata = generateStaticMetadata({
	title: "Uptech - Your Tech, Your Way",
	description:
		"Discover the latest in technology at Uptech. Explore cutting-edge gadgets, devices, and accessories designed to elevate your tech experience.",
	ogTitle: "Uptech - Your Tech, Your Way",
	ogDescription:
		"Shop at Uptech for the newest and most innovative tech products. From smart devices to premium accessories, find everything you need in one place."
});

export const RootLayout: FC<MainLayoutProps> = ({ children }) => {
	return (
		<html lang="en" className={`${generalSans.variable}`}>
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
};
