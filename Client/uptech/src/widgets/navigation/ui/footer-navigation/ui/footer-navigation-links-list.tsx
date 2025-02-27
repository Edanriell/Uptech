import { type FC, isValidElement, type ReactElement } from "react";

import { FooterNavigationLink } from "./footer-navigation-link";

type NavigationLinksListProps = {
	children:
		| ReactElement<typeof FooterNavigationLink>
		| ReactElement<typeof FooterNavigationLink>[];
};

const validateFooterNavigationLinksListChildren = <T,>(
	children: ReactElement<T> | ReactElement<T>[],
	expectedType: T,
	componentName: string
): void => {
	if (
		!(
			(
				(isValidElement(children) && children.type === expectedType) || // Single child case
				(Array.isArray(children) &&
					children.every((child) => isValidElement(child) && child.type === expectedType))
			) // Multiple children case
		)
	) {
		throw new Error(
			`<${componentName}> expects one or more children of type <${expectedType}>. ` +
				`You might have passed an invalid child, no children, or mixed children. ` +
				`Ensure that all children are <${expectedType}> components.`
		);
	}
};

export const FooterNavigationLinksList: FC<NavigationLinksListProps> = ({ children }) => {
	validateFooterNavigationLinksListChildren(
		children,
		FooterNavigationLink,
		"NavigationLinksList"
	);

	return <ul className="flex flex-col ml-[-16rem]">{children}</ul>;
};
