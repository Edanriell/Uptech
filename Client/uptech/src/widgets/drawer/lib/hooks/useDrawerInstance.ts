import { useEffect } from "react";
import { type PanInfo, type Variants } from "motion/react";

import { removeLettersFromString } from "@shared/lib/functions";

import { useDrawerStore } from "./useDrawerStore";

export const useDrawerInstance = (id: string, reversedIndex: number) => {
	const { config, closeDrawer, reorderDrawer } = useDrawerStore();

	useEffect(() => {
		const handleEscapeKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeDrawer(id);
		};

		window.addEventListener("keydown", handleEscapeKeyDown);
		return () => window.removeEventListener("keydown", handleEscapeKeyDown);
	}, [closeDrawer, id]);

	const IS_DRAWER_FIRST_IN_STACK = reversedIndex === 0;
	const IS_DRAWER_LAST_IN_STACK = reversedIndex > (config.maxDrawers ?? 0) - 1;

	const drawerWidth = Number(removeLettersFromString(config.drawerWidth ?? "0"));
	const drawerHeight = config.drawerHeight ?? "0";
	const maxDrawers = config.maxDrawers ?? 1;

	const createAnimationVariants = (x: number, y: number, opacity = 1, blur = "0rem") => ({
		opacity,
		x,
		y,
		scale: 1.0 - reversedIndex / 10,
		filter: `blur(${blur})`
	});

	const initialAnimationVariants: Variants = {
		right: createAnimationVariants(drawerWidth, 0, 0, "5rem"),
		left: createAnimationVariants(-drawerWidth, 0, 0, "5rem"),
		bottom: createAnimationVariants(0, Number(drawerHeight), 0, "5rem"),
		top: createAnimationVariants(0, -Number(drawerHeight), 0, "5rem")
	};

	const defaultAnimationVariants: Variants = {
		right: createAnimationVariants(-70 * reversedIndex, 30 * reversedIndex),
		left: createAnimationVariants(70 * reversedIndex, 30 * reversedIndex),
		bottom: createAnimationVariants(0, -70 * reversedIndex),
		top: createAnimationVariants(0, 70 * reversedIndex)
	};

	const lastAnimationVariants: Variants = {
		right: createAnimationVariants(-70 * maxDrawers, 30 * maxDrawers, 0, "5rem"),
		left: createAnimationVariants(70 * maxDrawers, 30 * maxDrawers, 0, "5rem"),
		bottom: createAnimationVariants(0, -70 * maxDrawers, 0, "5rem"),
		top: createAnimationVariants(0, 70 * maxDrawers, 0, "5rem")
	};

	const exitAnimationVariants: Variants = {
		right: createAnimationVariants(380, 30 * reversedIndex, 0, "5rem"),
		left: createAnimationVariants(-380, 30 * reversedIndex, 0, "5rem"),
		bottom: createAnimationVariants(0, Number(drawerHeight), 0, "5rem"),
		top: createAnimationVariants(0, -Number(drawerHeight), 0, "5rem")
	};

	const hoverAnimationVariants: Variants = {
		right: { x: -70 * reversedIndex - 20 * reversedIndex },
		left: { x: 70 * reversedIndex + 20 * reversedIndex },
		bottom: { y: -70 * reversedIndex - 20 * reversedIndex },
		top: { y: 70 * reversedIndex + 20 * reversedIndex }
	};

	const drawerAnimationVariants: Variants = {
		initial: initialAnimationVariants[config.drawerPosition!],
		default: defaultAnimationVariants[config.drawerPosition!],
		last: lastAnimationVariants[config.drawerPosition!],
		exit: exitAnimationVariants[config.drawerPosition!],
		hover: hoverAnimationVariants[config.drawerPosition!]
	};

	const handleDrawerInteractionEnd = (_: Event, { offset, velocity }: PanInfo) => {
		switch (config.drawerPosition) {
			case "left":
				if (offset.x < 100 || velocity.x < 0.4) closeDrawer(id);
				break;
			case "right":
				if (offset.x > 100 || velocity.x > 0.4) closeDrawer(id);
				break;
			case "bottom":
				if (offset.y > 150 || velocity.y > 400) closeDrawer(id);
				break;
			case "top":
				if (offset.y < -150 || velocity.y < -400) closeDrawer(id);
				break;
		}
	};

	return {
		config,
		drawerAnimationVariants,
		IS_DRAWER_FIRST_IN_STACK,
		IS_DRAWER_LAST_IN_STACK,
		handleDrawerInteractionEnd,
		handleDrawerReorder: () => reorderDrawer(id),
		handleDrawerDismiss: () => closeDrawer(id)
	};
};
