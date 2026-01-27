"use client";
import { Canvas } from "@react-three/fiber";
import { BakeShadows, Preload } from "@react-three/drei";
import { Suspense } from "react";
import Scene from "./Scene";

export default function HeroCanvas() {
    return (
        <Canvas
            className="h-full w-full pointer-events-auto"
            dpr={[1, 2]}
            shadows
            camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }}
        >
            <Suspense fallback={null}>
                <Scene />
                <Preload all />
            </Suspense>
            <BakeShadows />
        </Canvas>
    );
}