import { type FC, isValidElement, type ReactElement } from "react";

import { FooterNavigationRoot } from "./footer-navigation-root";
import { FooterNavigationLinksGroup } from "./footer-navigation-links-group";
import { FooterNavigationLinksList } from "./footer-navigation-links-list";
import { FooterNavigationLink } from "./footer-navigation-link";

export type FooterNavigationLink = {
	name: string;
	href: string;
};

type FooterNavigationComponents = {
	NavigationLinksGroup: typeof FooterNavigationLinksGroup;
	NavigationLinksList: typeof FooterNavigationLinksList;
	NavigationLink: typeof FooterNavigationLink;
};

type FooterNavigationProps = {
	children:
		| ReactElement<typeof FooterNavigationLinksGroup>
		| ReactElement<typeof FooterNavigationLinksGroup>[];
};

type FooterNavigation = FC<FooterNavigationProps> & FooterNavigationComponents;

const validateFooterNavigationChildren = <T,>(
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
				`You might have passed an invalid child or no children at all. ` +
				`Make sure to use <${expectedType}> components as direct children.`
		);
	}
};

export const FooterNavigation: FooterNavigation = ({ children }) => {
	validateFooterNavigationChildren(children, FooterNavigationLinksGroup, "FooterNavigation");

	return <FooterNavigationRoot>{children}</FooterNavigationRoot>;
};

FooterNavigation.NavigationLinksGroup = FooterNavigationLinksGroup;
FooterNavigation.NavigationLinksList = FooterNavigationLinksList;
FooterNavigation.NavigationLink = FooterNavigationLink;
