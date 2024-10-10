import { FC, JSX, useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Link from "next/link";

type NavigationLink = {
	name: string;
	href: string;
	icon?: JSX.Element;
};

const primaryNavigationLinks: Array<NavigationLink> = [
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

export const PrimaryNavigation: FC = () => {
	const [activeLink, setActiveLink] = useState(primaryNavigationLinks[0].name);

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
				const { offsetLeft, offsetWidth } = activeLinkElement;

				const clipLeft = offsetLeft;
				const clipRight = offsetLeft + offsetWidth;

				animationControls.start({
					transition: {
						duration: animationDuration,
						type: "spring",
						bounce: 0
					},
					clipPath: `inset(0% ${Number(100 - (clipRight / container.offsetWidth) * 100).toFixed()}% 0% ${Number((clipLeft / container.offsetWidth) * 100).toFixed()}% round 17px)`
				});
			}
		},
		[]
	);

	const renderPrimaryNavigationLinks = useCallback(() => {
		return primaryNavigationLinks.map(({ name, href, icon = null }, index) => (
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

	const renderPrimaryNavigationLinksForClipPathContainer = useCallback(() => {
		return primaryNavigationLinks.map(({ name, href, icon = null }, index) => (
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

	return (
		<nav className="relative flex flex-col items-center w-fit">
			<ul className="relative flex w-full justify-center">{renderPrimaryNavigationLinks()}</ul>
			<motion.div
				animate={animationControls}
				aria-hidden
				className="absolute z-[10] w-full overflow-hidden"
				ref={containerRef}
				style={{
					clipPath: "inset(0% 100%)"
				}}
			>
				<ul className="relative flex w-full justify-center bg-alizarin-crimson-600">
					{renderPrimaryNavigationLinksForClipPathContainer()}
				</ul>
			</motion.div>
		</nav>
	);
};
