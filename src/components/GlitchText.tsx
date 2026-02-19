"use client";

import { useState, useEffect, useCallback } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  hover?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>{}[]";

export default function GlitchText({
  text,
  className = "",
  delay = 0,
  speed = 30,
  hover = false,
}: GlitchTextProps) {
  const [display, setDisplay] = useState(text.replace(/[^\s]/g, " "));
  const [revealed, setRevealed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const scramble = useCallback(
    (targetText: string, onDone?: () => void) => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplay(
          targetText
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iteration) return targetText[i];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        iteration += 1 / 2;
        if (iteration >= targetText.length) {
          clearInterval(interval);
          setDisplay(targetText);
          onDone?.();
        }
      }, speed);
      return interval;
    },
    [speed]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      scramble(text, () => setRevealed(true));
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, scramble]);

  useEffect(() => {
    if (!hover || !revealed) return;
    if (isHovering) {
      const interval = scramble(text);
      return () => clearInterval(interval);
    }
  }, [isHovering, hover, revealed, text, scramble]);

  return (
    <span
      className={className}
      onMouseEnter={() => hover && setIsHovering(true)}
      onMouseLeave={() => hover && setIsHovering(false)}
      style={{ display: "inline-block" }}
    >
      {display}
    </span>
  );
}
