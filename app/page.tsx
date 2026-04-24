import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Events } from "@/components/sections/Events";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Team } from "@/components/sections/Team";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <LogoMarquee />
      <About />
      <Team />
      <Events />
      <Gallery />
      <JoinCTA />
      <Contact />
      <Footer />
    </main>
  );
}
