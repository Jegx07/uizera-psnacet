import * as React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "soft" | "outline" | "dark";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  solid: "bg-orange text-white border border-orange",
  soft: "bg-orange-pale text-orange border border-orange-pale",
  outline: "bg-white text-gray-900 border border-gray-200",
  dark: "bg-black text-white border border-black",
};

function Badge({ className, variant = "soft", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
