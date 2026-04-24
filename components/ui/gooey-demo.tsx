"use client"

import { GooeyFilter } from "@/components/ui/gooey-filter"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { useScreenSize } from "@/hooks/use-screen-size"

function GooeyDemo() {
  const screenSize = useScreenSize()

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        alt="background"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />

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
