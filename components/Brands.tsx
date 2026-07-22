"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Brand = {
  name: string;
  image: string; // filename inside /public/brands
};

const brands: Brand[] = [
  // European
  { name: "Abarth", image: "abarth.webp" },
  { name: "Alfa Romeo", image: "alpha-romeo.webp" },
  { name: "Audi", image: "audi.webp" },
  { name: "Bentley", image: "bentely.webp" },
  { name: "BMW", image: "bmw.webp" },
  { name: "Bugatti", image: "bugatti.webp" },
  { name: "Citroën", image: "citroen.webp" },
  { name: "Cupra", image: "cupra.webp" },
  { name: "Dacia", image: "dacia.webp" },
  { name: "DS Automobiles", image: "ds-automobiles.webp" },
  { name: "Ferrari", image: "ferrari.webp" },
  { name: "Fiat", image: "fiat.webp" },
  { name: "Ford", image: "ford.webp" },
  { name: "Jaguar", image: "jaguar.webp" },
  { name: "Lamborghini", image: "lamborghini.webp" },
  { name: "Lancia", image: "lancia.webp" },
  { name: "Land Rover", image: "land-rover.webp" },
  { name: "Lotus", image: "lotus.webp" },
  { name: "Maserati", image: "maserati.webp" },
  { name: "Maybach", image: "maybach.webp" },
  { name: "Mercedes-Benz", image: "mercedes.webp" },
  { name: "MINI", image: "mini.webp" },
  { name: "Opel", image: "opel.webp" },
  { name: "Peugeot", image: "peugeot.webp" },
  { name: "Porsche", image: "porsche.webp" },
  { name: "Renault", image: "renault-group.webp" },
  { name: "Rolls-Royce", image: "rolls-royce.webp" },
  { name: "Saab", image: "saab.webp" },
  { name: "SEAT", image: "seat.webp" },
  { name: "Škoda", image: "skoda-auto.webp" },
  { name: "Smart", image: "smart.webp" },
  { name: "Vauxhall", image: "vauxhall.webp" },
  { name: "Volkswagen", image: "volkswagen.webp" },
  { name: "Volvo", image: "volvo-cars.webp" },

  // Japanese
  { name: "Acura", image: "acura.webp" },
  { name: "Daihatsu", image: "daihatsu.webp" },
  { name: "Honda", image: "honda.webp" },
  { name: "Infiniti", image: "infiniti.webp" },
  { name: "Isuzu", image: "isuzu.webp" },
  { name: "Lexus", image: "lexus.webp" },
  { name: "Mazda", image: "mazda.webp" },
  { name: "Mitsubishi", image: "mitsubishi.webp" },
  { name: "Nissan", image: "nissan.webp" },
  { name: "Subaru", image: "subaru.webp" },
  { name: "Suzuki", image: "suzuki.webp" },
  { name: "Toyota", image: "toyota.webp" },

  // Korean
  { name: "Genesis", image: "genesis.webp" },
  { name: "Hyundai", image: "hyundai.webp" },
  { name: "Kia", image: "kia.webp" },
  { name: "SsangYong", image: "ssang-yong.webp" },

  // American
  { name: "Buick", image: "buick.webp" },
  { name: "Cadillac", image: "cadillac.webp" },
  { name: "Chevrolet", image: "chevrolet.webp" },
  { name: "Chrysler", image: "chrysler.webp" },
  { name: "Dodge", image: "dodge.webp" },
  { name: "GMC", image: "gmc.webp" },
  { name: "Hummer", image: "hummer.webp" },
  { name: "Jeep", image: "jeep.webp" },
  { name: "Lincoln", image: "lincoln.webp" },
  { name: "Mercury", image: "mercury.webp" },
  { name: "Oldsmobile", image: "oldsmobile.webp" },
  { name: "Pontiac", image: "pontiac.webp" },
  { name: "RAM", image: "ram.webp" },
  { name: "Saturn", image: "saturn.webp" },
  { name: "Tesla", image: "tesla.webp" },

  // Chinese & Other Asian
  { name: "BAIC", image: "basic-group.webp" },
  { name: "BYD", image: "byd.webp" },
  { name: "Changan", image: "changan-auto.webp" },
  { name: "Chery", image: "chery.webp" },
  { name: "Dongfeng", image: "dongfeng.webp" },
  { name: "FAW", image: "faw.webp" },
  { name: "Foton", image: "foton.webp" },
  { name: "GAC", image: "gac.webp" },
  { name: "Geely", image: "geely.webp" },
  { name: "Great Wall", image: "great-wall.webp" },
  { name: "Haval", image: "haval.webp" },
  // NOTE: "JAC" has no matching file in public/brands — jac.webp is missing.
  // Add the logo and uncomment the line below once it's available.
  // { name: "JAC", image: "jac.webp" },
  { name: "Leapmotor", image: "leap-motor.webp" },
  { name: "Li Auto", image: "li-auto.webp" },
  { name: "MG", image: "mg.webp" },
  { name: "NIO", image: "nio.webp" },
  { name: "Ora", image: "ora.webp" },
  { name: "XPENG", image: "xpeng.webp" },
  { name: "Zeekr", image: "zeekr.webp" },
];

// Widths tuned so exactly 2 / 3 / 4 / 5 / 6 full cards are visible at a time,
// accounting for the gap-5 (20px) spacing between cards. Adjust the math
// here if the gap value or breakpoint counts change.
const CARD_WIDTH_CLASSES =
  "w-[calc(100%-10px)] xs:w-[calc(50%-10px)] sm:w-[calc(33.3333%-13.333px)] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] xl:w-[calc(16.6667%-16.667px)]";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function Brands() {
  const trackRef = useRef<HTMLDivElement>(null);

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
    <section id="brands" className="section-pad bg-paper">
      <div className="mx-auto">
        <div className="mb-14 flex items-center justify-center gap-5">
          <span className="h-px w-12 bg-gold-500 sm:w-20" />
          <h2 className="text-center font-display text-2xl font-extrabold uppercase tracking-wide text-ink sm:text-3xl">
            Brands We Serve
          </h2>
          <span className="h-px w-12 bg-gold-500 sm:w-20" />
        </div>

        <div className="relative flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="flex h-8 w-8 flex-none items-center justify-center border border-line text-ink transition-colors duration-300 hover:border-gold-500 hover:text-gold-500 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </button>

          <motion.div
            ref={trackRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {brands.map((b) => (
              <motion.div
                key={b.name}
                data-carousel-card
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
                className={`group flex ${CARD_WIDTH_CLASSES} flex-none snap-start flex-col items-center gap-4 border border-line px-4 py-8 transition-colors duration-300 hover:border-gold-500 hover:shadow-card mt-2`}
              >
                <span className="relative flex h-16 w-26 items-center justify-center">
                  <Image
                    src={`/brands/${b.image}`}
                    alt={`${b.name} logo`}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </span>
                <span className="text-center text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                  {b.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="flex h-8 w-8 flex-none items-center justify-center border border-line text-ink transition-colors duration-300 hover:border-gold-500 hover:text-gold-500 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </button>
        </div>
      </div>
    </section>
  );
}