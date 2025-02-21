import { type FC } from "react";
import { AnimatePresence } from "motion/react";

import { useDrawers } from "../lib/hooks";

import { DrawerInstance } from "./drawer-instance";

export const DrawerRoot: FC = () => {
	const { drawers } = useDrawers();

	return (
		<AnimatePresence mode="popLayout">
			{drawers.map(({ id, content }, index) => (
				<DrawerInstance
					key={id}
					id={id}
					index={index}
					reversedIndex={drawers.length - 1 - index}
				>
					{content}
				</DrawerInstance>
			))}
		</AnimatePresence>
	);
};
