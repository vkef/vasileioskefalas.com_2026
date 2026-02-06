"use client";

import { useDevToolsOpen } from "@/hooks/useDevToolsOpen";
import { runConsoleGreeting } from "@/utils/consoleGreeting";

export default function DevToolsGreeting() {
  useDevToolsOpen(() => {
    runConsoleGreeting();
  });

  return null;
}
