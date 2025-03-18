import { Children, type FC, isValidElement, type ReactElement, type ReactNode } from "react";
import clsx from "clsx";

import { usePrimaryNavigationStore } from "../lib/hooks";

import { NavigationLink } from "./navigation-link";

type NavigationLinksListProps = {
	children: ReactElement<typeof NavigationLink>[];
};

const validateNavigationLinksList = (children: ReactNode): void => {
	Children.forEach(children, (child) => {
		if (!(isValidElement(child) && child.type === NavigationLink)) {
			const childType =
				isValidElement(child) && child.type ? child.type.toString() : typeof child;

			throw new Error(
				`<NavigationLinksList> only accepts children of type <NavigationLink>. ` +
					`Received an invalid child of type "${childType}". Please ensure that all children are valid <NavigationLink> components.`
			);
		}
	});
};

export const NavigationLinksList: FC<NavigationLinksListProps> = ({ children }) => {
	const { orientationRef, globalClassesRef } = usePrimaryNavigationStore();

	validateNavigationLinksList(children);

	const navigationLinksListClasses = clsx(
		"relative flex w-full justify-center" + globalClassesRef!.current,
		{
			"flex-col": orientationRef!.current === "vertical",
			"flex-row": orientationRef!.current === "horizontal"
		}
	);

	return <ul className={navigationLinksListClasses}>{children}</ul>;
};
