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

// Below `lg` the banner sits above the copy, so the wipe travels bottom -> up
// instead of right -> left. This is the single media query gate used to flip
// the clip-path axis + seam orientation on the Framer Motion layers below
// (Tailwind's `lg:` classes handle everything else purely in CSS).
const DESKTOP_QUERY = "(min-width: 1024px)";

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
  const [isDesktop, setIsDesktop] = useState(false);
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

  // Track the lg breakpoint so the wipe/seam can switch axis (horizontal on
  // desktop, vertical on mobile/tablet where the banner sits above the copy).
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

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
    <section
      id="home"
      className="relative overflow-hidden bg-white lg:bg-ink lg:pt-20"
    >
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

      {/* Layout shell: banner leads on mobile (sits flush at the very top,
          right under the transparent navbar) with copy stacked below it.
          `min-h-[100dvh]` pins the whole stack to one screen's worth of
          height on mobile/tablet (dvh instead of vh so mobile browser
          chrome showing/hiding doesn't cause a jump), and the copy block
          below is a flex-1 column that vertically centers itself in
          whatever space is left under the banner — instead of just
          trailing after a tall banner and forcing a scroll to read it.
          Reverts to the original absolute split-layout at `lg` and up. */}
      <div className="flex min-h-[100dvh] flex-col lg:block lg:min-h-0">
        {/* Precision-wipe banner slideshow. On mobile this is the very first
            thing in the section — no top padding above it — so it bleeds
            under the transparent navbar the way a hero image should.
            Height trimmed down on mobile/tablet (was 56-60vh) so the copy
            block has enough of the viewport left to sit comfortably. */}
        <div
          className="relative h-[36vh] min-h-[240px] max-h-[340px] w-full shrink-0 overflow-hidden sm:h-[42vh] sm:min-h-[300px] sm:max-h-[400px] lg:absolute lg:inset-0 lg:left-90 lg:h-auto lg:w-auto lg:min-h-0 lg:max-h-none lg:shrink lg:overflow-visible xl:left-100"
          aria-hidden="true"
        >
          {/* Base layer: the current banner, always fully visible underneath */}
          <div className="absolute inset-0">
            <Image
              src={BANNERS[index]}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </div>

          {/* Incoming layer: next banner, wipes in over the base. Right -> left
              on desktop, bottom -> up below `lg`. key={nextIndex} forces a
              remount each cycle so the clip-path always restarts from fully
              hidden before animating to fully revealed. Gated by `started` so
              this doesn't fire immediately on mount — banner1 gets to show
              fully before the first wipe. Safe to omit `priority` here since
              the preloader above already cached it. */}
          {started && (
            <>
              <motion.div
                key={nextIndex}
                initial={
                  isDesktop
                    ? { clipPath: "inset(0% 0% 0% 100%)" } // hidden sliver at the right edge
                    : { clipPath: "inset(100% 0% 0% 0%)" } // hidden sliver at the bottom edge
                }
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: WIPE_SECONDS, ease: WIPE_EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={BANNERS[nextIndex]}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover object-bottom"
                />
              </motion.div>

              {/* Traveling gold seam, synced to the same clip-path transition.
                  A vertical bar sweeping left on desktop; a horizontal bar
                  sweeping upward below `lg`. */}
              <motion.div
                key={`seam-${nextIndex}`}
                initial={isDesktop ? { left: "100%", top: 0 } : { top: "100%", left: 0 }}
                animate={isDesktop ? { left: "0%" } : { top: "0%" }}
                transition={{ duration: WIPE_SECONDS, ease: WIPE_EASE }}
                className={
                  isDesktop
                    ? "absolute inset-y-0 w-[3px] bg-gold-500 shadow-[0_0_16px_rgba(192,146,46,0.7)]"
                    : "absolute inset-x-0 h-[3px] bg-gold-500 shadow-[0_0_16px_rgba(192,146,46,0.7)]"
                }
              />
            </>
          )}

          {/* Top scrim, mobile only: since the transparent navbar floats
              directly over this image (no clearance above it), this keeps
              the nav logo/links legible against whatever banner is showing. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 via-black/10 to-transparent lg:hidden" />

          {/* Bottom fade, mobile only: blends the banner into the white copy
              block that follows it, instead of a hard cut. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent lg:hidden" />
        </div>

        {/* White wipe: opaque on the left where copy sits, dissolving toward
            the banner. Desktop-only — the stacked mobile layout gives the
            copy block its own white background instead (below), and the
            gradients above handle the banner blend on mobile. */}
        <div className="pointer-events-none absolute inset-0 hidden bg-hero-wipe lg:block" />

        {/* Copy block. On mobile/tablet this is `flex-1 justify-center` so it
            vertically centers itself in whatever room is left below the
            (now shorter) banner within the one-screen-tall wrapper above —
            that's what fixes the "text sits low, have to scroll" issue.
            Padding, gaps and type sizes are also trimmed for small screens;
            `lg:` classes below restore the exact original desktop layout. */}
        <div className="relative z-10 mx-auto flex flex-1 flex-col justify-center bg-transparent px-6 pb-8 pt-6 text-center sm:px-10 lg:flex-none lg:block lg:justify-start lg:px-16 lg:pb-32 lg:pt-10 lg:text-left">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-lg lg:max-w-xl lg:mx-0"
          >
            <motion.p variants={item} className="eyebrow mb-2 sm:mb-3 lg:mb-4">
              Precision Care. Peak Performance.
            </motion.p>
            <motion.h1
              variants={item}
              className="font-display text-[1.9rem] font-extrabold uppercase leading-[1.15] text-ink sm:text-4xl lg:text-[3.4rem]"
            >
              Luxury Automotive Care,{" "}
              <span className="text-gold-500">Precision in Motion.</span>
            </motion.h1>
            <motion.p variants={item} className="mt-3 text-sm leading-relaxed text-ink-soft sm:mt-4 sm:text-[15px] lg:mt-6">
              Excellence in every detail. From expert maintenance and precision
              inspections to detailing, repair, and protection — we keep your
              luxury performing at its absolute best.
            </motion.p>
            <motion.div
              variants={item}
              className="mt-5 flex flex-wrap justify-center gap-3 sm:mt-6 sm:gap-4 lg:mt-9 lg:justify-start"
            >
              <a
                href="#contact"
                className="btn-gold max-md:gap-1.5 max-md:px-4 max-md:py-2.5 max-md:text-sm"
              >
                Book Appointment
                <ChevronRight className="h-4 w-4 max-md:h-3.5 max-md:w-3.5" />
              </a>
              <a
                href="#services"
                className="btn-outline max-md:px-4 max-md:py-2.5 max-md:text-sm"
              >
                Explore Services
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}