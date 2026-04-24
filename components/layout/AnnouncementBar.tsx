"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

interface AnnouncementBarProps {
  className?: string;
}

const STORAGE_KEY = "uizera-announcement-dismissed";

function AnnouncementBar({ className }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const dismissed = window.sessionStorage.getItem(STORAGE_KEY) === "true";
    setIsVisible(!dismissed);
  }, []);

  const handleDismiss = (): void => {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn("relative z-[60] flex h-9 items-center border-b border-orange-dark bg-orange px-4 text-white", className)}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 text-[12px] font-medium tracking-[0.01em]">
        <div className="flex min-w-0 items-center gap-2">
          <span className="hidden rounded-full border border-white/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] sm:inline-flex">
            Announcement
          </span>
          <span className="truncate">UiPath Student Developer Meet · 21 Feb · SRL Auditorium</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden whitespace-nowrap font-semibold hover:underline sm:inline-flex">
            Register Now →
          </a>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export { AnnouncementBar };
