import { type ReactNode, useLayoutEffect } from "react";

import { validateDrawerContentChildren } from "../../ui/drawer-content";

import { useDrawerStore } from "./useDrawerStore";

export const useProcessedDrawerContent = (children: ReactNode) => {
	const { setDrawersContent } = useDrawerStore();

	useLayoutEffect(() => {
		setDrawersContent(validateDrawerContentChildren(children));
	}, [children]);
};
