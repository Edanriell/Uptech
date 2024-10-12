"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

import { MobileNavigation } from "@widgets/mobile-navigation/ui";
import { StaticHeader } from "@widgets/header/ui/static-header";

import { HeaderProvider } from "../model";

const DynamicHeader = dynamic(() => import("./dynamic-header"), {
	ssr: false
});

export const Header: FC = () => {
	return (
		<HeaderProvider>
			<StaticHeader />
			<DynamicHeader />
			<MobileNavigation classes="fixed top-[80rem] left-0" />
		</HeaderProvider>
	);
};
