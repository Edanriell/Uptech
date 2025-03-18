import { createContext, type RefObject } from "react";

export type SecondaryNavigationStore = {
	orientationRef: RefObject<"horizontal" | "vertical" | null>;
};

export const SecondaryNavigationContext = createContext<SecondaryNavigationStore | null>(null);
