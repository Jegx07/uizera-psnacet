"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { MagneticBtn } from "@/components/ui/MagneticBtn";
import { TextReveal } from "@/components/ui/TextReveal";

function JoinCTA() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-orange py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_100%)] p-8 text-white shadow-[0_24px_70px_rgba(10,10,10,0.18)] sm:p-10 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/75">Join the movement</div>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.04em] text-white">
              <TextReveal text="Ready to Automate Your Future?" />
            </h2>
            <p className="max-w-xl text-[16px] leading-8 text-white/82">
              Join UI Zera Club to learn UiPath, build confidence through practice, and contribute to a student community focused on real automation skills.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <MagneticBtn>
              <Button asChild variant="secondary" size="lg" className="group bg-white text-orange hover:bg-white hover:text-orange-dark">
                <Link href="#contact" data-cursor="button">
                  <span>Join the Club</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </MagneticBtn>
            <MagneticBtn>
              <Button asChild variant="outline" size="lg" className="group border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white">
                <Link href="#events" data-cursor="button">
                  <span>View Events</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </MagneticBtn>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { JoinCTA };
