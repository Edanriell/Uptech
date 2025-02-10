import { type FC, type ReactNode } from "react";
import clsx from "clsx";

type PrimaryLayerProps = {
	children: ReactNode;
	color?: string;
	className?: string;
};

export const PrimaryLayer: FC<PrimaryLayerProps> = ({
	children,
	color = "bg-white-900",
	className
}) => {
	const primaryLayerClasses = clsx("px-[32rem] py-[16rem] absolute inset-0", className, color);

	return <span className={primaryLayerClasses}>{children}</span>;
};
