"use client";

import { type FC } from "react";

import { Drawer } from "@widgets/drawer/ui";
import { MobileNavigation } from "@widgets/mobile-navigation/ui";

import { HeaderSticky } from "./header-sticky";
import { HeaderStatic } from "./header-static";

// width="380rem" height="75%"
// width="96.5%" height="60%" position="top"

export const Header: FC = () => {
	return (
		<Drawer.Provider>
			<HeaderStatic />
			<HeaderSticky />
			<MobileNavigation className="fixed top-[80rem] left-0" />
			<Drawer max={3} width="380rem" height="82%" position="right">
				<Drawer.Content>
					<div data-content-id="search">Content 1</div>
					<div data-content-id="profile">Content 2</div>
					<div data-content-id="cart">Content 3</div>
				</Drawer.Content>
			</Drawer>
		</Drawer.Provider>
	);
};
