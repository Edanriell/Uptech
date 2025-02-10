"use client";

import { type FC, type ReactNode } from "react";
import clsx from "clsx";
import { motion, MotionConfig, type Transition } from "motion/react";

import { ButtonProvider } from "../model";
import { useButtonStore } from "../lib/hooks";

import { PrimaryLayer } from "./primary-layer";
import { SecondaryLayer } from "./secondary-layer";

export type Orientation =
	| "top-to-bottom"
	| "bottom-to-top"
	| "left-to-right"
	| "right-to-left"
	| "top-left-to-bottom-right"
	| "bottom-right-to-top-left"
	| "top-right-to-bottom-left"
	| "bottom-left-to-top-right";

type ButtonComponents = {
	PrimaryLayer: typeof PrimaryLayer;
	SecondaryLayer: typeof SecondaryLayer;
	Provider: typeof ButtonProvider;
};

type ButtonProps = {
	children: ReactNode;
	type?: "submit" | "button" | "reset";
	className?: string;
	transitionOptions?: Transition;
};

type Button = FC<ButtonProps> & ButtonComponents;

export const Button: Button = ({
	children,
	type = "button",
	className,
	transitionOptions = { type: "spring", duration: 1, bounce: 0 }
}) => {
	const { toggleIsButtonHovered } = useButtonStore();

	const buttonClasses = clsx(
		"max-h-[50rem] w-full h-[50rem] tablet:basis-[149rem] rounded-[44rem] font-medium text-[18rem] leading-[100%] capitalize cursor-pointer relative overflow-hidden",
		className
	);

	return (
		<MotionConfig transition={transitionOptions}>
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onMouseEnter={toggleIsButtonHovered}
				onMouseLeave={toggleIsButtonHovered}
				className={buttonClasses}
				type={type}
			>
				{children}
			</motion.button>
		</MotionConfig>
	);
};

Button.Provider = ButtonProvider;
Button.PrimaryLayer = PrimaryLayer;
Button.SecondaryLayer = SecondaryLayer;
