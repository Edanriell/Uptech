"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Plane, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const SliderMaterial = shaderMaterial(
	{
		effectFactor: 0.8,
		dispFactor: 0,
		direction: 1, // New uniform for direction: 1 for right, -1 for left
		tex: undefined,
		tex2: undefined
	},
	// Vertex shader
	`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
	// Fragment shader
	`
    varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform float dispFactor;
    uniform float effectFactor;
    uniform float direction;

    void main() {
      vec2 uv = vUv;
      
      vec4 disp = texture2D(tex2, uv);
      vec2 distortedPosition = vec2(uv.x + direction * dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - direction * (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      
      vec4 _texture1 = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      
      vec4 finalTexture = mix(_texture1, _texture2, dispFactor);
      
      gl_FragColor = finalTexture;
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

const ImagePlane = () => {
	const images = [
		"https://images.unsplash.com/photo-1740398864002-99d4347d5190?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.unsplash.com/photo-1740487092927-d6e9d14373cb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [nextIndex, setNextIndex] = useState(1);
	const [transitionDirection, setTransitionDirection] = useState(1); // 1 for right, -1 for left
	const materialRef = useRef<any>();
	const timeout = useRef<NodeJS.Timeout>();
	const isTransitioning = useRef(false);
	const transitionProgress = useRef(0);

	const textures = useRef(
		images.map((url) => {
			const texture = new THREE.TextureLoader().load(url);
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			return texture;
		})
	);

	const startTransition = (direction: "prev" | "next") => {
		if (isTransitioning.current) return;

		isTransitioning.current = true;
		transitionProgress.current = 0;

		// Set the visual direction of the transition
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

	const navigateToImage = (direction: "prev" | "next") => {
		if (isTransitioning.current) return;

		if (timeout.current) {
			clearInterval(timeout.current);
		}

		startTransition(direction);

		timeout.current = setInterval(() => {
			startTransition("next");
		}, 3000);
	};

	useEffect(() => {
		window.__imageSliderNavigate = (direction) => {
			navigateToImage(direction);
		};

		timeout.current = setInterval(() => {
			startTransition("next");
		}, 3000);

		return () => {
			if (timeout.current) clearInterval(timeout.current);
			window.__imageSliderNavigate = undefined;
		};
	}, [currentIndex]);

	useFrame((_, delta) => {
		if (materialRef.current && isTransitioning.current) {
			const ease = (t: number) => t * t * (3 - 2 * t);

			transitionProgress.current = Math.min(transitionProgress.current + delta * 0.5, 1);

			materialRef.current.dispFactor = ease(transitionProgress.current);

			if (transitionProgress.current >= 1) {
				isTransitioning.current = false;
				transitionProgress.current = 0;
				setCurrentIndex(nextIndex);
			}
		}
	});

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
			/>
		</Plane>
	);
};

export const ImageSlider = () => {
	return (
		<div className="relative w-full h-screen bg-black">
			<Canvas>
				<PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
				<ambientLight intensity={0.5} />
				<directionalLight position={[10, 10, 10]} />
				<ImagePlane />
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
