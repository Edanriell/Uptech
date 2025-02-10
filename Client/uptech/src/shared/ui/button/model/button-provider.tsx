import { ReactNode, useState } from "react";
import { ButtonContext } from "@shared/ui/button/model/button-context";

type ButtonProviderProps = {
	children: ReactNode;
};

export const ButtonProvider = ({ children }: ButtonProviderProps) => {
	const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);

	const toggleIsButtonHovered = () => setIsButtonHovered((prev) => !prev);

	return (
		<ButtonContext.Provider
			value={{
				isButtonHovered,
				toggleIsButtonHovered
			}}
		>
			{children}
		</ButtonContext.Provider>
	);
};
