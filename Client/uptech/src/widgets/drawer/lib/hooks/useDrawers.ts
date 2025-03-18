import { useLayoutEffect } from "react";
import { useDrawerStore } from "./useDrawerStore";

export const useDrawers = () => {
	const { drawers } = useDrawerStore();

	useLayoutEffect(() => {
		let drawerRoot = document.getElementById("drawer-root");

		if (!drawerRoot) {
			drawerRoot = document.createElement("div");
			drawerRoot.id = "drawer-root";
			drawerRoot.className = "relative z-20";
			document.body.appendChild(drawerRoot);
		}
	}, []);

	return { drawers };
};
