"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";
import { coreTeamMembers, currentSdc, facultyMembers, legacyTimeline, teamFilters } from "@/lib/data/team";
import type { TeamFilter, TeamMember } from "@/types";

function Team() {
  const reducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<TeamFilter>("All");

  const filteredMembers = useMemo(() => {
    if (activeFilter === "All") {
      return coreTeamMembers;
    }

    return coreTeamMembers.filter((member) => member.department === activeFilter);
  }, [activeFilter]);

  return (
    <section id="team" className="relative bg-gray-100 py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        background: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(250, 100, 0, 0.02) 40px, rgba(250, 100, 0, 0.02) 80px)'
      }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">The People</div>
            <h2 className="max-w-4xl text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.02] tracking-[-0.04em] text-gray-900">
              <TextReveal text="Meet the faculty, champions, and student builders behind UI Zera" />
            </h2>
            <p className="max-w-2xl text-[16px] leading-8 text-gray-700">
              The club is shaped by faculty guidance, student leadership, and a team structure that keeps the community active across technical, creative, and event execution roles.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {facultyMembers.map((member, index) => {
              const offsetY = [0, -8, -4];
              return (
                <motion.div
                  key={member.name}
                  initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                  style={{ transform: `translateY(${offsetY[index]}px)` }}
                >
                  <Card interactive className="h-full p-6 group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange/0 via-orange/0 to-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    <div className="flex items-center gap-4 relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Image
                          src={member.image}
                          alt={member.alt}
                          width={88}
                          height={88}
                          unoptimized
                          className="h-20 w-20 rounded-full border-2 border-gray-200 object-cover group-hover:border-orange transition-colors duration-300"
                        />
                      </motion.div>
                      <div>
                        <Badge variant="soft">Faculty</Badge>
                        <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.04em] text-gray-900 group-hover:text-orange transition-colors duration-300">{member.name}</h3>
                        <p className="mt-1 text-[15px] text-gray-700">{member.role}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <Card className="overflow-hidden border-orange/20 bg-orange-pale p-0">
            <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">Current SDC</div>
                <h3 className="mt-3 text-[clamp(24px,3vw,36px)] font-bold tracking-[-0.04em] text-gray-900">{currentSdc.name}</h3>
                <p className="mt-2 max-w-2xl text-[16px] leading-8 text-gray-700">{currentSdc.role}</p>
              </div>
              <div className="md:justify-self-end">
                <Badge variant="solid">Student Developer Champion</Badge>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">Legacy SDC Timeline</div>
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
              <svg viewBox="0 0 1200 180" className="hidden h-44 w-full md:block" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  d="M 80 90 H 1120"
                  fill="none"
                  stroke="#E5E5E5"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
                {legacyTimeline.map((entry, index) => {
                  const x = 120 + index * 350;

                  return (
                    <g key={entry.year}>
                      <circle cx={x} cy="90" r="34" fill="#FFF4EC" stroke="#FA6400" strokeWidth="3" />
                      <image href={entry.avatar} x={x - 28} y="62" width="56" height="56" clipPath="circle(28px at 28px 28px)" />
                    </g>
                  );
                })}
              </svg>
              <div className="grid gap-4 md:hidden">
                {legacyTimeline.map((entry) => (
                  <div key={entry.year} className="rounded-2xl border border-gray-200 bg-gray-100 p-4">
                    <div className="flex items-center gap-4">
                      <Image src={entry.avatar} alt={entry.name} width={64} height={64} unoptimized className="rounded-full border border-gray-200" />
                      <div>
                        <Badge variant="soft">{entry.year}</Badge>
                        <h4 className="mt-2 text-[18px] font-semibold text-gray-900">{entry.name}</h4>
                        <p className="text-[14px] text-gray-700">{entry.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 hidden grid-cols-3 gap-4 md:grid">
                {legacyTimeline.map((entry) => (
                  <div key={entry.year} className="flex flex-col items-center text-center">
                    <Badge variant="soft">{entry.year}</Badge>
                    <Image src={entry.avatar} alt={entry.name} width={72} height={72} unoptimized className="mt-4 rounded-full border border-gray-200" />
                    <h4 className="mt-4 text-[18px] font-semibold text-gray-900">{entry.name}</h4>
                    <p className="mt-1 text-[14px] text-gray-700">{entry.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">Core Team</div>
                <h3 className="mt-2 text-[clamp(24px,3vw,36px)] font-bold tracking-[-0.04em] text-gray-900">17 members, one workflow</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {teamFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    data-cursor="button"
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors",
                      activeFilter === filter
                        ? "border-orange bg-orange text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-orange hover:bg-orange-pale hover:text-gray-900",
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
                >
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface MemberCardProps {
  member: TeamMember;
}

function MemberCard({ member }: MemberCardProps) {
  return (
    <Card interactive className="group h-full p-5">
      <div className="flex items-center gap-4">
        <Image src={member.image} alt={member.alt} width={72} height={72} unoptimized className="h-16 w-16 rounded-full border border-gray-200 object-cover" />
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">{member.department}</div>
          <h4 className="mt-1 truncate text-[18px] font-semibold tracking-[-0.04em] text-gray-900">{member.name}</h4>
          <p className="mt-1 text-[14px] text-gray-700">{member.role}</p>
        </div>
      </div>
    </Card>
  );
}

export { Team };
