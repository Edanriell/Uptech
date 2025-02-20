import React, { FC } from "react";

import {
	FooterNavigation,
	type FooterNavigationLink
} from "@widgets/navigation/ui/footer-navigation/ui";
import { Newsletter } from "@widgets/newsletter/ui";

import { FooterLogotype } from "./footer-logotype";

type FooterNavigationLinksGroups = "Pages" | "Support" | "Social Media";

const footerNavigationLinks = new Map<FooterNavigationLinksGroups, Array<FooterNavigationLink>>([
	[
		"Pages",
		[
			{ name: "About Us", href: "#" },
			{ name: "Categories", href: "#" },
			{ name: "Catalogue", href: "#" },
			{ name: "Testimonials", href: "#" },
			{ name: "Articles & Blogs", href: "#" }
		]
	],
	[
		"Support",
		[
			{ name: "FAQs", href: "#" },
			{ name: "Product", href: "#" },
			{ name: "Contact", href: "#" },
			{ name: "Privacy Policy", href: "#" },
			{ name: "Terms & Conditions", href: "#" }
		]
	],
	[
		"Social Media",
		[
			{ name: "Linkedin", href: "#" },
			{ name: "Twitter", href: "#" },
			{ name: "Instagram", href: "#" },
			{ name: "Facebook", href: "#" },
			{ name: "Pinterest", href: "#" }
		]
	]
]);

export const Footer: FC = () => {
	return (
		<footer className="relative bg-shark-950 z-[20]">
			<div className="mr-[16rem] ml-[16rem] tablet:mr-[48rem] tablet:ml-[48rem] pt-[80rem] desktop:ml-[unset] desktop:mr-[unset] desktop:flex desktop:flex-col">
				<div className="flex flex-col tablet:flex-row tablet:mx-[auto] tablet:justify-between tablet:max-w-[unset] desktop:max-w-[1248rem] tablet:items-start tablet:mb-[48rem]">
					<Newsletter />
					<FooterNavigation>
						{Array.from(footerNavigationLinks.entries()).map(
							([groupName, groupLinks]) => (
								<FooterNavigation.NavigationLinksGroup
									key={groupName}
									name={groupName}
								>
									<FooterNavigation.NavigationLinksList>
										{groupLinks.map(({ name, href }) => (
											<FooterNavigation.NavigationLink key={name} href={href}>
												{name}
											</FooterNavigation.NavigationLink>
										))}
									</FooterNavigation.NavigationLinksList>
								</FooterNavigation.NavigationLinksGroup>
							)
						)}
					</FooterNavigation>
				</div>
				<FooterLogotype />
			</div>
		</footer>
	);
};
