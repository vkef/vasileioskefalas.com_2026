"use client";

import { useEffect, useState } from "react";

export default function CursorTracker() {
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    return (
        <>
            <div
                className="pointer-events-none fixed z-[9999] mix-blend-difference"
                style={{
                    left: pos.x + 12,
                    top: pos.y + 12,
                }}
            >
                <div className="text-[10px] tracking-widest text-white font-mono leading-tight">
                    <div className="flex items-center gap-2">
                        <span className="opacity-60">X</span>
                        <span>{pos.x.toString().padStart(4, "0")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="opacity-60">Y</span>
                        <span>{pos.y.toString().padStart(4, "0")}</span>
                    </div>
                </div>
            </div>
        </>
    );
}