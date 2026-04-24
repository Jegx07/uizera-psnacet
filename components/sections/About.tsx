"use client";

import { motion, useReducedMotion } from "framer-motion";

import MagicBento from "@/components/ui/MagicBento";
import { StatCounter } from "@/components/ui/StatCounter";
import { TextReveal } from "@/components/ui/TextReveal";

const bentoCards = [
  {
    title: "Workshops",
    description: "Hands-on learning sessions covering UiPath Studio, Studio Web, and practical RPA workflows.",
    label: "Learn",
    color: "#fffaf6",
  },
  {
    title: "Competitions",
    description: "Friendly challenges that sharpen problem solving, speed, and automation confidence.",
    label: "Compete",
    color: "#fff9f2",
  },
  {
    title: "Guest Lectures",
    description: "Industry sessions that bring real-world automation stories and career context to campus.",
    label: "Experts",
    color: "#fffaf6",
  },
  {
    title: "Networking",
    description: "Connections with peers, mentors, and alumni who are building automation careers.",
    label: "Connect",
    color: "#fff9f2",
  },
  {
    title: "Portfolio",
    description: "Students leave with proofs of work, demo flows, and project stories they can show.",
    label: "Showcase",
    color: "#fffaf6",
  },
  {
    title: "Collaboration",
    description: "Team-based building that turns individual effort into a club-wide momentum loop.",
    label: "Team",
    color: "#fff9f2",
  },
];

const stats = [
  { value: 25, label: "Workshops hosted" },
  { value: 17, label: "Core team members" },
  { value: 3, label: "Years building community" },
];

function About() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="relative bg-white py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
        background: 'radial-gradient(circle at 20% 40%, rgba(250, 100, 0, 0.06), transparent 40%), radial-gradient(circle at 80% 60%, rgba(250, 100, 0, 0.03), transparent 35%)'
      }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">Who We Are</div>
              <h2 className="max-w-3xl text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.02] tracking-[-0.04em] text-gray-900">
                <TextReveal text="Building Tomorrow's RPA Leaders Today" />
              </h2>
              <p className="max-w-2xl text-[16px] leading-8 text-gray-700">
                UI Zera Club is the UiPath student community at PSNA College of Engineering and Technology. We bring students into a disciplined automation practice through sessions, demos, and collaborative problem solving.
              </p>
              <p className="max-w-2xl text-[16px] leading-8 text-gray-700">
                The club exists to help students move from first principles to portfolio-ready automation work, with a culture that values clean workflows, reusable thinking, and visible output.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => (
                <StatCounter
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  className="bg-gray-100"
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagicBento
              cards={bentoCards}
              textAutoHide
              enableStars
              enableSpotlight
              enableBorderGlow
              enableTilt
              enableMagnetism
              clickEffect
              spotlightRadius={280}
              particleCount={10}
              glowColor="250, 100, 0"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export { About };
