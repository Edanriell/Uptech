"use client";

import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Define GLSL shaders as raw strings
const vertexShader = `
  varying vec2 vUv;
  uniform float uScroll;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Depth effect based on scroll
    pos.z += sin(uv.y * 3.14) * (uScroll * 0.5);

    // Mouse-based parallax distortion
    pos.x += (uMouse.x * 0.2) * uv.y;
    pos.y += (uMouse.y * 0.2) * uv.x;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;

  void main() {
    vec4 color = texture2D(uTexture, vUv);
    gl_FragColor = color;
  }
`;

const ParallaxMaterial = shaderMaterial(
	{
		uTexture: new THREE.Texture(),
		uMouse: new THREE.Vector2(0, 0),
		uScroll: 0
	},
	vertexShader,
	fragmentShader
);

export default ParallaxMaterial;
