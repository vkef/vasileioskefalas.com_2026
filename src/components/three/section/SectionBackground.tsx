"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ShaderBackground from "./ShaderBackground";

export default function SectionBackground() {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                zIndex: -1,
                pointerEvents: "none",
            }}
        >
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 1] }}
                gl={{ antialias: true }}
            >
                <Suspense fallback={null}>
                    <ShaderBackground />
                </Suspense>
            </Canvas>
        </div>
    );
}