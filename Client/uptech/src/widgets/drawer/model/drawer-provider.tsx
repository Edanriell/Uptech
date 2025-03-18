import { type ReactNode, useRef, useState } from "react";

import { type Drawer, type DrawerConfig, DrawerContext } from "./drawer-context";

type DrawerProviderProps = {
	children: ReactNode;
};

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
	const [drawers, setDrawers] = useState<Array<Drawer> | []>([]);
	const [config, setConfig] = useState<DrawerConfig>({
		maxDrawers: null,
		drawerWidth: null,
		drawerHeight: null,
		drawerPosition: null
	});

	const drawersContent = useRef<Array<ReactNode> | []>([]); // Use useRef for static content

	const openDrawer = (contentId: string) => {
		if (drawers.some((drawer) => drawer.id === contentId)) {
			console.log("Drawer already exists, skipping addition.");
			return;
		}

		const targetContent = drawersContent.current.find(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(content) => (content as any).props["data-content-id"] === contentId
		);

		if (!targetContent) {
			console.error("No content found for contentId:", contentId);
			return;
		}

		console.log("Adding new drawer with contentId:", contentId);
		setDrawers((prev) => [...prev, { id: contentId, content: targetContent }]);
	};

	const closeDrawer = (id: string) => {
		setDrawers((prev) => prev.filter((drawer) => drawer.id !== id));
	};

	const reorderDrawer = (id: string) => {
		setDrawers((prev) => {
			const drawerToReorder = prev.find((drawer) => drawer.id === id);
			if (!drawerToReorder) return prev;

			const otherDrawers = prev.filter((drawer) => drawer.id !== id);
			return [...otherDrawers, drawerToReorder];
		});
	};

	const setDrawersContent = (content: ReactNode[]) => {
		drawersContent.current = content;
	};

	return (
		<DrawerContext.Provider
			value={{
				drawers,
				config,
				openDrawer,
				closeDrawer,
				reorderDrawer,
				setConfig,
				setDrawersContent
			}}
		>
			{children}
		</DrawerContext.Provider>
	);
};
