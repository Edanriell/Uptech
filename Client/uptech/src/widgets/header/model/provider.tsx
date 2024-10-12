import { FC, ReactNode, useState } from "react";

import { HeaderContext } from "./context";

type HeaderProviderProps = {
	children: ReactNode;
};

const toggleState = (currentState: "opened" | "closed") =>
	currentState === "closed" ? "opened" : "closed";

export const HeaderProvider: FC<HeaderProviderProps> = ({ children }) => {
	const [mobileNavigationState, setMobileNavigationState] = useState<"opened" | "closed">("closed");
	const [searchState, setSearchState] = useState<"opened" | "closed">("closed");
	const [userProfileState, setUserProfileState] = useState<"opened" | "closed">("closed");
	const [cartState, setCartState] = useState<"opened" | "closed">("closed");

	const toggleMobileNavigation = () => {
		setMobileNavigationState((prevState) => toggleState(prevState));
	};

	const toggleSearch = () => {
		setSearchState((prevState) => toggleState(prevState));
	};

	const toggleUserProfile = () => {
		setUserProfileState((prevState) => toggleState(prevState));
	};

	const toggleCart = () => {
		setCartState((prevState) => toggleState(prevState));
	};

	return (
		<HeaderContext.Provider
			value={{
				mobileNavigationState,
				searchState,
				userProfileState,
				cartState,
				toggleMobileNavigation,
				toggleSearch,
				toggleUserProfile,
				toggleCart
			}}
		>
			{children}
		</HeaderContext.Provider>
	);
};
