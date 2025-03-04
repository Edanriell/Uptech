"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Plane, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useGesture } from "@use-gesture/react";

const SliderMaterial = shaderMaterial(
	{
		effectFactor: 0.8,
		dispFactor: 0,
		direction: 1,
		tex: undefined,
		tex2: undefined,
		smoothness: 0.6,
		chromaOffset: 0.015
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
    uniform float smoothness;
    uniform float chromaOffset;

    vec4 sampleWithChroma(sampler2D tex, vec2 uv, float offset) {
        vec4 r = texture2D(tex, uv + vec2(offset, 0.0));
        vec4 g = texture2D(tex, uv);
        vec4 b = texture2D(tex, uv - vec2(offset, 0.0));
        return vec4(r.r, g.g, b.b, g.a);
    }

    void main() {
        vec2 uv = vUv;
        
        float smoothFactor = smoothstep(0.0, smoothness, dispFactor) * 
                           (1.0 - smoothstep(1.0 - smoothness, 1.0, dispFactor));
        
        vec2 distortedPosition = vec2(uv.x + direction * dispFactor * effectFactor, uv.y);
        vec2 distortedPosition2 = vec2(uv.x - direction * (1.0 - dispFactor) * effectFactor, uv.y);
        
        vec4 currentFrame = sampleWithChroma(tex, distortedPosition, chromaOffset * smoothFactor);
        vec4 nextFrame = sampleWithChroma(tex2, distortedPosition2, chromaOffset * smoothFactor);
        
        vec4 finalTexture = mix(currentFrame, nextFrame, dispFactor);

        float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5) * 1.2);
        
        vec3 color = finalTexture.rgb * vignette;
        
        color *= 1.0 + smoothFactor * 0.1;
        
        gl_FragColor = vec4(color, finalTexture.a);
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
	const [transitionDirection, setTransitionDirection] = useState(1);
	const materialRef = useRef<any>();
	const timeout = useRef<NodeJS.Timeout>();
	const isTransitioning = useRef(false);
	const transitionProgress = useRef(0);
	const animationSpeed = useRef(0.008);

	const textures = useRef(
		images.map((url) => {
			const texture = new THREE.TextureLoader().load(url);
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			return texture;
		})
	);

	const easeInOutCubic = (t: number): number => {
		return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
	};

	useFrame(() => {
		if (isTransitioning.current && materialRef.current) {
			transitionProgress.current += animationSpeed.current;
			const easedProgress = easeInOutCubic(transitionProgress.current);
			materialRef.current.dispFactor = easedProgress;

			if (transitionProgress.current >= 1) {
				isTransitioning.current = false;
				transitionProgress.current = 0;
				setCurrentIndex(nextIndex);
			}
		}
	});

	const startTransition = (direction: "prev" | "next") => {
		if (isTransitioning.current) return;

		isTransitioning.current = true;
		transitionProgress.current = 0;
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
		}, 5000);
	};

	useEffect(() => {
		window.__imageSliderNavigate = navigateToImage;

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
				smoothness={1}
				chromaOffset={0.2}
			/>
		</Plane>
	);
};

export const ImageSlider = () => {
	const bind = useGesture({
		onDrag: ({ movement: [mx], down, direction: [xDir], velocity }) => {
			if (window.__imageSliderNavigate && !down && (Math.abs(mx) > 50 || velocity > 0.2)) {
				window.__imageSliderNavigate(xDir > 0 ? "prev" : "next");
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
