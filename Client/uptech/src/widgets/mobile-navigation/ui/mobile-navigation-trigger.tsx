import { type ComponentPropsWithoutRef, type FC } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

import { useMobileNavigationTrigger } from "../lib/hooks";

type MobileNavigationTriggerProps = {
	className?: string;
} & ComponentPropsWithoutRef<"button">;

const mobileNavigationTriggerBarAnimationVariants = {
	opened: {
		bar1: {
			top: "50%",
			y: "-50%",
			rotate: 135,
			transition: { type: "spring", bounce: 0, duration: 0.5 }
		},
		bar2: {
			opacity: 0,
			top: "50%",
			y: "-50%",
			x: -20,
			transition: { type: "spring", bounce: 0, duration: 0.5 }
		},
		bar3: {
			bottom: "50%",
			y: "50%",
			rotate: -135,
			transition: { type: "spring", bounce: 0, duration: 0.5 }
		}
	},
	closed: {
		bar1: {
			top: "0%",
			y: 0,
			rotate: 0,
			transition: { type: "spring", bounce: 0, duration: 0.5 }
		},
		bar2: {
			opacity: 1,
			top: "50%",
			y: "-50%",
			x: 0,
			transition: { type: "spring", bounce: 0, duration: 0.5 }
		},
		bar3: {
			bottom: "0%",
			y: "-50%",
			rotate: 0,
			transition: { type: "spring", bounce: 0, duration: 0.5 }
		}
	}
};

export const MobileNavigationTrigger: FC<MobileNavigationTriggerProps> = ({
	className,
	...restProps
}) => {
	const { mobileNavigationState, toggleMobileNavigation } = useMobileNavigationTrigger();

	const buttonClasses = clsx(
		"rounded-[8rem] p-[8rem] w-[40rem] h-[40rem] flex items-center justify-center overflow-auto tablet:hidden cursor-pointer",
		className
	);

	const barClasses = {
		bar1: "absolute w-full h-[1.9rem] top-0 left-0 bg-white-50 rounded-full",
		bar2: "absolute w-full h-[1.9rem] top-[50%] translate-y-[-50%] left-0 bg-white-50 rounded-full",
		bar3: "absolute w-full h-[1.9rem] bottom-0 translate-y-[-50%] left-0 bg-white-50 rounded-full"
	};

	const renderMotionBar = (
		variantKey: keyof (typeof mobileNavigationTriggerBarAnimationVariants)[keyof typeof mobileNavigationTriggerBarAnimationVariants]
	) => (
		<motion.div
			animate={mobileNavigationState === "opened" ? "opened" : "closed"}
			variants={{
				opened: mobileNavigationTriggerBarAnimationVariants["opened"][variantKey],
				closed: mobileNavigationTriggerBarAnimationVariants["closed"][variantKey]
			}}
			className={barClasses[variantKey]}
		/>
	);

	return (
		<button
			onClick={toggleMobileNavigation}
			aria-expanded={mobileNavigationState === "opened"}
			aria-label="Toggle mobile navigation"
			className={buttonClasses}
			{...restProps}
		>
			<span className="sr-only">Toggle mobile navigation</span>
			<div className="w-[20rem] h-[14rem] relative grow-0 shrink-0">
				{renderMotionBar("bar1")}
				{renderMotionBar("bar2")}
				{renderMotionBar("bar3")}
			</div>
		</button>
	);
};
