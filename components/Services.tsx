"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { useServiceModal } from "@/context/ServiceModalContext";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

// Widths tuned so exactly 1 / 2 / 3 / 4 / 5 full cards are visible at a time,
// accounting for the gap-5 (20px) spacing between cards. Adjust the math
// here if the gap value or breakpoint counts change.
const CARD_WIDTH_CLASSES =
  "w-full sm:w-[calc(50%-10px)] md:w-[calc(33.3333%-13.333px)] lg:w-[calc(25%-15px)] xl:w-[calc(20%-16px)]";

export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { openService } = useServiceModal();

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    // Step by exactly one card's rendered width (+ gap), so we always land
    // on a full card regardless of screen size.
    const firstCard = track.querySelector<HTMLElement>("[data-carousel-card]");
    const gap = parseFloat(getComputedStyle(track).columnGap || "20") || 20;
    const step = firstCard ? firstCard.offsetWidth + gap : track.clientWidth;

    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="services" className="section-pad bg-mist">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="h-px w-12 bg-gold-500 sm:w-20" />
            <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-ink sm:text-3xl">
              Our Services
            </h2>
          </div>
          <Link
            href="/services"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink transition-colors duration-300 hover:text-gold-500"
          >
            View All Services
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="relative flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="flex h-8 w-8 flex-none items-center justify-center border border-line bg-paper text-ink transition-colors duration-300 hover:border-gold-500 hover:text-gold-500 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </button>

          <motion.div
            ref={trackRef}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.button
                  key={service.slug}
                  data-carousel-card
                  variants={cardVariant}
                  onClick={() => openService(service)}
                  className={`group flex ${CARD_WIDTH_CLASSES} flex-none snap-start flex-col items-center gap-4 border border-line bg-paper p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-cardHover mt-2`}
                >
                  <span className="flex h-12 w-12 items-center justify-center border border-line text-gold-500 transition-colors duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-white">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-sm text-center font-bold uppercase leading-snug tracking-wide text-ink">
                    {service.title}
                  </h3>
                  <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-500">
                    View Details
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </motion.button>
              );
            })}

            <Link
              href="/services"
              className={`flex ${CARD_WIDTH_CLASSES} flex-none snap-start flex-col items-center justify-center gap-3 border border-dashed border-gold-500/50 bg-gold-500/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:bg-gold-500/10 mt-2`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500 text-gold-500">
                <ArrowRight size={18} />
              </span>
              <span className="font-display text-sm font-bold uppercase tracking-wide text-ink">
                View All Services
              </span>
            </Link>
          </motion.div>

          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="flex h-8 w-8 flex-none items-center justify-center border border-line bg-paper text-ink transition-colors duration-300 hover:border-gold-500 hover:text-gold-500 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </button>
        </div>
      </div>
    </section>
  );
}