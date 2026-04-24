import Link from "next/link";
import { Linkedin, Mail, Instagram, ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Email", href: "mailto:uizeraclub@psnacet.edu.in", icon: Mail },
  { label: "LinkedIn", href: "#contact", icon: Linkedin },
  { label: "Instagram", href: "#contact", icon: Instagram },
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8 lg:py-16">
        <div className="space-y-4">
          <Link href="#home" className="inline-flex items-center gap-2 text-[24px] font-bold tracking-[-0.04em]" data-cursor="link">
            <span>UI Zera</span>
            <span className="text-orange">•</span>
          </Link>
          <p className="max-w-md text-[15px] leading-7 text-white/72">
            UiPath RPA student community at PSNA College of Engineering and Technology, building a confident automation culture through workshops, talks, and hands-on events.
          </p>
          <a
            href="https://www.uipath.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] font-medium text-white/82 transition-colors hover:border-orange hover:text-white"
            data-cursor="link"
          >
            UiPath inspired
            <ArrowUpRight className="h-4 w-4 text-orange" />
          </a>
        </div>

        <div>
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/45">Navigation</div>
          <div className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="link"
                className="text-[15px] text-white/78 transition-colors hover:text-orange"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/45">Connect</div>
          <div className="flex flex-col gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  data-cursor="link"
                  className="inline-flex items-center gap-3 text-[15px] text-white/78 transition-colors hover:text-orange"
                >
                  <Icon className="h-4 w-4 text-orange" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-[13px] text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 UI Zera Club, PSNA CET. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built for UiPath community culture
            <span className="rounded-full border border-orange/30 bg-orange/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">
              UiPath
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
