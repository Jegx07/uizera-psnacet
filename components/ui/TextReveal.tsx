"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}

function TextReveal({ text, className, wordClassName, delay = 0 }: TextRevealProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          className={cn("inline-block will-change-transform", wordClassName)}
          initial={reducedMotion ? false : { opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: delay + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </span>
  );
}

export { TextReveal };
