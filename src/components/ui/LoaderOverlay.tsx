"use client";

import { useEffect, useState } from "react";

type Props = {
    oncePerSession?: boolean;
    durationMs?: number;
};

const LOADER_TEXT = "loading_";
const CURSOR = "_";

export default function LoaderOverlay({
                                          oncePerSession = true,
                                          durationMs = 3000,
                                      }: Props) {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [typed, setTyped] = useState("");

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (oncePerSession) {
            const seen = sessionStorage.getItem("intro_seen") === "1";
            if (seen) {
                setVisible(false);
                return;
            }
        }

        const timer = setTimeout(() => {
            setFadeOut(true);
            sessionStorage.setItem("intro_seen", "1");

            // Remove from DOM after fade
            setTimeout(() => setVisible(false), 600);
        }, durationMs);

        return () => clearTimeout(timer);
    }, [oncePerSession, durationMs]);

    useEffect(() => {
        if (!visible) return;

        setTyped("");
        let index = 0;

        const interval = setInterval(() => {
            setTyped(LOADER_TEXT.slice(0, index + 1));
            index += 1;

            if (index >= LOADER_TEXT.length) {
                clearInterval(interval);
                setTyped(LOADER_TEXT); // lock final text
            }
        }, 120);

        return () => clearInterval(interval);
    }, [visible]);

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white transition-opacity duration-500 ${
                fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
            <div className="flex flex-col items-center gap-4">
                <div className="text-sm font-mono tracking-[0.22em] flex">
                    <span>{typed.replace(/_$/, "")}</span>
                    <span
                        className="ml-[0.1em]"
                        style={{
                            animation: "terminal-blink 1s steps(1, end) infinite",
                        }}
                    >
                        {typed.endsWith(CURSOR) ? CURSOR : ""}
                    </span>
                </div>

                <div className="w-64 overflow-hidden rounded-full bg-white/10">
                    <div className="h-1 w-full bg-white/80 animate-pulse" />
                </div>
            </div>
            <style jsx global>{`
              @keyframes terminal-blink {
                0% { opacity: 1; }
                50% { opacity: 0; }
                100% { opacity: 1; }
              }
            `}</style>
        </div>
    );
}