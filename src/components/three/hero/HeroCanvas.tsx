"use client";
import { Canvas } from "@react-three/fiber";
import { BakeShadows, Preload } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import Scene from "./Scene";


export default function HeroCanvas() {
    const [eventTarget, setEventTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof document === "undefined") return;
        setEventTarget(document.getElementById("hero") ?? document.body);
    }, []);

    return (
        <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }}
            eventPrefix="offset"
            eventSource={eventTarget ?? undefined}
            onCreated={({ gl }) => {
                gl.debug.checkShaderErrors = false;
            }}
            style={{ pointerEvents: "none" }}
        >
            <Suspense fallback={null}>
            <Scene />
            <Preload all />
            </Suspense>
            <BakeShadows />
        </Canvas>
    );
}
