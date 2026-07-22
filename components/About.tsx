"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UserCheck, Cpu, Award, Aperture } from "lucide-react";
import CarMark from "./CarMark";

const features = [
  { icon: UserCheck, label: "Certified Experts" },
  { icon: Cpu, label: "Advanced Technology" },
  { icon: Award, label: "Premium Experience" },
  { icon: Aperture, label: "Precision Guaranteed" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function About() {
  return (
    <section id="about" className="section-pad bg-paper">
      <div className="mx-auto grid items-center gap-16 lg:grid-cols-2 lg:gap-14">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="eyebrow mb-4">About Us</p>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl">
            Driven by Passion.{" "}
            <span className="text-gold-500">Defined by Precision.</span>
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
            Front Line Automotive is a luxury automotive service center
            dedicated to preserving, restoring, and enhancing the world&apos;s
            most exceptional vehicles. Our certified experts combine
            cutting-edge technology with meticulous craftsmanship to deliver
            unmatched results and an ownership experience like no other.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center border border-line text-gold-500 transition-colors duration-300 hover:border-gold-500">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <span className="text-xs text-center font-semibold uppercase tracking-wide text-ink">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="relative aspect-[4/3] overflow-hidden bg-ink"
        >
          <Image
            src="/img/banner5.webp"
            alt="About Front Line Automotive"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
