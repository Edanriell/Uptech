"use client";

import { ComponentPropsWithoutRef, FC } from "react";
import { motion, MotionProps } from "framer-motion";

import { useHeaderContext } from "@widgets/header/lib";

type MobileNavigationTriggerProps = {
	classes?: string;
} & ComponentPropsWithoutRef<"button"> &
	MotionProps;

export const MobileNavigationTrigger: FC<MobileNavigationTriggerProps> = ({
	classes,
	...restProps
}) => {
	const { mobileNavigationState, toggleMobileNavigation } = useHeaderContext();

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
					variants={{
						opened: {
							top: "50%",
							y: "-50%",
							rotate: 135,
							transition: {
								type: "spring",
								bounce: 0,
								duration: 0.5
							}
						},
						closed: {
							top: "0%",
							y: 0,
							rotate: 0,
							transition: {
								type: "spring",
								bounce: 0,
								duration: 0.45
							}
						}
					}}
					className="absolute w-full h-[2rem] top-0 left-0 bg-white-50 rounded-full"
				></motion.div>
				<motion.div
					animate={mobileNavigationState === "opened" ? "opened" : "closed"}
					variants={{
						opened: {
							opacity: 0,
							top: "50%",
							y: "-50%",
							x: -20,
							transition: {
								type: "spring",
								bounce: 0,
								duration: 0.5
							}
						},
						closed: {
							opacity: 1,
							top: "50%",
							y: "-50%",
							x: 0,
							transition: {
								type: "spring",
								bounce: 0,
								duration: 0.45
							}
						}
					}}
					className="absolute w-full h-[2rem] top-[50%] translate-y-[-50%] left-0 bg-white-50 rounded-full"
				></motion.div>
				<motion.div
					animate={mobileNavigationState === "opened" ? "opened" : "closed"}
					variants={{
						opened: {
							bottom: "50%",
							y: "50%",
							rotate: -135,
							transition: {
								type: "spring",
								bounce: 0,
								duration: 0.5
							}
						},
						closed: {
							bottom: "0%",
							y: "-50%",
							rotate: 0,
							transition: {
								type: "spring",
								bounce: 0,
								duration: 0.45
							}
						}
					}}
					className="absolute w-full h-[2rem] bottom-[0] translate-y-[-50%] left-0 bg-white-50 rounded-full"
				></motion.div>
			</motion.div>
		</motion.button>
	);
};
