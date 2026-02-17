"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const CHARSET = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%";
export function MatrixOverlay({ scale = 1, ...props }: any) {
    const textureRef = useRef<THREE.CanvasTexture | null>(null);
    const noiseUntil = useRef(0);

    const { canvas, ctx, grid, flicker, cols, rows, fontSize } = useMemo(() => {
        const canvas = document.createElement("canvas");
        const size = 512;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        const fontSize = 9;
        const cols = Math.floor(size / fontSize);
        const rows = Math.floor(size / fontSize);
        const grid = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () =>
                CHARSET[Math.floor(Math.random() * CHARSET.length)]
            )
        );
        const flicker = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => Math.random())
        );
        if (ctx) {
            ctx.font = `${fontSize}px monospace`;
            ctx.textBaseline = "top";
        }
        return { canvas, ctx, grid, flicker, cols, rows, fontSize };
    }, []);

    useFrame((state) => {
        if (!ctx || !textureRef.current) return;
        const color = "#2a8a73";
        const updateCount = Math.floor((rows * cols) * 0.07);
        const time = state.clock.elapsedTime;
        const scan = (time * 40) % canvas.height;
        const isNoisy = time < noiseUntil.current;

        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = color;

        for (let i = 0; i < updateCount; i += 1) {
            const index = Math.floor(Math.random() * rows * cols);
            const r = Math.floor(index / cols);
            const c = index % cols;
            grid[r][c] = CHARSET[Math.floor(Math.random() * CHARSET.length)];
            flicker[r][c] = Math.random();
        }

        for (let r = 0; r < rows; r += 1) {
            const y = r * fontSize;
            const rowFade = Math.max(0, 1 - (r / rows) * 1.25);
            const scanBoost = Math.max(0, 1 - Math.abs(y - scan) / (fontSize * 2));
            for (let c = 0; c < cols; c += 1) {
                const base = 0.15 + 0.85 * flicker[r][c];
                const alpha = rowFade * base + scanBoost * 0.2;
                if (alpha < 0.03) continue;
                const noiseDim = isNoisy ? 0.5 : 1;
                ctx.globalAlpha = Math.min(1, alpha * noiseDim);
                ctx.fillText(grid[r][c], c * fontSize, y);
            }
        }
        ctx.globalAlpha = 1;

        if (isNoisy) {
            const bandCount = 3 + Math.floor(Math.random() * 3);
            for (let i = 0; i < bandCount; i += 1) {
                const bandY = Math.random() * canvas.height;
                const bandH = 6 + Math.random() * 14;
                ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
                ctx.fillRect(0, bandY, canvas.width, bandH);
            }

            const noiseAmount = Math.floor((canvas.width * canvas.height) / 350);
            ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
            for (let i = 0; i < noiseAmount; i += 1) {
                const x = Math.floor(Math.random() * canvas.width);
                const y = Math.floor(Math.random() * canvas.height);
                const size = Math.random() > 0.94 ? 2 : 1;
                ctx.fillRect(x, y, size, size);
            }
        }

        textureRef.current.needsUpdate = true;
    });

    const meshScale = scale;

    return (
        <mesh
            {...props}
            scale={meshScale}
            onClick={() => {
                const now = performance.now() / 1000;
                noiseUntil.current = Math.max(noiseUntil.current, now) + 0.6;
            }}
        >
            <planeGeometry args={[12, 12]} />
            <meshBasicMaterial toneMapped={false}>
                <canvasTexture ref={textureRef} attach="map" args={[canvas]} />
            </meshBasicMaterial>
        </mesh>
    );
}
