import React, { Children, type FC, isValidElement, type ReactNode } from "react";

import { useProcessedDrawerContent } from "../lib/hooks";

type DrawerContentProps = {
	children: ReactNode;
};

export const validateDrawerContentChildren = (children: ReactNode) => {
	return Children.toArray(children).map((child) => {
		if (!isValidElement(child)) {
			throw new Error(
				`<Drawer.Content> only accepts valid React elements as children. ` +
					`Encountered an invalid child: ${typeof child}.`
			);
		}

		const childComponentName =
			typeof child.type === "string"
				? child.type
				: typeof child.type === "function" || typeof child.type === "object"
					? (child.type as React.FC).displayName ||
						(child.type as React.FC).name ||
						"Unknown"
					: "Unknown";

		if (!child.props?.["data-content-id"]) {
			throw new Error(
				`Each child of <Drawer.Content> must have a "data-content-id" attribute. ` +
					`The child component "${childComponentName}" is missing this attribute.`
			);
		}

		return child;
	});
};

export const DrawerContent: FC<DrawerContentProps> = ({ children }) => {
	useProcessedDrawerContent(children);

	return null;
};
