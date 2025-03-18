import { ReactNode, useState } from "react";

import { ButtonContext } from "./button-context";

type ButtonProviderProps = {
	children: ReactNode;
};

export const ButtonProvider = ({ children }: ButtonProviderProps) => {
	const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

	const toggleButtonActiveState = () => setIsButtonActive((prev) => !prev);

	return (
		<ButtonContext.Provider
			value={{
				isButtonActive,
				toggleButtonActiveState
			}}
		>
			{children}
		</ButtonContext.Provider>
	);
};
