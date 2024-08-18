import { FC } from "react";
import Image from "next/image";

type LogotypeProps = {
	colorScheme?: "light" | "dark";
};

// TODO
// Logotype size small, normal

export const Logotype: FC<LogotypeProps> = ({ colorScheme = "dark" }) => {
	switch (colorScheme) {
		case "dark": {
			return (
				<Image
					src="/images/vector/logotype-dark.svg"
					width="132"
					height="32"
					alt="Uptech company logotype"
				/>
			);
		}
		case "light": {
			return (
				<Image
					src="/images/vector/logotype-light.svg"
					width="115"
					height="28"
					alt="Uptech company logotype"
				/>
			);
		}
		default: {
			return null;
		}
	}
};
