import { Children, type FC, Fragment, isValidElement, type ReactElement } from "react";

import { DrawerProvider } from "../model";
import { useDrawerConfig } from "../lib/hooks";

import { DrawerRoot } from "./drawer-root";
import { DrawerTrigger } from "./drawer-trigger";
import { DrawerContent } from "./drawer-content";

type DrawerComponents = {
	Provider: typeof DrawerProvider;
	Trigger: typeof DrawerTrigger;
	Content: typeof DrawerContent;
};

export type DrawerProps = {
	max?: number;
	width?: string;
	height?: string;
	position?: "top" | "bottom" | "left" | "right";
	children: ReactElement<typeof DrawerContent>;
};

type Drawer = FC<DrawerProps> & DrawerComponents;

const validateDrawerChildren = (children: ReactElement) => {
	Children.forEach(children, (child) => {
		if (!(isValidElement(child) && child.type === DrawerContent)) {
			throw new Error(
				`<Drawer> children must be a valid <Drawer.Content> component. ` +
					`Invalid child detected: ${child.type}. ` +
					`Ensure all children are instances of <Drawer.Content>.`
			);
		}
	});
};

export const Drawer: Drawer = ({
	max = 3,
	width = "380rem",
	height = "75%",
	position = "right",
	children
}) => {
	useDrawerConfig({ max, width, height, position });

	validateDrawerChildren(children);

	return (
		<Fragment>
			{children}
			<DrawerRoot />
		</Fragment>
	);
};

Drawer.Provider = DrawerProvider;
Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
