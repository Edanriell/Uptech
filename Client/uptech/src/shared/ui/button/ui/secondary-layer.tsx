import { type FC, type ReactNode } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

import { generateClipPath } from "../lib/functions";
import { useButtonStore } from "../lib/hooks/useButtonStore";

import { Orientation } from "./button";

type SecondaryLayerProps = {
	children: ReactNode;
	orientation?: Orientation;
	className?: string;
	color?: string;
};

export const SecondaryLayer: FC<SecondaryLayerProps> = ({
	children,
	orientation = "top-left-to-bottom-right",
	className,
	color = "bg-white-50"
}) => {
	const { isButtonHovered } = useButtonStore();

	const secondaryLayerClasses = clsx("px-[32rem] py-[16rem] absolute inset-0", className, color);

	return (
		<motion.span
			initial={{
				clipPath: generateClipPath({ orientation, isButtonHovered: false })
			}}
			animate={{
				clipPath: generateClipPath({ orientation, isButtonHovered })
			}}
			className={secondaryLayerClasses}
		>
			{children}
		</motion.span>
	);
};
