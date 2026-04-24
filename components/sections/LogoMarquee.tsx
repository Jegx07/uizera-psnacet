import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";

const trustLogos = [
  "UiPath Academy",
  "Automation Club",
  "UiPath",
  "PSNA College",
  "CSBS",
  "UiZera",
  "Student Community",
  "RPA Builders",
];

function LogoMarquee() {
  return (
    <section className="relative overflow-hidden bg-black py-14 sm:py-16">
      <div className="pointer-events-none absolute left-1/2 top-[61%] h-20 w-[130%] -translate-x-1/2 -translate-y-1/2 rotate-[2.6deg] bg-gradient-to-r from-[#a63e00] via-[#d35400] to-[#a63e00] opacity-95" />

      <div className="absolute left-1/2 top-[52%] z-[1] w-[132%] -translate-x-1/2 -translate-y-1/2 -rotate-[2.1deg] overflow-hidden rounded-sm border-y border-orange/30 bg-black/95 py-2 shadow-[0_14px_34px_rgba(0,0,0,0.55)]">
        <InfiniteMarquee
          items={trustLogos}
          separator="✦"
          className="px-4"
          itemClassName="text-orange/35 text-[clamp(11px,1.05vw,18px)] font-semibold tracking-[0.16em]"
        />
      </div>

      <div className="relative z-10 mx-auto mt-7 w-[125%] -translate-x-[10%] -rotate-[2.1deg] border-y border-orange/30 bg-gradient-to-r from-[#f24500] via-[#fa6400] to-[#f24500] py-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
        <InfiniteMarquee
          items={trustLogos}
          separator="✦"
          className="px-4"
          itemClassName="text-white hover:text-white/85 text-[clamp(14px,1.3vw,32px)] font-bold tracking-[0.18em]"
        />
      </div>
    </section>
  );
}

export { LogoMarquee };
