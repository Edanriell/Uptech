import { useRef } from "react";

export const useIsFirstRender = () => {
	const renderRef = useRef<boolean>(true);

	if (renderRef.current === true) {
		renderRef.current = false;
		return true;
	}

	return renderRef.current;
};
