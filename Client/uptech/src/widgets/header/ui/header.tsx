"use client";

import { FC, useState } from "react";

import { ProductsSearch } from "@features/products-search/ui";
import { MobileNavigation } from "@widgets/mobile-navigation/ui";

import {
	HeaderContext,
	toggleCart,
	toggleMobileNavigation,
	toggleSearch,
	toggleUserProfile
} from "../model";
import dynamic from "next/dynamic";
import { StaticHeader } from "@widgets/header/ui/static-header";

// TODO
// Implement skeleton loading
// Fix animation delay
// Check all code for header again

const DynamicHeader = dynamic(() => import("./dynamic-header"), {
	ssr: false,
	loading: () => <p>Loading...</p>
});

export const Header: FC = () => {
	const [mobileNavigationState, setMobileNavigationState] = useState<"opened" | "closed">("closed");
	const [searchState, setSearchState] = useState<"opened" | "closed">("closed");
	const [userProfileState, setUserProfileState] = useState<"opened" | "closed">("closed");
	const [cartState, setCartState] = useState<"opened" | "closed">("closed");

	return (
		<HeaderContext.Provider
			value={{
				mobileNavigationState,
				searchState,
				userProfileState,
				cartState,
				toggleMobileNavigation: () =>
					toggleMobileNavigation(mobileNavigationState, setMobileNavigationState),
				toggleSearch: () => toggleSearch(searchState, setSearchState),
				toggleUserProfile: () => toggleUserProfile(userProfileState, setUserProfileState),
				toggleCart: () => toggleCart(cartState, setCartState)
			}}
		>
			<StaticHeader />
			<DynamicHeader />
			<MobileNavigation classes="fixed top-[80rem] left-0" />
			<ProductsSearch searchState={searchState} mobileNavigationState={mobileNavigationState} />
		</HeaderContext.Provider>
	);
};
