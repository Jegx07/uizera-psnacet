"use client";

import { motion, useReducedMotion } from "framer-motion";

interface DecorativeSeparatorProps {
  variant?: "line" | "dots" | "gradient";
  className?: string;
}

function DecorativeSeparator({ variant = "line", className = "" }: DecorativeSeparatorProps) {
  const reducedMotion = useReducedMotion();

  if (variant === "dots") {
    return (
      <div className={`flex gap-3 justify-center items-center ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="w-2 h-2 rounded-full bg-orange"
          />
        ))}
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <svg className={`w-full h-1 ${className}`} viewBox="0 0 400 2" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sep-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fa6400" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="1"
          x2="400"
          y2="1"
          stroke="url(#sep-gradient)"
          strokeWidth="2"
          initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={reducedMotion ? undefined : { pathLength: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    );
  }

  // Default line variant
  return (
    <motion.div
      initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={reducedMotion ? undefined : { scaleX: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`h-1 bg-gradient-to-r from-orange-pale via-orange to-orange-pale origin-left ${className}`}
    />
  );
}

export { DecorativeSeparator };
