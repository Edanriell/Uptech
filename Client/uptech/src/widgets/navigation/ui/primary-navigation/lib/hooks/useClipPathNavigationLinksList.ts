import { type RefObject, useEffect } from "react";
import { useAnimationControls } from "motion/react";

import { calculateClipPath } from "../functions";

export const useClipPathNavigationLinksList = (
	containerRef: RefObject<HTMLDivElement | null>,
	activeLink: string,
	activeLinkElementRef: RefObject<HTMLAnchorElement | null>,
	orientation: "horizontal" | "vertical"
) => {
	const animationControls = useAnimationControls();

	useEffect(() => {
		const container = containerRef?.current;
		if (activeLink && container) {
			const activeLinkElement = activeLinkElementRef.current;

			const animationConfig = calculateClipPath({
				animationDuration: 0.5,
				container,
				activeLinkElement,
				orientation
			});
			animationControls.start(animationConfig);
		}
	}, [activeLink, containerRef, activeLinkElementRef, orientation]);

	return { animationControls };
};
