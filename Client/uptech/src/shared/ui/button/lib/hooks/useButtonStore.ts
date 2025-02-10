import { useContext } from "react";

import { ButtonContext, ButtonStore } from "@shared/ui/button/model";

export const useButtonStore = (): ButtonStore => {
	const context = useContext(ButtonContext);

	if (!context) {
		throw new Error("useButtonStore must be used within a ButtonProvider");
	}

	return context;
};
