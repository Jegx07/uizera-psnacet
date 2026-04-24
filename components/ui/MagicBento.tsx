"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import "./MagicBento.css";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "250, 100, 0";
const MOBILE_BREAKPOINT = 768;

type MagicCardItem = {
  title: string;
  description: string;
  label: string;
  color?: string;
};

type MagicBentoProps = {
  cards?: MagicCardItem[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
};

type ParticleCardProps = {
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
};

const defaultCardData: MagicCardItem[] = [
  { title: "Workshops", description: "Hands-on learning sessions covering UiPath Studio, Studio Web, and practical RPA workflows.", label: "Learn", color: "#fffaf6" },
  { title: "Competitions", description: "Friendly challenges that sharpen problem solving, speed, and automation confidence.", label: "Compete", color: "#fff9f2" },
  { title: "Guest Lectures", description: "Industry sessions that bring real-world automation stories and career context to campus.", label: "Experts", color: "#fffaf6" },
  { title: "Networking", description: "Connections with peers, mentors, and alumni who are building automation careers.", label: "Connect", color: "#fff9f2" },
  { title: "Portfolio", description: "Students leave with proofs of work, demo flows, and project stories they can show.", label: "Showcase", color: "#fffaf6" },
  { title: "Collaboration", description: "Team-based building that turns individual effort into a club-wide momentum loop.", label: "Team", color: "#fff9f2" },
];

function createParticleElement(x: number, y: number, color = DEFAULT_GLOW_COLOR): HTMLDivElement {
  const el = document.createElement("div");
  el.className = "magic-bento-particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.5);
    pointer-events: none;
    z-index: 20;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
}

function calculateSpotlightValues(radius: number): { proximity: number; fadeDistance: number } {
  return { proximity: radius * 0.5, fadeDistance: radius * 0.75 };
}

function updateCardGlowProperties(card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number): void {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--magic-glow-x", `${relativeX}%`);
  card.style.setProperty("--magic-glow-y", `${relativeY}%`);
  card.style.setProperty("--magic-glow-intensity", glow.toString());
  card.style.setProperty("--magic-glow-radius", `${radius}px`);
}

function ParticleCard({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}: ParticleCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () => createParticleElement(Math.random() * width, Math.random() * height, glowColor));
    particlesInitialized.current = true;
  }, [glowColor, particleCount]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => particle.parentNode?.removeChild(particle),
      });
    });

    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = window.setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }, index * 90);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

    const handleMouseEnter = (): void => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, { rotateX: 5, rotateY: 5, duration: 0.3, ease: "power2.out", transformPerspective: 1000 });
      }
    };

    const handleMouseLeave = (): void => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
      }

      if (enableMagnetism) {
        gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleMouseMove = (e: MouseEvent): void => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        gsap.to(element, { rotateX, rotateY, duration: 0.1, ease: "power2.out", transformPerspective: 1000 });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.04;
        const magnetY = (y - centerY) * 0.04;
        magnetismAnimationRef.current = gsap.to(element, { x: magnetX, y: magnetY, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleClick = (e: MouseEvent): void => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));

      const ripple = document.createElement("div");
      ripple.className = "magic-bento-ripple";
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.35) 0%, rgba(${glowColor}, 0.15) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 30;
      `;

      element.appendChild(ripple);
     gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() });
   };

   element.addEventListener("mouseenter", handleMouseEnter);
   element.addEventListener("mouseleave", handleMouseLeave);
   element.addEventListener("mousemove", handleMouseMove);
   element.addEventListener("click", handleClick);

   return () => {
     isHoveredRef.current = false;
     element.removeEventListener("mouseenter", handleMouseEnter);
     element.removeEventListener("mouseleave", handleMouseLeave);
     element.removeEventListener("mousemove", handleMouseMove);
     element.removeEventListener("click", handleClick);
     clearAllParticles();
   };
 }, [animateParticles, clearAllParticles, clickEffect, disableAnimations, enableMagnetism, enableTilt, glowColor]);

 return (
   <div ref={cardRef} className={`${className} magic-bento-particle-container`} style={{ ...style, position: "relative", overflow: "hidden" }}>
     {children}
   </div>
 );
}

function GlobalSpotlight({
 gridRef,
 disableAnimations = false,
 enabled = true,
 spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
 glowColor = DEFAULT_GLOW_COLOR,
}: {
 gridRef: React.RefObject<HTMLDivElement | null>;
 disableAnimations?: boolean;
 enabled?: boolean;
 spotlightRadius?: number;
 glowColor?: string;
}) {
 const spotlightRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
   if (disableAnimations || !gridRef?.current || !enabled) return;

   const spotlight = document.createElement("div");
   spotlight.className = "magic-bento-global-spotlight";
   spotlight.style.cssText = `
     position: fixed;
     width: 700px;
     height: 700px;
     border-radius: 50%;
     pointer-events: none;
     background: radial-gradient(circle,
       rgba(${glowColor}, 0.12) 0%,
       rgba(${glowColor}, 0.08) 16%,
       rgba(${glowColor}, 0.04) 30%,
       rgba(${glowColor}, 0.02) 45%,
       transparent 70%
     );
     z-index: 120;
     opacity: 0;
     transform: translate(-50%, -50%);
     mix-blend-mode: screen;
   `;
   document.body.appendChild(spotlight);
   spotlightRef.current = spotlight;

   const handleMouseMove = (e: MouseEvent): void => {
     if (!spotlightRef.current || !gridRef.current) return;
     const section = gridRef.current.closest(".magic-bento-section");
     const rect = section?.getBoundingClientRect();

     const inside = Boolean(rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
     const cards = gridRef.current.querySelectorAll(".magic-bento-card");

     if (!inside) {
       gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
       cards.forEach((card) => {
         (card as HTMLElement).style.setProperty("--magic-glow-intensity", "0");
       });
       return;
     }

     const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
     let minDistance = Number.POSITIVE_INFINITY;

     cards.forEach((card) => {
       const el = card as HTMLElement;
       const cardRect = el.getBoundingClientRect();
       const centerX = cardRect.left + cardRect.width / 2;
       const centerY = cardRect.top + cardRect.height / 2;
       const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
       const effective = Math.max(0, distance);
       minDistance = Math.min(minDistance, effective);

       let glowIntensity = 0;
       if (effective <= proximity) glowIntensity = 1;
       else if (effective <= fadeDistance) glowIntensity = (fadeDistance - effective) / (fadeDistance - proximity);

       updateCardGlowProperties(el, e.clientX, e.clientY, glowIntensity, spotlightRadius);
     });

     gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: "power2.out" });
     const targetOpacity = minDistance <= proximity ? 0.75 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.75 : 0;
     gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: "power2.out" });
   };

   const handleMouseLeave = (): void => {
     gridRef.current?.querySelectorAll(".magic-bento-card").forEach((card) => {
       (card as HTMLElement).style.setProperty("--magic-glow-intensity", "0");
     });
     if (spotlightRef.current) {
       gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
     }
   };

   document.addEventListener("mousemove", handleMouseMove);
   document.addEventListener("mouseleave", handleMouseLeave);

   return () => {
     document.removeEventListener("mousemove", handleMouseMove);
     document.removeEventListener("mouseleave", handleMouseLeave);
     spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
   };
 }, [disableAnimations, enabled, glowColor, gridRef, spotlightRadius]);

 return null;
}

function useMobileDetection(): boolean {
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
   const checkMobile = (): void => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
   checkMobile();
   window.addEventListener("resize", checkMobile);
   return () => window.removeEventListener("resize", checkMobile);
 }, []);

 return isMobile;
}

function MagicBento({
 cards = defaultCardData,
 textAutoHide = true,
 enableStars = true,
 enableSpotlight = true,
 enableBorderGlow = true,
 disableAnimations = false,
 spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
 particleCount = DEFAULT_PARTICLE_COUNT,
 enableTilt = true,
 glowColor = DEFAULT_GLOW_COLOR,
 clickEffect = true,
 enableMagnetism = true,
}: MagicBentoProps) {
 const gridRef = useRef<HTMLDivElement>(null);
 const isMobile = useMobileDetection();
 const shouldDisableAnimations = disableAnimations || isMobile;

 return (
   <div className="magic-bento-root">
     {enableSpotlight ? (
       <GlobalSpotlight
         gridRef={gridRef}
         disableAnimations={shouldDisableAnimations}
         enabled={enableSpotlight}
         spotlightRadius={spotlightRadius}
         glowColor={glowColor}
       />
     ) : null}

     <div className="magic-bento-grid magic-bento-section" ref={gridRef}>
       {cards.map((card, index) => {
         const baseClassName = `magic-bento-card ${textAutoHide ? "magic-bento-card--text-autohide" : ""} ${enableBorderGlow ? "magic-bento-card--border-glow" : ""}`;
         const style = {
           backgroundColor: card.color || "#fffaf6",
           "--magic-theme-glow": glowColor,
         } as React.CSSProperties;

         return enableStars ? (
           <ParticleCard
             key={`${card.title}-${index}`}
             className={baseClassName}
             style={style}
             disableAnimations={shouldDisableAnimations}
             particleCount={particleCount}
             glowColor={glowColor}
             enableTilt={enableTilt}
             clickEffect={clickEffect}
             enableMagnetism={enableMagnetism}
           >
             <div className="magic-bento-card__header">
               <div className="magic-bento-card__label">{card.label}</div>
             </div>
             <div className="magic-bento-card__content">
               <h3 className="magic-bento-card__title">{card.title}</h3>
               <p className="magic-bento-card__description">{card.description}</p>
             </div>
           </ParticleCard>
         ) : (
           <div key={`${card.title}-${index}`} className={baseClassName} style={style}>
             <div className="magic-bento-card__header">
               <div className="magic-bento-card__label">{card.label}</div>
             </div>
             <div className="magic-bento-card__content">
               <h3 className="magic-bento-card__title">{card.title}</h3>
               <p className="magic-bento-card__description">{card.description}</p>
             </div>
           </div>
         );
       })}
     </div>
   </div>
 );
}

export default MagicBento;
