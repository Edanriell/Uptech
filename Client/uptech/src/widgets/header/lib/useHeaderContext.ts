import { useContext } from "react";

import { HeaderContext } from "../model";

export const useHeaderContext = () => {
	const context = useContext(HeaderContext);
	if (!context) {
		throw new Error("useHeaderContext must be used within a HeaderProvider");
	}
	return context;
};
