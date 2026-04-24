"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CursorPosition {
  x: number;
  y: number;
}

function CustomCursorRenderer() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isLink, setIsLink] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.dataset.cursor;
      setIsLink(cursorType === "link" || cursorType === "button");
    };

    const handleMouseLeave = () => {
      setIsLink(false);
    };

    const handleMouseDown = () => {
      setIsVisible(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsVisible(true), 100);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("mousedown", handleMouseDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <motion.div
        animate={{ x: position.x, y: position.y, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "tween", duration: 0 }}
        className="pointer-events-none fixed z-[9999]"
        style={{
          width: isLink ? "32px" : "12px",
          height: isLink ? "32px" : "12px",
          marginLeft: isLink ? "-16px" : "-6px",
          marginTop: isLink ? "-16px" : "-6px",
        }}
      >
        <div
          className={`h-full w-full rounded-full border-2 ${
            isLink ? "border-orange bg-orange/10" : "border-gray-900 bg-gray-900/20"
          } transition-colors duration-200`}
        />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        animate={{ x: position.x, y: position.y, opacity: isVisible ? 0.5 : 0 }}
        transition={{ type: "tween", duration: 0.05 }}
        className="pointer-events-none fixed z-[9998]"
        style={{
          width: isLink ? "48px" : "24px",
          height: isLink ? "48px" : "24px",
          marginLeft: isLink ? "-24px" : "-12px",
          marginTop: isLink ? "-24px" : "-12px",
        }}
      >
        <div
          className={`h-full w-full rounded-full border ${
            isLink ? "border-orange/30" : "border-gray-900/20"
          } transition-colors duration-200`}
        />
      </motion.div>
    </>
  );
}

export { CustomCursorRenderer };
