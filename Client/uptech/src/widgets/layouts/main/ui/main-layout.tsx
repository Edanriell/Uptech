import { FC, ReactNode } from "react";

type MainLayoutProps = {
	children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
};
