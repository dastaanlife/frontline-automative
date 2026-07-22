"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { useServiceModal } from "@/context/ServiceModalContext";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ServicesGrid() {
  const { openService } = useServiceModal();

  return (
    <section className="section-pad !pt-0 bg-paper sm:!pt-0">
      <div className="mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={service.slug}
                variants={cardVariant}
                onClick={() => openService(service)}
                className="group flex flex-col items-start border border-line bg-paper p-9 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-cardHover"
              >
                <span className="flex h-14 w-14 items-center justify-center border border-line text-gold-500 transition-colors duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-white">
                  <Icon size={24} strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 font-display text-base font-bold uppercase tracking-wide text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {service.summary}
                </p>
                <span className="mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-500">
                  View Details
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
