import React, { type FC } from "react";
import { motion, type Variants } from "motion/react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

import { Drawer } from "@widgets/drawer/ui";
import {
	PrimaryNavigation,
	type PrimaryNavigationLink
} from "@widgets/navigation/ui/primary-navigation/ui";
import {
	SecondaryNavigation,
	type SecondaryNavigationLink
} from "@widgets/navigation/ui/secondary-navigation/ui";
import { MobileNavigation } from "@widgets/mobile-navigation/ui";

import { Logotype } from "@shared/ui/logotype/ui";
import { Icon } from "@shared/ui/icon/ui";

import { useStickyHeader } from "../lib/hooks";

type StickyHeaderPrimaryNavigationLinkNames =
	| "home"
	| "catalogue"
	| "collections"
	| "popular"
	| "contacts";

type StickyHeaderSecondaryNavigationLinkNames = "search" | "profile" | "cart";

const stickyHeaderPrimaryNavigationLinks = new Map<
	StickyHeaderPrimaryNavigationLinkNames,
	PrimaryNavigationLink
>([
	["home", { id: uuidv4(), name: "Home", href: "#" }],
	["catalogue", { id: uuidv4(), name: "Catalogue", href: "#" }],
	["collections", { id: uuidv4(), name: "Collections", href: "#" }],
	["popular", { id: uuidv4(), name: "Popular", href: "#" }],
	["contacts", { id: uuidv4(), name: "Contacts", href: "#" }]
]);

const stickyHeaderSecondaryNavigationLinks = new Map<
	StickyHeaderSecondaryNavigationLinkNames,
	SecondaryNavigationLink
>([
	[
		"search",
		{
			name: "Search",
			Icon: () => <Icon type="search" />,
			contentId: "search"
		}
	],
	[
		"profile",
		{
			name: "Profile",
			Icon: () => <Icon type="profile" />,
			contentId: "profile"
		}
	],
	[
		"cart",
		{
			name: "Cart",
			Icon: () => <Icon type="cart" productCount={0} />,
			contentId: "cart"
		}
	]
]);

const stickyHeaderAnimationVariants: Variants = {
	visible: {
		opacity: 1,
		y: 0,
		top: 0,
		filter: "blur(0rem)",
		transition: { type: "spring", duration: 0.5, bounce: 0 }
	},
	hidden: {
		visibility: "visible",
		opacity: 0,
		y: 0,
		top: -80,
		filter: "blur(3.8rem)",
		transition: { type: "spring", duration: 0.25, bounce: 0 }
	}
};

export const HeaderSticky: FC = () => {
	const { animationControls } = useStickyHeader();

	// TODO
	// When Home page will be complete play with paddings
	// See what fits best
	// tablet:pl-[32rem] tablet:pr-[32rem] tablet:pt-[24rem] tablet:pb-[24rem] tablet:ml-[24rem] tablet:mr-[24rem] tablet:mt-[24rem] tablet:mb-[24rem]

	return (
		<motion.header
			animate={animationControls}
			variants={stickyHeaderAnimationVariants}
			className="shadow-soft pt-[18rem] pr-[24rem] pb-[18rem] pl-[16rem] flex flex-row items-center rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] m-[16rem] fixed top-0 left-0 w-[-webkit-fill-available] w-[-moz-available] max-h-[64rem] justify-between tablet:max-h-[80rem] tablet:invisible z-30"
			role="banner"
			aria-label="Sticky header"
		>
			<Link href="/">
				<Logotype size="small" color="light" />
			</Link>
			<PrimaryNavigation orientation="horizontal">
				<PrimaryNavigation.NavigationLinksList>
					{Array.from(stickyHeaderPrimaryNavigationLinks.values()).map(
						({ id, name, href }) => (
							<PrimaryNavigation.NavigationLink
								key={id}
								name={name}
								href={href}
								id={id}
							/>
						)
					)}
				</PrimaryNavigation.NavigationLinksList>
			</PrimaryNavigation>
			<Drawer.Trigger>
				<SecondaryNavigation className="hidden tablet:flex" orientation="horizontal">
					<SecondaryNavigation.NavigationLinksList>
						{Array.from(stickyHeaderSecondaryNavigationLinks.values()).map(
							({ name, Icon, contentId }, index) => (
								<SecondaryNavigation.NavigationLink
									key={index}
									name={name}
									Icon={Icon}
									data-content-id={contentId}
								/>
							)
						)}
					</SecondaryNavigation.NavigationLinksList>
				</SecondaryNavigation>
			</Drawer.Trigger>
			<MobileNavigation.Trigger className="absolute right-[24rem] top-[50%] translate-y-[-50%] tablet:right-[32rem]" />
		</motion.header>
	);
};
