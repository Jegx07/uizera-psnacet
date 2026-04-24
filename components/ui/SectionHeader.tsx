import * as React from "react";

import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
  className?: string;
}

function SectionHeader({ eyebrow, title, description, align = "left", action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow ? <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">{eyebrow}</div> : null}
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        <h2 className="text-[clamp(28px,4vw,48px)] font-bold leading-[1.02] tracking-[-0.04em] text-gray-900">{title}</h2>
      </div>
      {description ? <p className={cn("max-w-2xl text-[16px] leading-7 text-gray-700", align === "center" && "mx-auto")}>{description}</p> : null}
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export { SectionHeader };
