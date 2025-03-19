import { type FC, Fragment, type ReactNode } from "react";

import { useDrawerTrigger } from "../lib/hooks";

type DrawerTriggerProps = {
	children: ReactNode;
};

export const DrawerTrigger: FC<DrawerTriggerProps> = ({ children }) => {
	const { processedChildren } = useDrawerTrigger(children);

	return <Fragment>{processedChildren}</Fragment>;
};
