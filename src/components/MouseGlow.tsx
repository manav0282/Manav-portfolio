"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[60] rounded-full"
        animate={{
          x: pos.x - 6,
          y: pos.y - 6,
          scale: clicked ? 0.8 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.2 }}
        style={{
          width: 12,
          height: 12,
          background: "#00ff41",
          boxShadow: "0 0 10px #00ff41, 0 0 20px #00ff4160",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[59] rounded-full border border-green/30"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: clicked ? 1.5 : 1,
          opacity: clicked ? 0.2 : 0.4,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200, mass: 0.5 }}
        style={{ width: 40, height: 40 }}
      />
      <div
        className="fixed pointer-events-none z-[1] rounded-full"
        style={{
          left: pos.x - 200,
          top: pos.y - 200,
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(0,255,65,0.04) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
