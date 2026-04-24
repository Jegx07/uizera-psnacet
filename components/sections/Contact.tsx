"use client";

import { Instagram, Linkedin, Mail, MapPin, Copy, Check } from "lucide-react";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TextReveal } from "@/components/ui/TextReveal";

const emailAddress = "uizeraclub@psnacet.edu.in";

function Contact() {
  const reducedMotion = useReducedMotion();
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = async (): Promise<void> => {
    await navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="bg-gray-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 lg:grid-cols-3"
        >
          <Card className="lg:col-span-2">
            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">Contact</div>
                <h2 className="mt-2 text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.04em] text-gray-900">
                  <TextReveal text="Reach the club, book a session, or ask about joining" />
                </h2>
                <p className="mt-3 max-w-2xl text-[16px] leading-8 text-gray-700">
                  UI Zera Club is based at PSNA College of Engineering and Technology, CSBS Department. We welcome students who want to learn automation, contribute to events, or partner on ideas.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-white p-5">
                  <div className="flex items-center gap-3 text-gray-900">
                    <Mail className="h-5 w-5 text-orange" />
                    <span className="text-[15px] font-semibold">Email</span>
                  </div>
                  <p className="mt-3 text-[15px] text-gray-700">{emailAddress}</p>
                  <Button type="button" variant="outline" size="sm" className="mt-4 w-full justify-center gap-2" onClick={() => void handleCopyEmail()}>
                    {copied ? <Check className="h-4 w-4 text-orange" /> : <Copy className="h-4 w-4 text-orange" />}
                    <span>{copied ? "Copied" : "Copy email"}</span>
                  </Button>
                </Card>

                <Card className="bg-white p-5">
                  <div className="flex items-center gap-3 text-gray-900">
                    <MapPin className="h-5 w-5 text-orange" />
                    <span className="text-[15px] font-semibold">Location</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-7 text-gray-700">
                    PSNA College of Engineering and Technology, CSBS Department, Dindigul, Tamil Nadu.
                  </p>
                  <Badge variant="soft" className="mt-4">Campus based</Badge>
                </Card>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">Follow</div>
              <div className="mt-4 flex flex-col gap-3">
                <SocialRow href="#contact" icon={Linkedin} label="LinkedIn" />
                <SocialRow href="#contact" icon={Instagram} label="Instagram" />
                <SocialRow href={`mailto:${emailAddress}`} icon={Mail} label="Mail" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">Next step</div>
              <p className="mt-3 text-[15px] leading-7 text-gray-700">
                If you want a workshop, demo session, or collaboration, start with an email and we will route it to the right team.
              </p>
              <Button asChild variant="primary" size="lg" className="mt-5 w-full">
                <a href={`mailto:${emailAddress}`} data-cursor="button">
                  <span>Send an Email</span>
                </a>
              </Button>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface SocialRowProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

function SocialRow({ href, icon: Icon, label }: SocialRowProps) {
  return (
    <a
      href={href}
      data-cursor="link"
      className="inline-flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-[15px] font-medium text-gray-900 transition-colors hover:border-orange hover:bg-orange-pale"
    >
      <span className="inline-flex items-center gap-3">
        <Icon className="h-4 w-4 text-orange" />
        {label}
      </span>
      <span className="text-orange">→</span>
    </a>
  );
}

export { Contact };
