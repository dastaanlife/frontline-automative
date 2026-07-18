"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import CarMark from "./CarMark";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-mist pt-28 lg:pt-32"
    >
      {/* Workshop backdrop: blueprint grid + soft gold glow, standing in for the studio photograph */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            color: "#17181B",
          }}
        />
        <div className="absolute -right-16 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl lg:h-[620px] lg:w-[620px]" />
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
          className="absolute right-[-6%] top-1/2 hidden w-[62%] -translate-y-1/2 text-ink/90 sm:block lg:right-0 lg:w-[54%]"
        >
          <CarMark className="w-full text-ink/80" strokeWidth={1.2} />
        </motion.div>
      </div>

      {/* White wipe: opaque on the left where copy sits, dissolving toward the illustration */}
      <div className="pointer-events-none absolute inset-0 bg-hero-wipe" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-16 lg:pb-32 lg:pt-16">
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
