"use client";

import { useEffect, useState } from "react";

export default function CursorTracker() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isHoveringLink, setIsHoveringLink] = useState(false);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
        const updateEnabled = () => setEnabled(mediaQuery.matches);
        updateEnabled();
        mediaQuery.addEventListener("change", updateEnabled);

        if (!mediaQuery.matches) {
            return () => mediaQuery.removeEventListener("change", updateEnabled);
        }

        const onMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", onMove);

        const onMouseOver = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (
            target.closest(
              "a, button, [role='button'], [role='link'], [data-cursor='large']"
            )
          ) {
            setIsHoveringLink(true);
          } else {
            setIsHoveringLink(false);
          }
        };

        window.addEventListener("mouseover", onMouseOver);

        return () => {
          mediaQuery.removeEventListener("change", updateEnabled);
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseover", onMouseOver);
        };
    }, []);

    if (!enabled) return null;

    return (
        <div
            className="pointer-events-none fixed z-[9999] mix-blend-difference"
            style={{
                left: pos.x,
                top: pos.y,
                transform: "translate(-50%, -50%)",
            }}
        >
            <div
              className={`bg-white opacity-90 transition-all duration-150 ease-out ${
                isHoveringLink ? "w-10 h-[3px]" : "w-5 h-[2px]"
              }`}
            />
        </div>
    );
}
