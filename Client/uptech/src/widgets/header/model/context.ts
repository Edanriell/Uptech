import { createContext } from "react";

export const HeaderContext = createContext({
	mobileNavigationState: "closed",
	searchState: "closed",
	userProfileState: "closed",
	cartState: "closed",
	toggleMobileNavigation: () => {},
	toggleSearch: () => {},
	toggleUserProfile: () => {},
	toggleCart: () => {}
});

export const toggleMobileNavigation = (
	mobileNavigationState: "opened" | "closed",
	setMobileNavigationState: (state: "opened" | "closed") => void
) => {
	mobileNavigationState === "closed"
		? setMobileNavigationState("opened")
		: setMobileNavigationState("closed");
};

export const toggleSearch = (
	searchState: "opened" | "closed",
	setSearchState: (state: "opened" | "closed") => void
) => {
	searchState === "closed" ? setSearchState("opened") : setSearchState("closed");
};

export const toggleUserProfile = (
	userProfileState: "opened" | "closed",
	setUserProfileState: (state: "opened" | "closed") => void
) => {
	userProfileState === "closed" ? setUserProfileState("opened") : setUserProfileState("closed");
};

export const toggleCart = (
	cartState: "opened" | "closed",
	setCartState: (state: "opened" | "closed") => void
) => {
	cartState === "closed" ? setCartState("opened") : setCartState("closed");
};
