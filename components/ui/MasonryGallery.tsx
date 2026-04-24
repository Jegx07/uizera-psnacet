"use client";

import Image from "next/image";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type GalleryItemProps = {
  image: string;
  alt: string;
  width: number;
  height: number;
  span?: "col-span-2" | "row-span-2" | "col-span-2 row-span-2" | "";
  index: number;
  onClick: (index: number) => void;
};

function MasonryGalleryItem({ image, alt, width, height, span = "", index, onClick }: GalleryItemProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      className={cn("relative group overflow-hidden rounded-2xl bg-gray-100 cursor-pointer", span)}
      onClick={() => onClick(index)}
    >
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30 flex items-end justify-start p-4">
        <p className="text-white text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {alt}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

interface MasonryGalleryProps {
  items: Array<{
    image: string;
    alt: string;
    width: number;
    height: number;
  }>;
  onItemClick: (index: number) => void;
}

function MasonryGallery({ items, onItemClick }: MasonryGalleryProps) {
  const masonrySpans = ["", "", "col-span-2", "", "", "row-span-2", "", "", "col-span-2 row-span-2"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {items.map((item, index) => (
        <MasonryGalleryItem
          key={`${item.alt}-${index}`}
          {...item}
          span={masonrySpans[index % masonrySpans.length] as any}
          index={index}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}

export { MasonryGallery, MasonryGalleryItem };
