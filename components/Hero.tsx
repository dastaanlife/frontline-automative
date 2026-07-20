"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Drop banner1.webp ... banner4.webp into /public (or update these paths
// if you keep them in a subfolder, e.g. "/hero/banner1.webp").
const BANNERS = ["/img/banner1.webp", "/img/banner4.webp", "/img/banner3.webp"];

const DISPLAY_MS = 3000; // how long each banner holds before the next wipe
const WIPE_SECONDS = 1; // duration of the wipe transition itself
const WIPE_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState<boolean[]>(() => BANNERS.map(() => false));
  const [allLoaded, setAllLoaded] = useState(false);
  const nextIndex = (index + 1) % BANNERS.length;

  const markLoaded = (i: number) => {
    setLoaded((prev) => {
      if (prev[i]) return prev; // already marked, avoid extra renders
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  // Flip allLoaded once every banner has actually finished loading.
  useEffect(() => {
    if (loaded.every(Boolean)) setAllLoaded(true);
  }, [loaded]);

  // Slideshow only starts once every image is guaranteed to be in cache —
  // this is what prevents the wipe from ever revealing a blank/unloaded image.
  useEffect(() => {
    if (!allLoaded) return;
    let isFirstTick = true;
    const id = setInterval(() => {
      if (isFirstTick) {
        // First tick only reveals the wipe layer — it does NOT advance the
        // index yet. This lets banner1 hold on screen for the full
        // DISPLAY_MS before any wipe starts.
        isFirstTick = false;
        setStarted(true);
      } else {
        setIndex((i) => (i + 1) % BANNERS.length);
      }
    }, DISPLAY_MS);
    return () => clearInterval(id);
  }, [allLoaded]);

  return (
    <section id="home" className="relative overflow-hidden bg-ink pt-20">
      {/* Invisible preloader: forces the browser to fetch every banner through
          the same Next/Image optimizer URL (same `sizes`) that the visible
          slots use below, so by the time a wipe needs an image it's already
          cached and paints instantly. */}
      <div
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      >
        {BANNERS.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority
            onLoad={() => markLoaded(i)}
          />
        ))}
      </div>

      {/* Precision-wipe banner slideshow */}
      <div className="absolute inset-0 left-100" aria-hidden="true">
        {/* Base layer: the current banner, always fully visible underneath */}
        <div className="absolute inset-0">
          <Image
            src={BANNERS[index]}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Incoming layer: next banner, wipes in over the base from right to left.
            key={nextIndex} forces a remount each cycle so the clip-path always
            restarts from fully hidden before animating to fully revealed.
            Gated by `started` so this doesn't fire immediately on mount —
            banner1 gets to show fully before the first wipe. Safe to omit
            `priority` here since the preloader above already cached it. */}
        {started && (
          <>
            <motion.div
              key={nextIndex}
              initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: WIPE_SECONDS, ease: WIPE_EASE }}
              className="absolute inset-0"
            >
              <Image
                src={BANNERS[nextIndex]}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>

            {/* Traveling gold seam, synced to the same clip-path transition */}
            <motion.div
              key={`seam-${nextIndex}`}
              initial={{ left: "100%" }}
              animate={{ left: "0%" }}
              transition={{ duration: WIPE_SECONDS, ease: WIPE_EASE }}
              className="absolute inset-y-0 w-[3px] bg-gold-500 shadow-[0_0_16px_rgba(192,146,46,0.7)]"
            />
          </>
        )}
      </div>

      {/* White wipe: opaque on the left where copy sits, dissolving toward the banner */}
      <div className="pointer-events-none absolute inset-0 bg-hero-wipe" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-16 lg:pb-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.p variants={item} className="eyebrow mb-4">
            Precision Care. Peak Performance.
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-4xl font-extrabold uppercase leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]"
          >
            Luxury Automotive Care,{" "}
            <span className="text-gold-500">Precision in Motion.</span>
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Excellence in every detail. From expert maintenance and precision
            inspections to detailing, repair, and protection — we keep your
            luxury performing at its absolute best.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <a href="#contact" className="btn-gold">
              Book Appointment
              <ChevronRight size={16} />
            </a>
            <a href="#services" className="btn-outline">
              Explore Services
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}