import { useHeaderStore } from "@widgets/header/model";

export const useMobileNavigationTrigger = () => {
	const mobileNavigationState = useHeaderStore(
		({ mobileNavigationState }) => mobileNavigationState
	);
	const toggleMobileNavigation = useHeaderStore(
		({ toggleMobileNavigation }) => toggleMobileNavigation
	);

	return { mobileNavigationState, toggleMobileNavigation };
};
