import { type ComponentPropsWithoutRef, type FC, type JSX } from "react";
import { motion, type MotionProps } from "motion/react";

type NavigationLinkProps = {
	name: string;
	Icon: () => JSX.Element;
} & MotionProps &
	ComponentPropsWithoutRef<"button">;

const navigationLinkAnimationVariants = {
	hover: {
		scale: 1.2,
		transition: { type: "spring", duration: 0.2, bounce: 0 }
	},
	tap: {
		scale: 0.8,
		transition: { type: "spring", duration: 0.2, bounce: 0 }
	}
};

export const NavigationLink: FC<NavigationLinkProps> = ({ name, Icon, ...rest }) => {
	return (
		<li className="flex items-center">
			<motion.button
				variants={navigationLinkAnimationVariants}
				whileHover={"hover"}
				whileTap={"tap"}
				type={"button"}
				style={{ cursor: "pointer" }}
				{...rest}
			>
				<span className="sr-only">{name}</span>
				<Icon />
			</motion.button>
		</li>
	);
};
