import * as React from "react";

import { cn } from "@/lib/utils";

export interface InfiniteMarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: string;
}

function InfiniteMarquee({ items, className, itemClassName, separator }: InfiniteMarqueeProps) {
  const marqueeItems = React.useMemo(() => [...items, ...items], [items]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex min-w-max animate-[marquee_30s_linear_infinite] items-center gap-10 hover:[animation-play-state:paused]">
        {marqueeItems.map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            {separator ? <span className={cn("text-[16px] text-gray-400", itemClassName)}>{separator}</span> : null}
            <span
              className={cn("text-[13px] font-medium uppercase tracking-[0.14em] text-gray-400 transition-colors duration-300 hover:text-gray-900", itemClassName)}
            >
              {item}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export { InfiniteMarquee };
