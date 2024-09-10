"use client";

import { createContext, FC, Fragment, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useMotionValueEvent, useScroll } from "framer-motion";

import { ProductsSearch } from "@features/products-search/ui";

import { MobileNavigation, MobileNavigationTrigger } from "@widgets/mobile-navigation/ui";

import { Logotype } from "@shared/ui/logotype/ui";
import { useWindowSize } from "@shared/lib/hooks";
import { PrimaryNavigation, SecondaryNavigation } from "@widgets/navigation/ui";

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

export const HeaderContext = createContext({
	mobileNavigationState: "closed",
	searchState: "closed",
	userProfileState: "closed",
	cartState: "closed",
	toggleMobileNavigation: () => {},
	toggleSearch: () => {},
	toggleUserProfile: () => {},
	toggleCart: () => {}
});

export const Header: FC = () => {
	const [mobileNavigationState, setMobileNavigationState] = useState<"opened" | "closed">("closed");
	const [searchState, setSearchState] = useState<"opened" | "closed">("closed");
	const [userProfileState, setUserProfileState] = useState<"opened" | "closed">("closed");
	const [cartState, setCartState] = useState<"opened" | "closed">("closed");

	const { width } = useWindowSize();
	const { scrollY } = useScroll();
	// State for header is necessary, because if we don't use it
	// Animations (animation.start("visible") and animation.start("hidden"))
	// Will run more than once, which will lead to performance issues eventually
	// Hovever because we are using Framer Motion same applied animations will be not displayed
	const [headerState, setHeaderState] = useState<"visible" | "hidden">("hidden");
	// To be able to skip first visible animation on scroll down when screen size is >= 768 we need to count it
	// When visible animation is triggering second time we will display it
	// When we are at top of the page we reset counter to 0 and start counting again
	// There is no other way around it because we are using delta
	const [visibleAnimationVariantCount, setVisibleAnimationVariantCount] = useState<number>(0);

	const animationControls = useAnimationControls();

	const delta = useRef(0);
	const lastScrollY = useRef(0);

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (width >= 990 && latest <= 300) {
			if (mobileNavigationState === "opened") {
				(async () => {
					await animationControls.start("hidden-secondary");
					await animationControls.start("hidden-secondary-reset");
				})();
				setMobileNavigationState("closed");
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

		// console.log(`diff: ${diff}`);
		// console.log(`latest: ${latest}`);
		// console.log(`delta: ${delta.current}`);
		// console.log(`lastScrollY: ${lastScrollY.current}`);

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
	});

	useEffect(() => {
		console.log(width);
		if (width < 990) {
			setHeaderState("visible");
		} else {
			setHeaderState("hidden");
		}
	}, [width]);

	const toggleMobileNavigation = () => {
		mobileNavigationState === "closed"
			? setMobileNavigationState("opened")
			: setMobileNavigationState("closed");
	};

	const toggleSearch = () => {
		searchState === "closed" ? setSearchState("opened") : setSearchState("closed");
	};

	const toggleUserProfile = () => {
		userProfileState === "closed" ? setUserProfileState("opened") : setUserProfileState("closed");
	};

	const toggleCart = () => {
		cartState === "closed" ? setCartState("opened") : setCartState("closed");
	};

	return (
		<HeaderContext.Provider
			value={{
				mobileNavigationState,
				searchState,
				userProfileState,
				cartState,
				toggleMobileNavigation,
				toggleSearch,
				toggleUserProfile,
				toggleCart
			}}
		>
			{width >= 990 && (
				<header className="pl-[32rem] pr-[32rem] mt-[24rem] mb-[24rem] flex flex-row items-center justify-between max-h-[80rem]">
					<Logotype colorScheme={"dark"} size={"medium"} />
					<PrimaryNavigation />
					<SecondaryNavigation />
				</header>
			)}
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
			{width < 990 && <MobileNavigation classes="fixed top-[80rem] left-0" />}
			<ProductsSearch searchState={searchState} mobileNavigationState={mobileNavigationState} />
		</HeaderContext.Provider>
	);
};

// TODO
// 0) Adjust all break points
// 1) Rethink setMaxProducts and grid layout
