"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  detail?: string;
  className?: string;
}

function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (): void => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

function StatCounter({ value, suffix = "+", label, detail, className }: StatCounterProps) {
  const reducedMotion = useReducedMotion();
  const [currentValue, setCurrentValue] = React.useState(reducedMotion ? value : 0);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (reducedMotion) {
      setCurrentValue(value);
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        const duration = 1400;
        const start = window.performance.now();

        const animate = (timestamp: number): void => {
          const elapsed = timestamp - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCurrentValue(Math.round(value * eased));

          if (progress < 1) {
            window.requestAnimationFrame(animate);
          }
        };

        window.requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [reducedMotion, value]);

  return (
    <div ref={ref} className={cn("rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-orange hover:shadow-[0_16px_36px_rgba(10,10,10,0.06)]", className)}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">{label}</div>
      <div className="mt-2 text-[clamp(32px,4vw,54px)] font-bold leading-none tracking-[-0.04em] text-gray-900">
        {currentValue}
        {suffix}
      </div>
      {detail ? <p className="mt-3 max-w-xs text-[15px] leading-7 text-gray-700">{detail}</p> : null}
    </div>
  );
}

export { StatCounter };
