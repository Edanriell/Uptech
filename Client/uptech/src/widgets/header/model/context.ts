import { createContext } from "react";

type HeaderContextType = {
	mobileNavigationState: "opened" | "closed";
	searchState: "opened" | "closed";
	userProfileState: "opened" | "closed";
	cartState: "opened" | "closed";
	toggleMobileNavigation: () => void;
	toggleSearch: () => void;
	toggleUserProfile: () => void;
	toggleCart: () => void;
};

export const HeaderContext = createContext<HeaderContextType | undefined>(undefined);
