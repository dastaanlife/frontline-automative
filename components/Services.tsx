"use client";

import { motion } from "framer-motion";
import {
  ScanSearch,
  Sparkles,
  ShieldCheck,
  Wrench,
  Droplets,
  Car,
} from "lucide-react";

const services = [
  {
    icon: ScanSearch,
    title: "Vehicle Inspection",
    desc: "Comprehensive inspections to ensure peak performance and safety standards.",
  },
  {
    icon: Sparkles,
    title: "Car Detailing",
    desc: "Premium detailing services that restore brilliance inside and out.",
  },
  {
    icon: ShieldCheck,
    title: "Paint Protection Film (PPF)",
    desc: "Advanced PPF protection that shields your paint from the elements.",
  },
  {
    icon: Wrench,
    title: "Mechanical Service",
    desc: "Expert diagnostics and repair for optimal performance and reliability.",
  },
  {
    icon: Droplets,
    title: "Ceramic Coating",
    desc: "Long-lasting protection with a deep gloss, easy-care finish.",
  },
  {
    icon: Car,
    title: "Restoration & Customization",
    desc: "Restoring classics and customizing to perfection with meticulous detail.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Services() {
  return (
    <section id="services" className="section-pad bg-mist">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex items-center justify-center gap-5">
          <span className="h-px w-12 bg-gold-500 sm:w-20" />
          <h2 className="text-center font-display text-2xl font-extrabold uppercase tracking-wide text-ink sm:text-3xl">
            Our Services
          </h2>
          <span className="h-px w-12 bg-gold-500 sm:w-20" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={cardVariant}
              className="group border border-line bg-paper p-9 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-cardHover"
            >
              <span className="flex h-14 w-14 items-center justify-center border border-line text-gold-500 transition-colors duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-white">
                <Icon size={24} strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 font-display text-base font-bold uppercase tracking-wide text-ink">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
