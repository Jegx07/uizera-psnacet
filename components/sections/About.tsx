"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BriefcaseBusiness, GraduationCap, Network, Presentation, Trophy, Users } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { StatCounter } from "@/components/ui/StatCounter";
import { TextReveal } from "@/components/ui/TextReveal";

const featureCards = [
  {
    title: "Workshops",
    description: "Hands-on learning sessions covering UiPath Studio, Studio Web, and practical RPA workflows.",
    icon: GraduationCap,
    span: "lg:col-span-2",
  },
  {
    title: "Competitions",
    description: "Friendly challenges that sharpen problem solving, speed, and automation confidence.",
    icon: Trophy,
    span: "",
  },
  {
    title: "Guest Lectures",
    description: "Industry sessions that bring real-world automation stories and career context to campus.",
    icon: Presentation,
    span: "",
  },
  {
    title: "Networking",
    description: "Connections with peers, mentors, and alumni who are building automation careers.",
    icon: Network,
    span: "",
  },
  {
    title: "Portfolio",
    description: "Students leave with proofs of work, demo flows, and project stories they can show.",
    icon: BriefcaseBusiness,
    span: "lg:col-span-2",
  },
  {
    title: "Collaboration",
    description: "Team-based building that turns individual effort into a club-wide momentum loop.",
    icon: Users,
    span: "",
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
    <section id="about" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              <h2 className="max-w-3xl text-[clamp(28px,4vw,48px)] font-bold leading-[1.02] tracking-[-0.04em] text-gray-900">
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

          <div className="grid gap-4 lg:grid-cols-4">
            {featureCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                  className={card.span}
                >
                  <Card interactive className="group relative h-full overflow-hidden p-6 transition-all duration-300">
                    <div className="absolute left-0 top-0 h-full w-1 bg-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 top-0 h-1 bg-orange-pale opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="flex h-full flex-col gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-pale text-orange transition-transform duration-300 group-hover:-translate-y-0.5">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-[20px] font-semibold tracking-[-0.04em] text-gray-900">{card.title}</h3>
                      <p className="text-[15px] leading-7 text-gray-700">{card.description}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { About };
