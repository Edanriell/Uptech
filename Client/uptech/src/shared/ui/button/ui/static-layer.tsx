import { type FC, type ReactNode } from "react";
import clsx from "clsx";

type StaticLayerProps = {
	children: ReactNode;
	className?: string;
	color?: string;
};

export const StaticLayer: FC<StaticLayerProps> = ({
	children,
	className,
	color = "bg-white-900"
}) => {
	const staticLayerClasses = clsx("px-[32rem] py-[16rem] absolute inset-0", className, color);

	return <span className={staticLayerClasses}>{children}</span>;
};
