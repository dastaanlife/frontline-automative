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
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { openService } = useServiceModal();

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
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

        <div className="relative flex items-center gap-4">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="hidden h-10 w-10 flex-none items-center justify-center border border-line bg-paper text-ink transition-colors duration-300 hover:border-gold-500 hover:text-gold-500 sm:flex"
          >
            <ChevronLeft size={18} />
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
                  variants={cardVariant}
                  onClick={() => openService(service)}
                  className="group flex w-[210px] flex-none snap-start flex-col items-start gap-4 border border-line bg-paper p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-cardHover"
                >
                  <span className="flex h-12 w-12 items-center justify-center border border-line text-gold-500 transition-colors duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-white">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-sm font-bold uppercase leading-snug tracking-wide text-ink">
                    {service.title}
                  </h3>
                  <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View Details
                    <ArrowRight size={13} />
                  </span>
                </motion.button>
              );
            })}

            <Link
              href="/services"
              className="flex w-[210px] flex-none snap-start flex-col items-center justify-center gap-3 border border-dashed border-gold-500/50 bg-gold-500/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:bg-gold-500/10"
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
            className="hidden h-10 w-10 flex-none items-center justify-center border border-line bg-paper text-ink transition-colors duration-300 hover:border-gold-500 hover:text-gold-500 sm:flex"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
