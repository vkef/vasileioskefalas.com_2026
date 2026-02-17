"use client";

import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import { useDevToolsOpen } from "@/hooks/useDevToolsOpen";
import { runConsoleGreeting } from "@/utils/consoleGreeting";
import BlinkingCursor from "@/components/ui/BlinkingCursor";

function formatLogInTime(date: Date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${days[date.getDay()]} ${months[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")} ${hh}:${mm}:${ss}`;
}

function getClientInfo() {
  if (typeof window === "undefined") return null;

  const parser = new UAParser();
  const result = parser.getResult();

  return [
    `logintime: ${formatLogInTime(new Date())} | browser: ${result.browser.name ?? "Unknown"} ${result.browser.version ?? ""} | os: ${result.os.name ?? "Unknown"} ${result.os.version ?? ""}`,
  ];
}

const STATIC_LINES = [
  "visitor@vasileioskefalas:~$ loading"
];

export default function LoaderOverlay() {
    const [visible, setVisible] = useState(true);
    const [lines, setLines] = useState<string[]>([]);
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const [terminalLines, setTerminalLines] = useState<string[]>([]);
    const TYPE_SPEED_MS = 12;
    const LINE_PAUSE_MS = 1000;

    useEffect(() => {
      const clientInfo = getClientInfo();
      setTerminalLines([
        ...(clientInfo ?? []),
        ...STATIC_LINES,
      ]);
    }, []);

    // --- typing effect ---
    useEffect(() => {
        if (!visible) return;

        if (lineIndex >= terminalLines.length) {
            const timeout = setTimeout(() => setVisible(false), LINE_PAUSE_MS);
            return () => clearTimeout(timeout);
        }

        const currentLine = terminalLines[lineIndex];

        const lineLength = currentLine ? currentLine.length : 0;

        const timeout = setTimeout(() => {
            if (charIndex < lineLength) {
                setCharIndex((c) => c + 1);
                return;
            }

            setLines((l) => [...l, currentLine]);
            setLineIndex((i) => i + 1);
            setCharIndex(0);
        }, charIndex < lineLength ? TYPE_SPEED_MS : LINE_PAUSE_MS);

        return () => clearTimeout(timeout);
    }, [charIndex, lineIndex, visible, terminalLines]);

    useDevToolsOpen(() => {
      runConsoleGreeting();
    });

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black text-[#c8ffdf] font-mono text-xs tracking-wide">
            <div className="p-6 space-y-1">
                {lines.map((line, i) => {
                  const isLastCommittedLine = i === lines.length - 1;
                  const typingComplete = lineIndex >= terminalLines.length;

                  return (
                    <div key={i}>
                      {line}
                      {typingComplete && isLastCommittedLine && (
                        <BlinkingCursor className="terminal-cursor"  />
                      )}
                    </div>
                  );
                })}

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
                    <BlinkingCursor className="terminal-cursor"  />
                  </div>
                )}

            </div>

            <style jsx global>{`
  .terminal-cursor {
    margin-left: 2px;
  }

  .char-noise {
    opacity: 0.6;
    filter: blur(0.6px);
    animation: noise-flicker 100ms steps(1) 2;
  }

  @keyframes noise-flicker {
    50% { opacity: 0.2; }
  }
`}</style>
        </div>
    );
    
}
