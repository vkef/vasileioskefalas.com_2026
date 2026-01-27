"use client";

import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

export const GridShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uResolution: new THREE.Vector2(1, 1),
    },

    // vertex shader
    `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,

    // fragment shader
    `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float grid(vec2 uv, float scale) {
    uv *= scale;
    vec2 g = abs(fract(uv - 0.5) - 0.5) / fwidth(uv);
    return 1.0 - min(min(g.x, g.y), 1.0);
  }

  float noise(vec2 uv) {
    return fract(sin(dot(uv, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // subtle animated drift
    uv += uTime * 0.002;

    vec3 col = vec3(0.05);

    float fine = grid(uv, 40.0);
    float coarse = grid(uv, 8.0);
    float n = noise(uv * 400.0 + uTime);

    col += fine * 0.08;
    col += coarse * 0.15;
    col += n * 0.03;

    // vignette
    float d = distance(vUv, vec2(0.5));
    col *= smoothstep(0.9, 0.3, d);

    gl_FragColor = vec4(col, 1.0);
  }
  `
);

extend({ GridShaderMaterial });