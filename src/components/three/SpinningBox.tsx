"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";

export function SpinningBox({ scale, ...props }: any) {
    const ref = useRef<any>();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    useCursor(hovered);

    useFrame((_, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x += delta;
        ref.current.rotation.y += delta;
    });

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? scale * 1.4 : scale * 1.2}
            onClick={() => click(!clicked)}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
        >
            <boxGeometry />
            <meshStandardMaterial color={hovered ? "white" : "black"} />
        </mesh>
    );
}