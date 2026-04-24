"use client";

import Image from "next/image";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Badge } from "@/components/ui/Badge";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";
import { galleryFilters, galleryItems } from "@/lib/data/gallery";
import type { GalleryCategory, GalleryItem } from "@/types";

type GalleryFilter = GalleryCategory;

function Gallery() {
  const reducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = React.useState<GalleryFilter>("All");
  const filteredItems = React.useMemo(
    () => (activeFilter === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter)),
    [activeFilter],
  );

  const openLightbox = React.useCallback(async (index: number): Promise<void> => {
    const [{ default: PhotoSwipeLightbox }] = await Promise.all([import("photoswipe/lightbox")]);
    const lightbox = new PhotoSwipeLightbox({
      dataSource: filteredItems.map((item) => ({
        src: item.image,
        width: item.width,
        height: item.height,
        alt: item.alt,
      })),
      pswpModule: () => import("photoswipe"),
      showHideAnimationType: "fade",
    });

    lightbox.init();
    lightbox.loadAndOpen(index);
    lightbox.on("close", () => {
      lightbox.destroy();
    });
  }, [filteredItems]);

  return (
    <section id="gallery" className="bg-white py-20 sm:py-24">
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
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange">Gallery</div>
              <h2 className="mt-2 text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.04em] text-gray-900">
                <TextReveal text="Moments from workshops, talks, and campus energy" />
              </h2>
              <p className="mt-3 max-w-2xl text-[16px] leading-8 text-gray-700">
                A visual archive of the sessions and community moments that keep UI Zera Club active across the semester.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {galleryFilters.map((filter) => {
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
          </div>

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filteredItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                data-cursor="link"
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
                onClick={() => void openLightbox(index)}
                className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 text-left"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    unoptimized
                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#fa6400]/0 transition-colors duration-300 group-hover:bg-[#fa6400]/88" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Badge variant="dark" className="border-white/15 bg-white/15 text-white">{item.category}</Badge>
                    <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.04em]">{item.title}</h3>
                    <p className="mt-2 max-w-md text-[14px] leading-7 text-white/88">{item.caption}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { Gallery };
