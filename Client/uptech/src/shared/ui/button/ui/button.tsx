"use client";

import { type ComponentPropsWithoutRef, type FC, type ReactNode } from "react";
import clsx from "clsx";
import { motion, MotionConfig, type MotionProps, type Transition } from "motion/react";

import { ButtonProvider } from "../model";
import { useButtonStore } from "../lib/hooks";

import { StaticLayer } from "./static-layer";
import { DynamicLayer } from "./dynamic-layer";

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
	StaticLayer: typeof StaticLayer;
	DynamicLayer: typeof DynamicLayer;
	Provider: typeof ButtonProvider;
};

type ButtonProps = {
	children: ReactNode;
	type?: "submit" | "button" | "reset";
	className?: string;
	transitionOptions?: Transition;
} & ComponentPropsWithoutRef<"button"> &
	MotionProps;

type Button = FC<ButtonProps> & ButtonComponents;

export const Button: Button = ({
	children,
	className,
	type = "button",
	transitionOptions = { type: "spring", duration: 1, bounce: 0 },
	...rest
}) => {
	const { toggleButtonActiveState } = useButtonStore();

	const buttonClasses = clsx(
		"max-h-[50rem] w-full h-[50rem] rounded-[44rem] font-medium text-[18rem] leading-[100%] capitalize cursor-pointer relative overflow-hidden",
		className
	);

	return (
		<MotionConfig transition={transitionOptions}>
			<motion.button
				layout
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onMouseEnter={toggleButtonActiveState}
				onMouseLeave={toggleButtonActiveState}
				onTouchStart={toggleButtonActiveState}
				onTouchEnd={toggleButtonActiveState}
				onFocus={toggleButtonActiveState}
				onBlur={toggleButtonActiveState}
				className={buttonClasses}
				type={type}
				{...rest}
			>
				{children}
			</motion.button>
		</MotionConfig>
	);
};

Button.Provider = ButtonProvider;
Button.StaticLayer = StaticLayer;
Button.DynamicLayer = DynamicLayer;
