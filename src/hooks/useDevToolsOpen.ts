"use client";

import { useEffect, useRef } from "react";

const DEVTOOLS_THRESHOLD = 160;

export function useDevToolsOpen(onOpen: () => void) {
  const onOpenRef = useRef(onOpen);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    onOpenRef.current = onOpen;
  }, [onOpen]);

  useEffect(() => {
    const check = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      const isOpen =
        widthDiff > DEVTOOLS_THRESHOLD || heightDiff > DEVTOOLS_THRESHOLD;

      if (isOpen && !wasOpenRef.current) {
        onOpenRef.current();
      }

      wasOpenRef.current = isOpen;
    };

    const intervalId = window.setInterval(check, 500);
    window.addEventListener("resize", check);
    check();

    return () => {
      window.removeEventListener("resize", check);
      window.clearInterval(intervalId);
    };
  }, []);
}
