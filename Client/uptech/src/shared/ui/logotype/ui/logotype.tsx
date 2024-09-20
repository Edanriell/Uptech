"use client";

import { FC } from "react";
import Image from "next/image";

type LogotypeProps = {
	colorScheme?: "light" | "dark";
	size?: "small" | "medium";
};

export const Logotype: FC<LogotypeProps> = ({ colorScheme = "dark", size = "small" }) => {
	switch (colorScheme) {
		case "dark": {
			return (
				<Image
					src="/images/vector/logotype-dark.svg"
					width={size === "small" ? 115 : 132}
					height={size === "small" ? 28 : 32}
					alt="Uptech company logotype"
				/>
			);
		}
		case "light": {
			return (
				<Image
					src="/images/vector/logotype-light.svg"
					width={size === "small" ? 115 : 132}
					height={size === "small" ? 28 : 32}
					alt="Uptech company logotype"
				/>
			);
		}
		default: {
			return null;
		}
	}
};
