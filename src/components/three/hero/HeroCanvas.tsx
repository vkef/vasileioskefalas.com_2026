"use client";
import { Canvas } from "@react-three/fiber";
import { BakeShadows, Preload } from "@react-three/drei";
import { Suspense } from "react";
import Scene from "./Scene";


export default function HeroCanvas() {
    return (
        <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }}
            eventPrefix="client"
            eventSource={typeof document !== "undefined" ? document.body : undefined}
            style={{ pointerEvents: "auto" }}
        >
            <Suspense fallback={null}>
            <Scene />
            <Preload all />
            </Suspense>
            <BakeShadows />
        </Canvas>
    );
}
