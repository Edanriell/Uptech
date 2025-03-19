import { createContext, type RefObject } from "react";

export type PrimaryNavigationStore = {
	globalClassesRef: RefObject<string | null>;
	orientationRef: RefObject<"horizontal" | "vertical" | null>;
	containerRef: RefObject<HTMLDivElement | null>;
	activeLinkElementRef: RefObject<HTMLAnchorElement | null>;
	activeLink: string;
	setActiveLink: (link: string) => void;
	initializeActiveLink: (pathname: string) => void;
};

export const PrimaryNavigationContext = createContext<PrimaryNavigationStore | null>(null);
