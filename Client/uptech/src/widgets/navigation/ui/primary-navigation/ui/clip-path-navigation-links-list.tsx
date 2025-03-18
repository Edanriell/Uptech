import { Children, type FC, isValidElement, type ReactElement, useRef } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

import { useClipPathNavigationLinksList, usePrimaryNavigationStore } from "../lib/hooks";

import { ClipPathNavigationLink } from "./clip-path-navigation-link";

type ClipPathNavigationLinksListProps = {
	children: ReactElement<typeof ClipPathNavigationLink>[];
};

export const ClipPathNavigationLinksList: FC<ClipPathNavigationLinksListProps> = ({ children }) => {
	const { orientationRef, globalClassesRef, activeLink, activeLinkElementRef } =
		usePrimaryNavigationStore();

	const containerRef = useRef(null);

	const { animationControls } = useClipPathNavigationLinksList(
		containerRef,
		activeLink,
		activeLinkElementRef,
		orientationRef.current!
	);

	Children.forEach(children, (child) => {
		if (!(isValidElement(child) && child.type === ClipPathNavigationLink)) {
			const childType =
				isValidElement(child) && child.type ? child.type.toString() : typeof child;

			throw new Error(
				`<ClipPathNavigationLinksList> only accepts children of type <ClipPathNavigationLink>. ` +
					`Received an invalid child of type "${childType}". ` +
					`Please ensure that all children passed to <ClipPathNavigationLinksList> are valid <ClipPathNavigationLink> components.`
			);
		}
	});

	const clipPathNavigationLinksListClasses = clsx(
		"relative flex w-full justify-center bg-alizarin-crimson-600" + globalClassesRef!.current,
		{
			"flex-col": orientationRef!.current === "vertical",
			"flex-row": orientationRef!.current === "horizontal"
		}
	);

	return (
		<motion.div
			animate={animationControls}
			aria-hidden
			ref={containerRef}
			className="absolute z-10 w-full overflow-hidden"
			style={{
				clipPath: "inset(0% 100%)"
			}}
		>
			<ul className={clipPathNavigationLinksListClasses}>{children}</ul>
		</motion.div>
	);
};
