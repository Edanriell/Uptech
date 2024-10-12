import { useEffect, useRef } from "react";

export const useRenderInfo = (name = "Unknown") => {
	const count = useRef(0);
	const lastRender = useRef<number>();
	const now = Date.now();

	count.current++;

	useEffect(() => {
		lastRender.current = Date.now();
	});

	const sinceLastRender = lastRender.current ? now - lastRender.current : 0;

	if (process.env.NODE_ENV !== "production") {
		const info = {
			name,
			renders: count.current,
			sinceLastRender,
			timestamp: now
		};

		console.log(info);

		return info;
	}
};
