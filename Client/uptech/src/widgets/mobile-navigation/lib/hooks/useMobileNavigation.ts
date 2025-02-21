import { useRef } from "react";

import { useHeaderStore } from "@widgets/header/model";

export const useMobileNavigation = () => {
	const mobileNavigationState = useHeaderStore(
		({ mobileNavigationState }) => mobileNavigationState
	);
	const mobileNavigationRef = useRef<HTMLDivElement | null>(null);

	return { mobileNavigationState, mobileNavigationRef };
};
