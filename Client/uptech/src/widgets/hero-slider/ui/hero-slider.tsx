"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Plane, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useGesture } from "@use-gesture/react";

// Create a custom shader material with swapped condition.
const SliderMaterial = shaderMaterial(
	{
		effectFactor: 0.8,
		dispFactor: 0,
		// When direction > 0, the effect comes from the right,
		// when direction < 0, the effect comes from the left.
		direction: 1,
		tex: undefined,
		tex2: undefined,
		smoothness: 0.6
	},
	// Vertex shader remains the same.
	`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
	// Updated Fragment shader: note the swapped condition for u.
	`
    varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform float dispFactor;
    uniform float effectFactor;
    uniform float direction;
    uniform float smoothness;

    void main() {
      vec2 uv = vUv;
      // When direction > 0, use (1.0 - uv.x) so that the transition starts at the right edge.
      // When direction < 0, use uv.x so that it starts at the left.
      float u = direction > 0.0 ? (1.0 - uv.x) : uv.x;
      float mask = smoothstep(0.0, smoothness, u + (dispFactor * 2.0 - 1.0));
      vec4 currentFrame = texture2D(tex, uv);
      vec4 nextFrame = texture2D(tex2, uv);
      vec4 finalTexture = mix(currentFrame, nextFrame, mask);
      float transitionBoost = 1.0 + (0.1 * (1.0 - abs(2.0 * dispFactor - 1.0)));
      gl_FragColor = vec4(finalTexture.rgb * transitionBoost, finalTexture.a);
    }
  `
);

extend({ SliderMaterial });

declare global {
	namespace JSX {
		interface IntrinsicElements {
			sliderMaterial: any;
		}
	}
}

declare global {
	interface Window {
		__imageSliderNavigate?: (direction: "prev" | "next") => void;
	}
}

// Expose a drag handler type from ImagePlane.
interface ImagePlaneHandle {
	handleDrag: (down: boolean, mx: number, xDir: number) => void;
}

const ImagePlane = forwardRef<ImagePlaneHandle>((_props, ref) => {
	const images = [
		"https://images.unsplash.com/photo-1740398864002-99d4347d5190?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
		"https://images.unsplash.com/photo-1740487092927-d6e9d14373cb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [nextIndex, setNextIndex] = useState(1);
	// transitionDirection now controls the shader:
	// Positive means reveal from right, negative means reveal from left.
	const [transitionDirection, setTransitionDirection] = useState(1);
	const materialRef = useRef<any>();
	const timeout = useRef<NodeJS.Timeout>();
	const isTransitioning = useRef(false);
	const transitionProgress = useRef(0);
	const animationSpeed = useRef(0.005);
	const currentMx = useRef(0);

	// Refs for drag progress.
	const isDragging = useRef(false);
	const dragProgress = useRef(0);
	const targetProgress = useRef<number | null>(null);
	const DRAG_THRESHOLD = 200; // Maximum pixels for full progress.
	const COMPLETE_THRESHOLD = 0.3; // Minimum progress to complete transition.
	const dragAnimationSpeed = 0.05; // Speed for finishing the drag animation.

	const textures = useRef(
		images.map((url) => {
			const texture = new THREE.TextureLoader().load(url);
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			return texture;
		})
	);

	// Easing function for auto-transitions.
	const easeInOutSine = (t: number): number => {
		return -(Math.cos(Math.PI * t) - 1) / 2;
	};

	// Auto-transition for non-drag interactions.
	const startTransition = (direction: "prev" | "next") => {
		console.log("START TRANSITION IS TRIGGERED");
		if (isTransitioning.current || isDragging.current) return;
		console.log("startTransition");
		isTransitioning.current = true;
		transitionProgress.current = 0;
		// For auto-transition, assume "next" means swipe right-to-left.
		setTransitionDirection(direction === "next" ? 1 : -1);
		const nextIdx =
			direction === "next"
				? (currentIndex + 1) % images.length
				: (currentIndex - 1 + images.length) % images.length;
		setNextIndex(nextIdx);
		if (materialRef.current) {
			materialRef.current.tex = textures.current[currentIndex];
			materialRef.current.tex2 = textures.current[nextIdx];
			materialRef.current.dispFactor = 0;
			materialRef.current.direction = direction === "next" ? 1 : -1;
		}
	};

	// In this hook problem lies
	useFrame(() => {
		if (materialRef.current) {
			// If finishing a drag, animate toward the target progress.
			if (targetProgress.current !== null) {
				console.log("Trigger frame1");
				const currentVal = materialRef.current.dispFactor;
				const target = targetProgress.current;
				const newVal = currentVal + (target - currentVal) * dragAnimationSpeed;
				materialRef.current.dispFactor = newVal;
				if (Math.abs(newVal - target) < 0.01) {
					materialRef.current.dispFactor = target;
					if (target === 1) {
						setCurrentIndex(nextIndex);
					}
					targetProgress.current = null;
					dragProgress.current = 0;
					// Restart auto-transition timer.
					if (timeout.current) clearInterval(timeout.current);
					timeout.current = setInterval(() => {
						startTransition("next");
					}, 5000);
				}
			}
			// Auto-transition animation when not dragging.
			else if (isTransitioning.current && !isDragging.current) {
				console.log("Trigger frame2");
				transitionProgress.current += animationSpeed.current;
				const easedProgress = easeInOutSine(transitionProgress.current);
				materialRef.current.dispFactor = easedProgress;
				if (transitionProgress.current >= 1) {
					isTransitioning.current = false;
					transitionProgress.current = 0;
					setCurrentIndex(nextIndex);
				}
			}
		}
	});

	useEffect(() => {
		console.log("current TRANSITION DIRECTOPN" + " " + transitionDirection);
	}, [transitionDirection]);

	// Expose a handleDrag method.
	useImperativeHandle(ref, () => ({
		handleDrag: (down: boolean, mx: number, _xDir: number) => {
			if (!materialRef.current) return;
			currentMx.current = mx;
			if (down) {
				// console.log("CURRENT MX" + " " + mx);

				// console.log("CURRENT MX" + " " + currentMx.current);
				if (!isDragging.current && mx > 0) {
					// console.log("LEFT");
					// console.log("CURRENT MX" + " " + currentMx.current);
					isDragging.current = true;
					if (timeout.current) clearInterval(timeout.current);
					// let dir, nextIdx;
					// Use the sign of mx:
					// Dragging right (mx > 0): show previous slide coming from left.
					// Dragging left (mx < 0): show next slide coming from right.
					const nextIdx = (currentIndex - 1 + images.length) % images.length;
					materialRef.current.tex = textures.current[currentIndex];
					materialRef.current.tex2 = textures.current[nextIdx];
					// if (currentMx.current > 0) {
					// 	// dir = -1;
					// 	// console.log("RIGHT TO LEFT");
					//
					// } else {
					// 	// dir = 1;
					// 	// console.log("LEFT TO RIGHT");
					//
					// }
					// console.log(transitionDirection + "transitionDirection");
					setTransitionDirection(1);
					// console.log(transitionDirection + "transitionDirection");
					setNextIndex(nextIdx);

					materialRef.current.direction = transitionDirection;
				} else if (!isDragging.current && mx < 0) {
					isDragging.current = true;
					if (timeout.current) clearInterval(timeout.current);
					// let dir, nextIdx;

					const nextIdx = (currentIndex + 1) % images.length;
					materialRef.current.tex = textures.current[currentIndex];
					materialRef.current.tex2 = textures.current[nextIdx];

					setTransitionDirection(-1);
					setNextIndex(nextIdx);

					materialRef.current.direction = transitionDirection;
				}
				const progress = Math.min(Math.abs(mx) / DRAG_THRESHOLD, 1);
				dragProgress.current = progress;
				// console.log(1 - progress);
				materialRef.current.dispFactor = progress;
				// if (mx > 0) {
				// 	materialRef.current.dispFactor = progress;
				// } else {
				// 	materialRef.current.dispFactor = 1 - progress;
				// }
				// console.log(materialRef.current.dispFactor);
			} else {
				// console.log(isDragging.current);
				// console.log(mx);
				if (isDragging.current) {
					isDragging.current = false;
					const completeTransition = dragProgress.current >= COMPLETE_THRESHOLD;
					targetProgress.current = completeTransition ? 1 : 0;
					// if (mx > 0) {
					// 	const completeTransition = dragProgress.current >= COMPLETE_THRESHOLD;
					// 	targetProgress.current = completeTransition ? 1 : 0;
					// 	console.log(1);
					// } else {
					// 	const completeTransition = dragProgress.current <= COMPLETE_THRESHOLD;
					// 	targetProgress.current = completeTransition ? 1 : 0;
					// 	console.log(2);
					// }
					// console.log("this triggers");
				}
			}
		}
	}));

	useEffect(() => {
		// Set up auto-transition and navigation.
		window.__imageSliderNavigate = (direction: "prev" | "next") => {
			if (!isDragging.current && !isTransitioning.current) {
				startTransition(direction);
			}
		};

		timeout.current = setInterval(() => {
			startTransition("next");
		}, 5000);

		return () => {
			if (timeout.current) clearInterval(timeout.current);
			window.__imageSliderNavigate = undefined;
		};
	}, [currentIndex]);

	return (
		<Plane args={[16, 9]} position={[0, 0, 0]}>
			<sliderMaterial
				ref={materialRef}
				tex={textures.current[currentIndex]}
				tex2={textures.current[nextIndex]}
				transparent
				dispFactor={0}
				effectFactor={0.8}
				direction={transitionDirection}
				smoothness={0.8}
			/>
		</Plane>
	);
});

export const ImageSlider = () => {
	const planeRef = useRef<ImagePlaneHandle>(null);

	const bind = useGesture({
		onDrag: ({ movement: [mx], down, direction: [xDir] }) => {
			if (planeRef.current) {
				planeRef.current.handleDrag(down, mx, xDir);
			}
		}
	});

	return (
		<div
			className="relative w-full h-screen bg-black cursor-grab active:cursor-grabbing"
			{...bind()}
		>
			<Canvas>
				<PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
				<ambientLight intensity={0.5} />
				<directionalLight position={[10, 10, 10]} />
				<ImagePlane ref={planeRef} />
			</Canvas>

			<button
				onClick={() => window.__imageSliderNavigate?.("prev")}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
				aria-label="Previous image"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M15 18l-6-6 6-6" />
				</svg>
			</button>

			<button
				onClick={() => window.__imageSliderNavigate?.("next")}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
				aria-label="Next image"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M9 18l6-6-6-6" />
				</svg>
			</button>
		</div>
	);
};
