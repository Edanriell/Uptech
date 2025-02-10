import { type FC, type ReactNode } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

import { generateClipPath } from "../lib/functions";
import { useButtonStore } from "../lib/hooks/useButtonStore";

import { Orientation } from "./button";

type DynamicLayerProps = {
	children: ReactNode;
	className?: string;
	orientation?: Orientation;
	color?: string;
};

export const DynamicLayer: FC<DynamicLayerProps> = ({
	children,
	className,
	orientation = "top-left-to-bottom-right",
	color = "bg-white-50"
}) => {
	const { isButtonActive } = useButtonStore();

	const dynamicLayerClasses = clsx("px-[32rem] py-[16rem] absolute inset-0", className, color);

	return (
		<motion.span
			initial={{
				clipPath: generateClipPath({ orientation, isButtonActive: false })
			}}
			animate={{
				clipPath: generateClipPath({ orientation, isButtonActive })
			}}
			className={dynamicLayerClasses}
		>
			{children}
		</motion.span>
	);
};
