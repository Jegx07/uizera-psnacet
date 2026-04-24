"use client"

import dynamic from "next/dynamic"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { PixelTrail } from "@/components/ui/pixel-trail"
import Beams from "@/components/ui/Beams"
import { useScreenSize } from "@/hooks/use-screen-size"

const PillNav = dynamic(() => import("@/components/ui/PillNav"), { ssr: false })

function GooeyDemo() {
  const screenSize = useScreenSize()
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Events", href: "#events" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 h-full w-full opacity-75">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute top-5 left-1/2 z-20 hidden -translate-x-[-14%] lg:block">
        <PillNav
          items={navItems}
          activeHref="#home"
          className="hero-pill-nav"
          ease="power2.easeOut"
          baseColor="#111111"
          pillColor="#fa6400"
          hoveredPillTextColor="#fa6400"
          pillTextColor="#111111"
          initialLoadAnimation
        />
      </div>

      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />

      <div className="absolute inset-0" style={{ filter: "url(#gooey-filter-pixel-trail)" }}>
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 24 : 32}
          fadeDuration={300}
          delay={100}
          pixelClassName="bg-white"
        />
      </div>

      <div className="z-10 mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center">
        <p className="rounded-full border border-white/20 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75 backdrop-blur-md">
          UiPath Student Community
        </p>
        <h1
          className="text-[clamp(2.6rem,8vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.04em] !text-white"
          style={{ color: "#ffffff" }}
        >
          Automate the Future with UI Zera Club
        </h1>
        <p className="max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
          Learn RPA, build meaningful automation projects, and grow with a focused student community.
        </p>
      </div>
    </div>
  )
}

export default GooeyDemo
