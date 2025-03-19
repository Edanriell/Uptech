import { useLayoutEffect } from "react";

import { DrawerProps } from "../../ui";

import { useDrawerStore } from "./useDrawerStore";

export const useDrawerConfig = ({
	max,
	width,
	height,
	position
}: Required<Pick<DrawerProps, "max" | "width" | "height" | "position">>) => {
	const { setConfig } = useDrawerStore();

	useLayoutEffect(() => {
		setConfig({
			maxDrawers: max,
			drawerWidth: width,
			drawerHeight: height,
			drawerPosition: position
		});
	}, [max, width, height, position]);
};
