import { FC, ReactNode } from "react";
import localFont from "next/font/local";

import { Header } from "@widgets/header/ui";

type MainLayoutProps = {
	children: ReactNode;
};

const generalSans = localFont({
	src: "../../../../../public/fonts/GeneralSans-Variable.ttf",
	variable: "--font-general-sans",
	display: "swap"
});

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	return (
		<html lang="en" className={`${generalSans.variable}`}>
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
};
