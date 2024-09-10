import { ComponentPropsWithoutRef, FC, useContext } from "react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import Link from "next/link";

import { HeaderContext } from "@widgets/header/ui";

import { Icon } from "@shared/ui/icon/ui";

type PrimaryMobileNavigationProps = {
	classes?: string;
} & ComponentPropsWithoutRef<"nav"> &
	MotionProps;

const primaryNavigationInitialAnimations = { opacity: 0, y: 10, scale: 0.975, filter: "blur(4px)" };

const primaryNavigationEntryAnimations = {
	opacity: 1,
	y: 0,
	scale: 1,
	filter: "blur(0px)",
	transition: { delay: 0 }
};

const primaryNavigationExitAnimations = {
	opacity: 0,
	y: 10,
	scale: 0.975,
	filter: "blur(4px)",
	transition: { delay: 0.3 }
};

const secondaryNavigationInitialAnimations = {
	opacity: 0,
	y: 10,
	scale: 0.975,
	filter: "blur(4px)"
};

const secondaryNavigationEntryAnimations = {
	opacity: 1,
	y: 0,
	scale: 1,
	filter: "blur(0px)",
	transition: { delay: 0.3 }
};

const secondaryNavigationExitAnimations = {
	opacity: 0,
	y: 10,
	scale: 0.975,
	filter: "blur(4px)",
	transition: { delay: 0 }
};

export const MobileNavigation: FC<PrimaryMobileNavigationProps> = ({ classes }) => {
	const { mobileNavigationState, toggleCart, toggleUserProfile } = useContext(HeaderContext);

	const primaryMobileNavigationLinks = [
		{
			name: "Home",
			href: "#"
		},
		{
			name: "Catalogue",
			href: "#"
		},
		{
			name: "Collections",
			href: "#"
		},
		{
			name: "Popular",
			href: "#"
		},
		{
			name: "Contacts",
			href: "#"
		}
	];

	const secondaryMobileNavigationLinks = [
		{
			name: "Profile",
			action: toggleUserProfile,
			Icon: () => <Icon type="profile" />
		},
		{
			name: "Cart",
			action: toggleCart,
			Icon: () => <Icon type="cart" count={1} />
		}
	];

	const renderPrimaryMobileNavigationLinks = () => {
		return primaryMobileNavigationLinks.map(({ name, href }, index) => (
			<li key={index + "-" + name.toLowerCase()}>
				<Link className="uppercase p-[10rem] text-white-50 text-[14rem]" href={href}>
					{name}
				</Link>
			</li>
		));
	};

	const renderSecondaryMobileNavigationLinks = () => {
		return secondaryMobileNavigationLinks.map(({ name, action, Icon }, index) => (
			<li key={index + "-" + name.toLowerCase()}>
				<button onClick={action} type={"button"}>
					<span className="sr-only">{name}</span>
					<Icon />
				</button>
			</li>
		));
	};

	return (
		<AnimatePresence>
			{mobileNavigationState === "opened" && (
				<motion.nav
					initial={primaryNavigationInitialAnimations}
					animate={primaryNavigationEntryAnimations}
					exit={primaryNavigationExitAnimations}
					className={
						classes + " m-[16rem] flex flex-row gap-x-[16rem] w-fill-firefox w-fill-chrome"
					}
				>
					<ul className="pt-[18rem] pr-[16rem] pb-[18rem] pl-[16rem] rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] flex flex-col items-start gap-y-[4rem] flex-[1]">
						{renderPrimaryMobileNavigationLinks()}
					</ul>
					<motion.div
						initial={secondaryNavigationInitialAnimations}
						animate={secondaryNavigationEntryAnimations}
						exit={secondaryNavigationExitAnimations}
						className={
							"rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] pt-[18rem] pr-[16rem] pb-[18rem] pl-[16rem] flex-[0]"
						}
					>
						<ul className="flex flex-col items-center gap-y-[16rem] h-full justify-center">
							{renderSecondaryMobileNavigationLinks()}
						</ul>
					</motion.div>
				</motion.nav>
			)}
		</AnimatePresence>
	);
};
