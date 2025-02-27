import { type FC, isValidElement, type ReactElement } from "react";

import { FooterNavigationLinksList } from "./footer-navigation-links-list";

type NavigationLinksGroupProps = {
	name: string;
	children: ReactElement;
};

export const FooterNavigationLinksGroup: FC<NavigationLinksGroupProps> = ({ name, children }) => {
	if (!(isValidElement(children) && children.type === FooterNavigationLinksList)) {
		throw new Error(
			`<NavigationLinksGroup> expects exactly one child of type <NavigationLinksList>. ` +
				`You might have passed an invalid child, no child, or multiple children. ` +
				`Ensure a single <NavigationLinksList> component is passed as a direct child.`
		);
	}

	return (
		<div className="flex flex-col gap-y-[24rem] flex-grow-0 flex-shrink-0">
			<header className="relative">
				<h3 className="font-medium text-[20rem] leading-[125%] text-[#FFFFFFE5]">{name}</h3>
			</header>
			{children}
		</div>
	);
};
