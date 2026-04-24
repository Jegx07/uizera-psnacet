import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";

const trustLogos = ["UiPath", "PSNA College", "CSBS", "UiZera", "UiPath Academy", "Automation Club"];

function LogoMarquee() {
  return (
    <section className="border-y border-gray-200 bg-gray-100 py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InfiniteMarquee items={trustLogos} itemClassName="text-gray-400 hover:text-gray-900" />
      </div>
    </section>
  );
}

export { LogoMarquee };
