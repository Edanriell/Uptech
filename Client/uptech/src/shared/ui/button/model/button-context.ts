import { createContext } from "react";

export type ButtonStore = {
	isButtonActive: boolean;
	toggleButtonActiveState: () => void;
};

export const ButtonContext = createContext<ButtonStore | null>(null);
