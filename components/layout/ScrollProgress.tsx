"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[70] h-0.5 w-full origin-left bg-orange"
      style={{ scaleX, opacity: reducedMotion ? 0 : opacity }}
    />
  );
}

export { ScrollProgress };
