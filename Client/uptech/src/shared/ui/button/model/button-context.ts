import { createContext } from "react";

export type ButtonStore = {
	isButtonHovered: boolean;
	toggleIsButtonHovered: () => void;
};

export const ButtonContext = createContext<ButtonStore | null>(null);
