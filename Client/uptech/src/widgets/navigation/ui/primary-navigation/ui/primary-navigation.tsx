import { Children, type FC, isValidElement, type ReactElement, type ReactNode } from "react";

import { PrimaryNavigationProvider } from "../model";

import { NavigationLinksList } from "./navigation-links-list";
import { ClipPathNavigationLinksList } from "./clip-path-navigation-links-list";
import { NavigationLink, type NavigationLinkProps } from "./navigation-link";
import { ClipPathNavigationLink } from "./clip-path-navigation-link";
import { PrimaryNavigationRoot } from "./primary-navigation-root";

export type PrimaryNavigationLink = {
	name: string;
	href: string;
	id: string;
	icon?: ReactElement;
};

type PrimaryNavigationComponents = {
	NavigationLinksList: typeof NavigationLinksList;
	NavigationLink: typeof NavigationLink;
};

type PrimaryNavigationProps = {
	className?: string;
	orientation?: "horizontal" | "vertical";
	children: ReactElement<
		typeof NavigationLinksList & { children: ReactElement<typeof NavigationLink>[] }
	>;
};

type PrimaryNavigation = FC<PrimaryNavigationProps> & PrimaryNavigationComponents;

const validatePrimaryNavigation = (children: ReactNode): void => {
	if (!isValidElement(children) || children.type !== NavigationLinksList) {
		throw new Error(
			`The "PrimaryNavigation" component requires its child to be of type "NavigationLinksList". ` +
				`This means that "PrimaryNavigation" must have exactly one child element: ` +
				`<NavigationLinksList> with "NavigationLink" components as its children.`
		);
	}
};

export const PrimaryNavigation: PrimaryNavigation = ({
	className = "",
	orientation = "horizontal",
	children
}) => {
	validatePrimaryNavigation(children);

	const clipPathLinks = Children.map(children.props.children, (child) => {
		if (isValidElement(child) && child.type === NavigationLink) {
			const { id, name, href, icon } = child.props as unknown as NavigationLinkProps;
			return <ClipPathNavigationLink key={id} id={id} name={name} href={href} icon={icon} />;
		}
		return null;
	});

	return (
		<PrimaryNavigationProvider>
			<PrimaryNavigationRoot className={className} orientation={orientation}>
				{children}
				<ClipPathNavigationLinksList>{clipPathLinks}</ClipPathNavigationLinksList>
			</PrimaryNavigationRoot>
		</PrimaryNavigationProvider>
	);
};

PrimaryNavigation.NavigationLinksList = NavigationLinksList;
PrimaryNavigation.NavigationLink = NavigationLink;
