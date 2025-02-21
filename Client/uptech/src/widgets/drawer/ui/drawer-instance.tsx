import { type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import clsx from "clsx";

import { getDragAxis, getDragConstraints } from "../lib/functions";
import { useDrawerInstance } from "../lib/hooks";

type DrawerInstanceProps = {
	id: string;
	index: number;
	reversedIndex: number;
	children: ReactNode;
};

export const DrawerInstance: FC<DrawerInstanceProps> = ({ id, index, reversedIndex, children }) => {
	const {
		config,
		drawerAnimationVariants,
		IS_DRAWER_FIRST_IN_STACK,
		IS_DRAWER_LAST_IN_STACK,
		handleDrawerInteractionEnd,
		handleDrawerReorder,
		handleDrawerDismiss
	} = useDrawerInstance(id, reversedIndex);

	const interactiveDrawerClasses = clsx(
		"fixed rounded-[8rem] bg-[var(--white-transparent-10)] backdrop-blur-[40rem] p-[20rem] shadow-soft",
		{
			"top-[14%] right-[0] origin-top-right mr-[24rem]": config.drawerPosition === "right",
			"top-[14%] left-[0] origin-top-left ml-[24rem]": config.drawerPosition === "left",
			"bottom-[0] left-[0] origin-bottom m-[16rem]": config.drawerPosition === "bottom",
			"top-[0] left-[0] origin-top m-[16rem]": config.drawerPosition === "top"
		}
	);

	const renderInteractiveDrawer = () => (
		<motion.aside
			key={id}
			drag={getDragAxis({
				drawerPosition: config.drawerPosition!,
				isFirstInStack: IS_DRAWER_FIRST_IN_STACK
			})}
			dragConstraints={
				getDragConstraints({
					drawerPosition: config.drawerPosition!,
					drawerWidth: config.drawerWidth!,
					drawerHeight: config.drawerHeight!
				}) as never
			}
			dragElastic={0.15}
			dragSnapToOrigin
			onDragEnd={handleDrawerInteractionEnd}
			variants={drawerAnimationVariants}
			initial={"initial"}
			whileHover={IS_DRAWER_FIRST_IN_STACK ? "" : "hover"}
			exit={"exit"}
			animate={IS_DRAWER_LAST_IN_STACK ? "last" : "default"}
			transition={{ type: "spring", duration: 0.6, bounce: 0 }}
			className={interactiveDrawerClasses}
			style={{
				width: config.drawerWidth!,
				height: config.drawerHeight!,
				zIndex: index, // Stack each sidebar dynamically
				cursor: IS_DRAWER_FIRST_IN_STACK ? "default" : "pointer"
			}}
			onClick={!IS_DRAWER_LAST_IN_STACK ? handleDrawerReorder : undefined}
		>
			{children}
			<button onClickCapture={handleDrawerDismiss}>Close</button>
		</motion.aside>
	);

	return createPortal(renderInteractiveDrawer(), document.getElementById("drawer-root")!);
};
