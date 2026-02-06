"use client";

import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import { useDevToolsOpen } from "@/hooks/useDevToolsOpen";
import { runConsoleGreeting } from "@/utils/consoleGreeting";

function getClientInfo() {
  if (typeof window === "undefined") return null;

  const parser = new UAParser();
  const result = parser.getResult();

  return [
    `BROWSER        : ${result.browser.name ?? "Unknown"} ${result.browser.version ?? ""}`,
    `OS             : ${result.os.name ?? "Unknown"} ${result.os.version ?? ""}`,
    `LANGUAGE       : ${navigator.language}`,
    `TIMEZONE       : ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
    `RESOLUTION     : ${window.screen.width}x${window.screen.height}`,
  ];
}

const STATIC_LINES = [
  "LOADING SITE  IN PROGRESS",
  "SETTING TYPE   (PS/UPS MONO)",
  "SETTING COLOR  (#00ff99, #ffffff)",
  "SERVER IP      (10.10.40.11)",
  "PROTOCOL       (HTTP/1.1)",
  "",
  "WELCOME TO VASILEIOS",
  "",
  "TYPE: (3D & WEB)",
  "YEAR: (2026)",
  "TEAM: (1 HUMAN)",
  "LOCATION: (EARTH)"
];

export default function LoaderOverlay() {
    const [visible, setVisible] = useState(true);
    const [lines, setLines] = useState<string[]>([]);
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const [terminalLines, setTerminalLines] = useState<string[]>([]);

    useEffect(() => {
      const clientInfo = getClientInfo();
      setTerminalLines([
        ...STATIC_LINES.slice(0, 4),
        ...(clientInfo ?? []),
        "",
        ...STATIC_LINES.slice(4),
      ]);
    }, []);

    // --- typing effect ---
    useEffect(() => {
        if (!visible) return;

        if (lineIndex >= terminalLines.length) {
            // minimum screen time (3s)
            const timeout = setTimeout(() => setVisible(false), 3000);
            return () => clearTimeout(timeout);
        }

        const currentLine = terminalLines[lineIndex];

        const timeout = setTimeout(() => {
            if (charIndex < (currentLine ? currentLine.length : 0)) {
                setCharIndex((c) => c + 1);
            } else {
                setLines((l) => [...l, currentLine]);
                setLineIndex((i) => i + 1);
                setCharIndex(0);
            }
        }, 24); // typing speed

        return () => clearTimeout(timeout);
    }, [charIndex, lineIndex, visible, terminalLines]);

    useDevToolsOpen(() => {
      runConsoleGreeting();
    });

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black text-[#c8ffdf] font-mono text-xs tracking-wide">
            <div className="p-6 space-y-1">
                {lines.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}

                {/* active typing line */}
                {lineIndex < terminalLines.length && (
                  <div>
                    {terminalLines[lineIndex]
                      ?.slice(0, charIndex)
                      .split("")
                      .map((char, i) => (
                        <span
                          key={i}
                          className={Math.random() < 0.06 ? "char-noise" : ""}
                          style={{ display: "inline-block" }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    <span className="terminal-cursor">▊</span>
                  </div>
                )}
            </div>

            <style jsx global>{`
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }

  .terminal-cursor {
    margin-left: 2px;
    animation: blink 1s steps(1) infinite;
  }

  .char-noise {
    opacity: 0.6;
    filter: blur(0.6px);
    animation: noise-flicker 120ms steps(1) infinite;
  }

  @keyframes noise-flicker {
    50% { opacity: 0.2; }
  }
`}</style>
        </div>
    );
    
}
