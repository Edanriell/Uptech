"use client";

import {
	ComponentPropsWithoutRef,
	FC,
	JSX,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState
} from "react";
import { AnimatePresence, motion, MotionProps, useAnimationControls } from "framer-motion";
import Link from "next/link";

import { HeaderContext } from "@widgets/header/model";

import { Icon } from "@shared/ui/icon/ui";
import { useWindowSize } from "@shared/lib/hooks";

type PrimaryMobileNavigationProps = {
	classes?: string;
} & ComponentPropsWithoutRef<"nav"> &
	MotionProps;

type PrimaryMobileNavigationLink = {
	name: string;
	href: string;
	icon?: JSX.Element;
};

const primaryMobileNavigationLinks: Array<PrimaryMobileNavigationLink> = [
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

export const MobileNavigation: FC<PrimaryMobileNavigationProps> = ({ classes }) => {
	const { mobileNavigationState, toggleCart, toggleUserProfile, toggleSearch } =
		useContext(HeaderContext);
	const [activeLink, setActiveLink] = useState(primaryMobileNavigationLinks[0].name);

	const { width } = useWindowSize();

	const containerRef = useRef<HTMLDivElement | null>(null);
	const activeLinkElementRef = useRef<HTMLAnchorElement | null>(null);

	const animationControls = useAnimationControls();

	useEffect(() => {
		const container = containerRef.current;

		if (container) {
			const activeLinkElement = activeLinkElementRef.current;

			calculateClipPath({ animationDuration: 0, container, activeLinkElement });
		}
	});

	useEffect(() => {
		const container = containerRef.current;

		if (activeLink && container) {
			const activeLinkElement = activeLinkElementRef.current;

			calculateClipPath({ animationDuration: 0.5, container, activeLinkElement });
		}
	}, [activeLink, activeLinkElementRef, containerRef]);

	const calculateClipPath = useCallback(
		({
			animationDuration,
			container,
			activeLinkElement
		}: {
			animationDuration: number;
			container: HTMLDivElement;
			activeLinkElement: HTMLAnchorElement | null;
		}) => {
			if (activeLinkElement) {
				const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = activeLinkElement;

				const clipLeft = offsetLeft;
				const clipRight = offsetLeft + offsetWidth;

				const clipTop = offsetTop;
				const clipBottom = offsetTop + offsetHeight;

				animationControls.start({
					transition: {
						duration: animationDuration,
						type: "spring",
						bounce: 0
					},
					clipPath: `inset(${clipTop}px ${Number(100 - (clipRight / container.offsetWidth) * 100).toFixed()}% ${container.offsetHeight - clipBottom}px ${Number((clipLeft / container.offsetWidth) * 100).toFixed()}% round 17px)`
				});
			}
		},
		[]
	);

	const secondaryMobileNavigationLinks = [
		{
			name: "Search",
			handleLinkClick: toggleSearch,
			Icon: () => <Icon type="search" />
		},
		{
			name: "Profile",
			handleLinkClick: toggleUserProfile,
			Icon: () => <Icon type="profile" />
		},
		{
			name: "Cart",
			handleLinkClick: toggleCart,
			Icon: () => <Icon type="cart" count={1} />
		}
	];

	const renderPrimaryMobileNavigationLinks = useCallback(() => {
		return primaryMobileNavigationLinks.map(({ name, href, icon = null }, index) => (
			<li key={index + "-" + name.toLowerCase()}>
				<Link
					ref={activeLink === name ? activeLinkElementRef : null}
					data-link={name}
					onClick={() => {
						setActiveLink(name);
					}}
					className="flex items-center gap-[8rem] rounded-full text-[14rem] font-medium leading-[100%] uppercase text-shark-950 px-[16rem] py-[10rem]"
					href={href}
					scroll={false}
				>
					{icon}
					{name}
				</Link>
			</li>
		));
	}, [activeLink]);

	const renderPrimaryMobileNavigationLinksForClipPathContainer = useCallback(() => {
		return primaryMobileNavigationLinks.map(({ name, href, icon = null }, index) => (
			<li key={index + "-" + name.toLowerCase()}>
				<Link
					data-tab={name}
					onClick={() => {
						setActiveLink(name);
					}}
					className="flex items-center gap-[8rem] rounded-full text-[14rem] font-medium leading-[100%] uppercase text-white-50 px-[16rem] py-[10rem]"
					tabIndex={-1}
					href={href}
					scroll={false}
				>
					{icon}
					{name}
				</Link>
			</li>
		));
	}, [activeLink]);

	const renderSecondaryMobileNavigationLinks = useCallback(() => {
		return secondaryMobileNavigationLinks.map(({ name, handleLinkClick, Icon }, index) => (
			<li key={index + "-" + name.toLowerCase()}>
				<motion.button
					whileHover={{
						scale: 1.15,
						transition: {
							type: "spring",
							bounce: 0,
							duration: 0.2
						}
					}}
					whileTap={{
						scale: 0.85,
						transition: {
							type: "spring",
							bounce: 0,
							duration: 0.15
						}
					}}
					onClick={handleLinkClick}
					type={"button"}
				>
					<span className="sr-only">{name}</span>
					<Icon />
				</motion.button>
			</li>
		));
	}, []);

	return (
		<AnimatePresence>
			{width < 990 && mobileNavigationState === "opened" && (
				<motion.nav
					initial={{
						opacity: 0,
						y: 10,
						scale: 0.975,
						filter: "blur(4px)"
					}}
					animate={{
						opacity: 1,
						y: 0,
						scale: 1,
						filter: "blur(0px)",
						transition: {
							delay: 0,
							type: "spring",
							bounce: 0,
							duration: 0.5
						}
					}}
					exit={{
						opacity: 0,
						y: 10,
						scale: 0.975,
						filter: "blur(4px)",
						transition: {
							delay: 0.3,
							type: "spring",
							bounce: 0,
							duration: 0.45
						}
					}}
					className={
						classes + " m-[16rem] flex flex-row gap-x-[16rem] w-fill-firefox w-fill-chrome"
					}
				>
					<ul className="pt-[18rem] pr-[16rem] pb-[18rem] pl-[16rem] rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] flex flex-col items-start flex-[1]">
						{renderPrimaryMobileNavigationLinks()}
					</ul>
					<motion.div
						animate={animationControls}
						aria-hidden
						className="absolute z-[10] w-fill-firefox w-fill-chrome overflow-hidden"
						ref={containerRef}
						style={{
							clipPath: "inset(0% 100%)"
						}}
					>
						<ul className="pt-[18rem] pr-[16rem] pb-[18rem] pl-[16rem] rounded-[8rem] bg-alizarin-crimson-600 flex flex-col items-start flex-[1]">
							{renderPrimaryMobileNavigationLinksForClipPathContainer()}
						</ul>
					</motion.div>
					<motion.div
						initial={{
							opacity: 0,
							y: 10,
							scale: 0.975,
							filter: "blur(4px)"
						}}
						animate={{
							opacity: 1,
							y: 0,
							scale: 1,
							filter: "blur(0px)",
							transition: {
								delay: 0.15,
								type: "spring",
								bounce: 0,
								duration: 0.5
							}
						}}
						exit={{
							opacity: 0,
							y: 10,
							scale: 0.975,
							filter: "blur(4px)",
							transition: {
								delay: 0.15,
								type: "spring",
								bounce: 0,
								duration: 0.45
							}
						}}
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
