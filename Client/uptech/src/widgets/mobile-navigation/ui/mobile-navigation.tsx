import { type ComponentPropsWithoutRef, type FC } from "react";
import { motion, type MotionProps, type Variants } from "motion/react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";

import { Drawer } from "@widgets/drawer/ui";
import {
	PrimaryNavigation,
	type PrimaryNavigationLink
} from "@widgets/navigation/ui/primary-navigation/ui";
import {
	SecondaryNavigation,
	SecondaryNavigationLink
} from "@widgets/navigation/ui/secondary-navigation/ui";

import { Icon } from "@shared/ui/icon/ui";

import { useMobileNavigation } from "../lib/hooks";

import { MobileNavigationTrigger } from "./mobile-navigation-trigger";

type MobileNavigationComponents = {
	Trigger: typeof MobileNavigationTrigger;
};

type MobileNavigationProps = {
	className?: string;
} & ComponentPropsWithoutRef<"nav"> &
	MotionProps;

type MobileNavigation = FC<MobileNavigationProps> & MobileNavigationComponents;

type MobileNavigationPrimaryNavigationLinkNames =
	| "home"
	| "catalogue"
	| "collections"
	| "popular"
	| "contacts";

type MobileNavigationSecondaryNavigationLinkNames = "search" | "profile" | "cart";

const mobileNavigationPrimaryNavigationLinks = new Map<
	MobileNavigationPrimaryNavigationLinkNames,
	PrimaryNavigationLink
>([
	["home", { id: uuidv4(), name: "Home", href: "#" }],
	["catalogue", { id: uuidv4(), name: "Catalogue", href: "#" }],
	["collections", { id: uuidv4(), name: "Collections", href: "#" }],
	["popular", { id: uuidv4(), name: "Popular", href: "#" }],
	["contacts", { id: uuidv4(), name: "Contacts", href: "#" }]
]);

const mobileNavigationSecondaryNavigationLinks = new Map<
	MobileNavigationSecondaryNavigationLinkNames,
	SecondaryNavigationLink
>([
	[
		"search",
		{
			name: "Search",
			Icon: () => <Icon type="search" />,
			contentId: "1x"
		}
	],
	[
		"profile",
		{
			name: "Profile",
			Icon: () => <Icon type="profile" />,
			contentId: "2x"
		}
	],
	[
		"cart",
		{
			name: "Cart",
			Icon: () => <Icon type="cart" productCount={0} />,
			contentId: "3x"
		}
	]
]);

const mobileNavigationAnimationVariants: Variants = {
	initial: {
		visibility: "hidden",
		filter: "blur(5rem)",
		opacity: 0,
		y: 20
	},
	visible: {
		visibility: "visible",
		filter: "blur(0rem)",
		opacity: 1,
		y: 0,
		transition: {
			delay: 0,
			type: "spring",
			bounce: 0.25,
			duration: 0.45
		}
	},
	hidden: {
		visibility: "hidden",
		filter: "blur(5rem)",
		opacity: 0,
		y: 20,
		transition: {
			delay: 0.25,
			type: "spring",
			bounce: 0,
			duration: 0.4
		}
	}
};

const mobileNavigationAnimationVariants2: Variants = {
	initial: {
		visibility: "hidden",
		filter: "blur(5rem)",
		opacity: 0,
		x: 20
	},
	visible: {
		visibility: "visible",
		filter: "blur(0rem)",
		opacity: 1,
		x: 0,
		transition: {
			delay: 0.25,
			type: "spring",
			bounce: 0.25,
			duration: 0.45
		}
	},
	hidden: {
		visibility: "hidden",
		filter: "blur(5rem)",
		opacity: 0,
		x: 20,
		transition: {
			delay: 0,
			type: "spring",
			bounce: 0,
			duration: 0.4
		}
	}
};

export const MobileNavigation: MobileNavigation = ({ className }) => {
	const { mobileNavigationState, mobileNavigationRef } = useMobileNavigation();

	const mobileNavigationClasses = clsx(
		"m-[16rem] flex flex-row gap-x-[16rem] w-fill-firefox w-fill-chrome",
		{
			[className!]: className
		}
	);

	return (
		<div ref={mobileNavigationRef} className={mobileNavigationClasses}>
			<motion.div
				initial="initial"
				animate={mobileNavigationState === "opened" ? "visible" : "hidden"}
				variants={mobileNavigationAnimationVariants}
				onAnimationStart={() => {
					if (mobileNavigationState === "opened")
						mobileNavigationRef.current?.classList.add("z-30");
				}}
				onAnimationComplete={() => {
					if (mobileNavigationState === "closed")
						mobileNavigationRef.current?.classList.remove("z-30");
				}}
				className="shadow-soft pt-[18rem] pr-[16rem] pb-[18rem] pl-[16rem] rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] flex flex-col items-start flex-1"
			>
				<PrimaryNavigation orientation="vertical">
					<PrimaryNavigation.NavigationLinksList>
						{Array.from(mobileNavigationPrimaryNavigationLinks.values()).map(
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
			</motion.div>
			<motion.div
				initial="initial"
				animate={mobileNavigationState === "opened" ? "visible" : "hidden"}
				variants={mobileNavigationAnimationVariants2}
				className="shadow-soft rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] pt-[18rem] pr-[16rem] pb-[18rem] pl-[16rem] flex-0"
			>
				<Drawer.Trigger>
					<SecondaryNavigation
						className="flex flex-col items-center justify-center tablet:hidden"
						orientation="vertical"
					>
						<SecondaryNavigation.NavigationLinksList>
							{Array.from(mobileNavigationSecondaryNavigationLinks.values()).map(
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
			</motion.div>
		</div>
	);
};

MobileNavigation.Trigger = MobileNavigationTrigger;
