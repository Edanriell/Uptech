"use client";

import { ComponentPropsWithoutRef, FC, useContext } from "react";
import { motion, MotionProps } from "framer-motion";

import { HeaderContext } from "@widgets/header/model";

type MobileNavigationTriggerProps = {
	classes?: string;
} & ComponentPropsWithoutRef<"button"> &
	MotionProps;

const mobileNavigationLine0AnimationVariants = {
	opened: { top: "50%", y: "-50%", rotate: 135 },
	closed: { top: "0%", y: 0, rotate: 0 }
};

const mobileNavigationLine1AnimationVariants = {
	opened: { opacity: 0, top: "50%", y: "-50%", x: -20 },
	closed: { opacity: 1, top: "50%", y: "-50%", x: 0 }
};

const mobileNavigationLine2AnimationVariants = {
	opened: { bottom: "50%", y: "50%", rotate: -135 },
	closed: { bottom: "0%", y: "-50%", rotate: 0 }
};

export const MobileNavigationTrigger: FC<MobileNavigationTriggerProps> = ({
	classes,
	...restProps
}) => {
	const { mobileNavigationState, toggleMobileNavigation } = useContext(HeaderContext);

	return (
		<motion.button
			onClick={toggleMobileNavigation}
			className={
				classes +
				" rounded-[8rem] p-[8rem] w-[40rem] h-[40rem] flex items-center justify-center overflow-auto"
			}
			{...restProps}
		>
			<span className="sr-only">Toggle mobile navigation</span>
			<motion.div className="w-[20rem] h-[14rem] relative">
				<motion.div
					animate={mobileNavigationState === "opened" ? "opened" : "closed"}
					variants={mobileNavigationLine0AnimationVariants}
					className="absolute w-full h-[2rem] top-0 left-0 bg-white-50 rounded-full"
				></motion.div>
				<motion.div
					animate={mobileNavigationState === "opened" ? "opened" : "closed"}
					variants={mobileNavigationLine1AnimationVariants}
					className="absolute w-full h-[2rem] top-[50%] translate-y-[-50%] left-0 bg-white-50 rounded-full"
				></motion.div>
				<motion.div
					animate={mobileNavigationState === "opened" ? "opened" : "closed"}
					variants={mobileNavigationLine2AnimationVariants}
					className="absolute w-full h-[2rem] bottom-[0] translate-y-[-50%] left-0 bg-white-50 rounded-full"
				></motion.div>
			</motion.div>
		</motion.button>
	);
};
