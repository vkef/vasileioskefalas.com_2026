"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function ShaderBackground() {
    const ref = useRef<any>(null);
    const { size } = useThree();

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.uTime = state.clock.elapsedTime;
        ref.current.uResolution.set(size.width, size.height);
    });

    return (
        <mesh scale={[2, 2, 1]}>
            <planeGeometry args={[1, 1]} />
            {/* @ts-ignore */}
            <gridShaderMaterial ref={ref} />
        </mesh>
    );
}