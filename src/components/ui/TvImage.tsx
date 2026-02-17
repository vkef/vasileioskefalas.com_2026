"use client";

import { useEffect, useRef, useState } from "react";

export default function TvImage({ src, alt }: { src: string; alt: string }) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const lastDrawRef = useRef(0);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrapper = wrapperRef.current;
        if (!canvas || !wrapper) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const rect = wrapper.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.max(1, Math.floor(rect.width * dpr));
            canvas.height = Math.max(1, Math.floor(rect.height * dpr));
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const drawNoise = () => {
            if (!hovered) return;
            const now = performance.now();
            if (now - lastDrawRef.current < 80) {
                rafRef.current = requestAnimationFrame(drawNoise);
                return;
            }
            lastDrawRef.current = now;
            const rect = wrapper.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;
            ctx.clearRect(0, 0, w, h);

            const bandCount = 3 + Math.floor(Math.random() * 3);
            for (let i = 0; i < bandCount; i += 1) {
                const bandY = Math.random() * h;
                const bandH = 6 + Math.random() * 18;
                ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
                ctx.fillRect(0, bandY, w, bandH);
            }

            const noiseAmount = Math.floor((w * h) / 220);
            ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
            for (let i = 0; i < noiseAmount; i += 1) {
                const x = Math.floor(Math.random() * w);
                const y = Math.floor(Math.random() * h);
                const size = Math.random() > 0.92 ? 2 : 1;
                ctx.fillRect(x, y, size, size);
            }

            ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
            for (let i = 0; i < noiseAmount * 0.6; i += 1) {
                const x = Math.floor(Math.random() * w);
                const y = Math.floor(Math.random() * h);
                ctx.fillRect(x, y, 1, 1);
            }

            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            for (let y = 0; y < h; y += 3) {
                ctx.fillRect(0, y, w, 1);
            }

            rafRef.current = requestAnimationFrame(drawNoise);
        };

        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(wrapper);

        if (hovered) {
            rafRef.current = requestAnimationFrame(drawNoise);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            observer.disconnect();
        };
    }, [hovered]);

    return (
        <div
            ref={wrapperRef}
            className="tv-screen relative aspect-square w-full overflow-hidden origin-bottom-right md:scale-[1.2]"
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            <img src={src} alt={alt} className="tv-screen__image h-full w-full object-cover" />
            <canvas ref={canvasRef} className="tv-noise pointer-events-none absolute inset-0" />
        </div>
    );
}
