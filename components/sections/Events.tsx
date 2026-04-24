"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock3, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";
import { eventFilters, pastEvents, upcomingEvent } from "@/lib/data/events";
import type { EventItem, EventType } from "@/types";

const tabs = ["Upcoming", "Past Events"] as const;

type TabKey = (typeof tabs)[number];
type PastFilter = "All" | EventType;

interface CountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const emptyCountdown: CountdownState = { days: "00", hours: "00", minutes: "00", seconds: "00" };

function formatUnit(value: number): string {
  return String(value).padStart(2, "0");
}

function getCountdown(targetDate: string): CountdownState {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const difference = Math.max(target - now, 0);

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: formatUnit(days),
    hours: formatUnit(hours),
    minutes: formatUnit(minutes),
    seconds: formatUnit(seconds),
  };
}

function Events() {
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = React.useState<TabKey>("Upcoming");
  const [activeFilter, setActiveFilter] = React.useState<PastFilter>("All");
  const [countdown, setCountdown] = React.useState<CountdownState>(emptyCountdown);

  React.useEffect(() => {
    const updateCountdown = (): void => setCountdown(getCountdown(upcomingEvent.dateValue));
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const visiblePastEvents = React.useMemo(() => {
    if (activeFilter === "All") {
      return pastEvents;
    }

    return pastEvents.filter((event) => event.type === activeFilter);
  }, [activeFilter]);

  return (
    <section id="events" className="bg-gray-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">Events</div>
              <h2 className="mt-2 text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.04em] text-gray-900">
                <TextReveal text="Automations, workshops, and campus momentum" />
              </h2>
              <p className="mt-3 max-w-2xl text-[16px] leading-8 text-gray-700">
                The club runs a steady rhythm of learning sessions, talks, and challenge-driven events that keep students building and sharing.
              </p>
            </div>

            <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-[0_10px_24px_rgba(10,10,10,0.04)]">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    data-cursor="button"
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "rounded-full px-5 py-2 text-[14px] font-semibold transition-colors",
                      isActive ? "bg-orange text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    )}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {activeTab === "Upcoming" ? (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4"
            >
              <Card className="overflow-hidden border-orange/30 bg-white p-0 shadow-[0_20px_50px_rgba(250,100,0,0.12)] ring-1 ring-orange/10">
                <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="border-b border-gray-200 bg-orange-pale p-6 lg:border-b-0 lg:border-r lg:border-gray-200 lg:p-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">
                      Featured Event
                    </div>
                    <h3 className="mt-4 max-w-xl text-[clamp(24px,3vw,38px)] font-bold tracking-[-0.04em] text-gray-900">
                      {upcomingEvent.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[16px] leading-8 text-gray-700">{upcomingEvent.summary}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-[14px] text-gray-700">
                      <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2">
                        <Clock3 className="h-4 w-4 text-orange" />
                        {upcomingEvent.dateLabel}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2">
                        <MapPin className="h-4 w-4 text-orange" />
                        {upcomingEvent.location}
                      </span>
                    </div>
                    {upcomingEvent.tag ? <Badge variant="soft" className="mt-6">{upcomingEvent.tag}</Badge> : null}
                  </div>

                  <div className="p-6 lg:p-8">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">Countdown</div>
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        { label: "Days", value: countdown.days },
                        { label: "Hours", value: countdown.hours },
                        { label: "Mins", value: countdown.minutes },
                        { label: "Secs", value: countdown.seconds },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-gray-200 bg-gray-100 p-4 text-center">
                          <div className="font-mono text-[clamp(28px,5vw,42px)] font-bold tracking-[-0.04em] text-gray-900">{item.value}</div>
                          <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">{item.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-3 rounded-2xl border border-gray-200 bg-white p-5">
                      <div className="flex items-center justify-between text-[13px] text-gray-700">
                        <span>Registration is open</span>
                        <span className="text-orange">Limited seats</span>
                      </div>
                      <Button asChild variant="primary" size="lg" className="w-full group">
                        <a href={upcomingEvent.ctaHref} data-cursor="button">
                          <span>{upcomingEvent.ctaLabel}</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {eventFilters.map((filter) => {
                  const isActive = activeFilter === filter;

                  return (
                    <button
                      key={filter}
                      type="button"
                      data-cursor="button"
                      onClick={() => setActiveFilter(filter)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors",
                        isActive ? "border-orange bg-orange text-white" : "border-gray-200 bg-white text-gray-700 hover:border-orange hover:bg-orange-pale hover:text-gray-900",
                      )}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visiblePastEvents.map((event, index) => (
                  <motion.article
                    key={event.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
                  >
                    <EventCard event={event} />
                  </motion.article>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: EventItem }) {
  return (
    <Card interactive className="group h-full overflow-hidden p-0">
      <div className="border-l-4 border-orange p-6 transition-colors duration-300 group-hover:bg-orange-pale">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex rounded-full bg-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
              {event.dateLabel}
            </div>
            <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.04em] text-gray-900">{event.title}</h3>
          </div>
          {event.tag ? <Badge variant="soft">{event.tag}</Badge> : null}
        </div>

        <div className="mt-4 space-y-2 text-[14px] text-gray-700">
          {event.speaker ? <p className="font-medium text-gray-900">{event.speaker}</p> : null}
          <p>{event.summary}</p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 text-[13px] text-gray-700">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-orange" />
            {event.location}
          </span>
          <span className="text-gray-400">{event.type}</span>
        </div>
      </div>
    </Card>
  );
}

export { Events };
