"use client";

import { FC, Fragment, useContext, useEffect, useRef, useState } from "react";
import { Logotype } from "@shared/ui/logotype/ui";
import { MobileNavigationTrigger } from "@widgets/mobile-navigation/ui";
import { PrimaryNavigation, SecondaryNavigation } from "@widgets/navigation/ui";
import { motion, useAnimationControls, useMotionValueEvent, useScroll } from "framer-motion";
import { useWindowSize } from "@shared/lib/hooks";
import { HeaderContext } from "@widgets/header/model";

const headerAnimationVariants = {
	visible: { opacity: 1, y: 0, top: 0, filter: "blur(0px)" },
	hidden: {
		opacity: 0,
		y: 0,
		top: -80,
		filter: "blur(4px)"
	},
	"hidden-secondary": {
		opacity: 0,
		y: 10,
		scale: 0.975,
		filter: "blur(4px)",
		transition: { delay: 0.45 }
	},
	// Scale is not correctly applying in visible or hidden variant
	// This is Framer Motion bug, so we are forced use a reset with delay
	"hidden-secondary-reset": {
		scale: 1,
		transition: { delay: 0.15 }
	}
};

const headerTransitionOptions = {
	duration: 0.25,
	type: "spring",
	damping: 15,
	stiffness: 300,
	restDelta: 0.5
};

const DynamicHeader: FC = () => {
	const [headerState, setHeaderState] = useState<"visible" | "hidden">("hidden");
	// State for header is necessary, because if we don't use it
	// Animations (animation.start("visible") and animation.start("hidden"))
	// Will run more than once, which will lead to performance issues eventually
	// Hovever because we are using Framer Motion same animations will be applied

	const [visibleAnimationVariantCount, setVisibleAnimationVariantCount] = useState<number>(0);
	// To be able to skip first visible animation on scroll down when screen size is >= 990 we need to count it
	// When visible animation is triggering second time we will display it
	// When we are at top of the page we reset counter to 0 and start counting again
	// There is no other way around it because we are using delta

	const { mobileNavigationState, toggleMobileNavigation } = useContext(HeaderContext);

	const { width } = useWindowSize();
	const { scrollY } = useScroll();

	const animationControls = useAnimationControls();

	const delta = useRef(0);
	const lastScrollY = useRef(0);

	const handleScroll = (latest: number) => {
		if (width >= 990 && latest <= 300) {
			if (mobileNavigationState === "opened") {
				(async () => {
					await animationControls.start("hidden-secondary");
					await animationControls.start("hidden-secondary-reset");
				})();
				toggleMobileNavigation();
			} else {
				animationControls.start("hidden");
			}
			setVisibleAnimationVariantCount(0);
			return;
		}

		if (mobileNavigationState === "opened") return;

		const diff = Math.abs(latest - lastScrollY.current);
		if (latest >= lastScrollY.current) {
			delta.current = delta.current >= 10 ? 10 : delta.current + diff;
		} else {
			delta.current = delta.current <= -10 ? -10 : delta.current - diff;
		}

		if (delta.current >= 10 && latest > 200) {
			if (headerState === "visible") {
				animationControls.start("hidden");
			}
			if (width >= 990) {
				setVisibleAnimationVariantCount((prev) => prev + 1);
			}
			setHeaderState("hidden");
		} else if (delta.current <= -10 || latest < 200) {
			if (headerState === "hidden") {
				if (width >= 990 && visibleAnimationVariantCount <= 50) {
					setVisibleAnimationVariantCount((prev) => prev + 1);
					return;
				} else {
					animationControls.start("visible");
					if (width >= 990) {
						setVisibleAnimationVariantCount((prev) => prev + 1);
					}
					setHeaderState("visible");
				}
			}
		}
		lastScrollY.current = latest;
	};

	useMotionValueEvent(scrollY, "change", (latest) => handleScroll(latest));

	useEffect(() => {
		if (width < 990) {
			setHeaderState("visible");
		} else {
			setHeaderState("hidden");
		}
	}, [width]);

	return (
		<motion.header
			initial={width < 990 ? "visible" : "hidden"}
			animate={animationControls}
			variants={headerAnimationVariants}
			transition={headerTransitionOptions}
			className="pt-[18rem] pr-[24rem] pb-[18rem] pl-[16rem] flex flex-row items-center rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] m-[16rem] fixed top-0 left-0 w-fill-chrome w-fill-firefox max-h-[64rem] justify-between tablet:pl-[32rem] tablet:pr-[32rem] tablet:pt-[24rem] tablet:pb-[24rem] tablet:ml-[24rem] tablet:mr-[24rem] tablet:mt-[24rem] tablet:mb-[24rem] tablet:max-h-[80rem]"
		>
			<Logotype colorScheme={"light"} size={"small"} />
			{width < 990 && (
				<MobileNavigationTrigger classes="absolute right-[24rem] top-[50%] translate-y-[-50%]" />
			)}
			{width >= 990 && (
				<Fragment>
					<PrimaryNavigation />
					<SecondaryNavigation />
				</Fragment>
			)}
		</motion.header>
	);
};

export default DynamicHeader;
