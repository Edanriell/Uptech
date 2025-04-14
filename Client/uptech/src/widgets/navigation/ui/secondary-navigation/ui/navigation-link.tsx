import { type ComponentPropsWithoutRef, type FC, type JSX } from "react";
import { motion, type MotionProps } from "motion/react";
import { useDrawerStore } from "@widgets/drawer/lib/hooks";

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
	const { drawers } = useDrawerStore();

	const linkColors = {
		navigationLink: {
			active: "hsl(353,86%,54%)",
			inactive: "hsl(0,0%,12%)"
		}
	};

	const isNavigationLinkActive = drawers.some(
		(drawer) => drawer.id.toLowerCase() === name.toLowerCase()
	);

	return (
		<li className="flex items-center">
			<motion.button
				animate={{
					color: isNavigationLinkActive
						? linkColors.navigationLink.active
						: linkColors.navigationLink.inactive
				}}
				transition={{ type: "spring", duration: 0.2, bounce: 0 }}
				variants={navigationLinkAnimationVariants}
				whileHover={"hover"}
				whileTap={"tap"}
				type={"button"}
				style={{ cursor: "pointer", color: "hsl(0,0%,12%)" }}
				{...rest}
			>
				<span className="sr-only">{name}</span>
				<Icon />
			</motion.button>
		</li>
	);
};
