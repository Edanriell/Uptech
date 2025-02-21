"use client";

import { type ComponentType, type MouseEvent, useEffect, useRef, useState } from "react";
import { motion, type Spring, useSpring } from "motion/react";

export type With3DProps = {
	width: string;
	height: string;
	scale?: number;
	rotationFactor?: number;
};

const with3DTransition: Spring = {
	type: "spring",
	stiffness: 300,
	damping: 30
};

export const with3D = <T extends object>(
	Component: ComponentType<T>
): ComponentType<T & With3DProps> => {
	const ComponentWith3D = ({
		width,
		height,
		scale = 1.1,
		rotationFactor = -40,
		...rest
	}: With3DProps & T) => {
		const [rotateXAxis, setRotateXAxis] = useState<number>(0);
		const [rotateYAxis, setRotateYAxis] = useState<number>(0);

		const ref = useRef<HTMLDivElement | null>(null);

		const dx = useSpring(0, with3DTransition);
		const dy = useSpring(0, with3DTransition);

		const handleMouseMove = (event: MouseEvent<HTMLDivElement>): void => {
			if (!ref.current) return;

			const elementRect = ref.current.getBoundingClientRect();
			const elementWidth = elementRect.width;
			const elementHeight = elementRect.height;
			const elementCenterX = elementWidth / 2;
			const elementCenterY = elementHeight / 2;

			const mouseX = event.clientY - elementRect.y - elementCenterY;
			const mouseY = event.clientX - elementRect.x - elementCenterX;

			const degreeX = (mouseX / elementWidth) * rotationFactor;
			const degreeY = (mouseY / elementHeight) * rotationFactor;

			setRotateXAxis(degreeX);
			setRotateYAxis(degreeY);
		};

		const handleMouseLeave = (): void => {
			setRotateXAxis(0);
			setRotateYAxis(0);
		};

		useEffect(() => {
			dx.set(-rotateXAxis);
			dy.set(rotateYAxis);
		}, [rotateXAxis, rotateYAxis, dx, dy]);

		return (
			<motion.div
				transition={with3DTransition}
				style={{
					perspective: "1200px",
					transformStyle: "preserve-3d",
					width,
					height
				}}
			>
				<motion.div
					ref={ref}
					whileHover={{ scale }}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					transition={with3DTransition}
					style={{
						width: "100%",
						height: "100%",
						rotateX: dx,
						rotateY: dy
					}}
				>
					<div
						style={{
							perspective: "1200px",
							transformStyle: "preserve-3d",
							width: "100%",
							height: "100%"
						}}
					>
						<motion.div
							transition={with3DTransition}
							style={{
								width: "100%",
								height: "100%",
								backfaceVisibility: "hidden",
								position: "absolute"
							}}
						>
							<Component width={width} height={height} {...(rest as T)} />
						</motion.div>
					</div>
				</motion.div>
			</motion.div>
		);
	};

	ComponentWith3D.displayName = `with3D(${
		Component.displayName || Component.name || "Component"
	})`;

	return ComponentWith3D;
};
