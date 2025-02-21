"use client";

import { type FC } from "react";

import { useLoader } from "../lib/hooks";

import { LoaderLayer } from "./loader-layer";

type LoaderProps = {
	width?: string;
	height?: string;
	primaryColor?: string;
	secondaryColor?: string;
};

export const Loader: FC<LoaderProps> = ({
	width = "353rem",
	height = "312rem",
	primaryColor = "#1f1f1f",
	secondaryColor = "#ef233c"
}) => {
	const { isDark, animationKey } = useLoader();

	return (
		<div style={{ width, height }} className="relative">
			<LoaderLayer
				color={primaryColor}
				isDark={isDark}
				animationKey={animationKey}
				isPrimary={true}
			/>
			<LoaderLayer
				color={secondaryColor}
				isDark={isDark}
				animationKey={animationKey}
				isPrimary={false}
			/>
		</div>
	);
};
