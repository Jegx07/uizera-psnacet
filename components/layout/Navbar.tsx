"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { NavLink, SectionId } from "@/types";

const navLinks: NavLink[] = [
  { label: "Home", href: "#home", section: "home" },
  { label: "About", href: "#about", section: "about" },
  { label: "Team", href: "#team", section: "team" },
  { label: "Events", href: "#events", section: "events" },
  { label: "Gallery", href: "#gallery", section: "gallery" },
  { label: "Contact", href: "#contact", section: "contact" },
];

interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  const [activeSection, setActiveSection] = React.useState<SectionId>("home");
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = (): void => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.section))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id as SectionId);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.15, 0.25, 0.35, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md", isScrolled && "shadow-[0_12px_32px_rgba(10,10,10,0.08)]", className)}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center gap-2 text-[20px] font-bold tracking-[-0.04em] text-gray-900" data-cursor="link">
          <span>UI Zera</span>
          <span className="text-orange">•</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.section;

            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="link"
                className={cn(
                  "relative text-[14px] font-medium tracking-[-0.01em] text-gray-700 transition-colors hover:text-gray-900",
                  isActive && "text-gray-900",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-2 h-0.5 origin-left scale-x-0 rounded-full bg-orange transition-transform duration-300",
                    isActive && "scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <Button asChild variant="primary" size="md">
            <Link href="#contact" data-cursor="button">
              Join Club
            </Link>
          </Button>
        </div>

        <button
          type="button"
          data-cursor="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 text-gray-900 transition-colors hover:border-orange hover:bg-orange-pale lg:hidden"
          onClick={() => setIsMenuOpen((value) => !value)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-gray-200 bg-white lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.section;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-cursor="link"
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl border border-transparent px-3 py-3 text-[15px] font-medium text-gray-700 transition-colors hover:border-gray-200 hover:bg-gray-100 hover:text-gray-900",
                      isActive && "border-orange bg-orange-pale text-gray-900",
                    )}
                  >
                    <span>{link.label}</span>
                    <span className="text-orange">→</span>
                  </Link>
                );
              })}
              <Button asChild variant="primary" size="lg" className="mt-2 w-full">
                <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                  Join Club
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export { Navbar, navLinks };
