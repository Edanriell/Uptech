import { useEffect, useState } from "react";

export const useLoader = () => {
	const [isDark, setIsDark] = useState<boolean>(false);
	const [animationKey, setAnimationKey] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsDark((prev) => !prev);
			setAnimationKey((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return { isDark, animationKey };
};
