"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const brands = [
  // European
  { name: "Abarth", initial: "AB" },
  { name: "Alfa Romeo", initial: "AR" },
  { name: "Audi", initial: "AU" },
  { name: "Bentley", initial: "B" },
  { name: "BMW", initial: "BMW" },
  { name: "Bugatti", initial: "BG" },
  { name: "Citroën", initial: "CT" },
  { name: "Cupra", initial: "CP" },
  { name: "Dacia", initial: "DC" },
  { name: "DS Automobiles", initial: "DS" },
  { name: "Ferrari", initial: "F" },
  { name: "Fiat", initial: "FI" },
  { name: "Ford", initial: "FD" },
  { name: "Jaguar", initial: "J" },
  { name: "Lamborghini", initial: "L" },
  { name: "Lancia", initial: "LC" },
  { name: "Land Rover", initial: "LR" },
  { name: "Lotus", initial: "LT" },
  { name: "Maserati", initial: "MS" },
  { name: "Maybach", initial: "MY" },
  { name: "Mercedes-Benz", initial: "MB" },
  { name: "MINI", initial: "MINI" },
  { name: "Opel", initial: "OP" },
  { name: "Peugeot", initial: "PG" },
  { name: "Porsche", initial: "P" },
  { name: "Renault", initial: "RN" },
  { name: "Rolls-Royce", initial: "RR" },
  { name: "Saab", initial: "SB" },
  { name: "SEAT", initial: "SEAT" },
  { name: "Škoda", initial: "SK" },
  { name: "Smart", initial: "SM" },
  { name: "Vauxhall", initial: "VX" },
  { name: "Volkswagen", initial: "VW" },
  { name: "Volvo", initial: "VO" },

  // Japanese
  { name: "Acura", initial: "AC" },
  { name: "Daihatsu", initial: "DH" },
  { name: "Honda", initial: "H" },
  { name: "Infiniti", initial: "IN" },
  { name: "Isuzu", initial: "IS" },
  { name: "Lexus", initial: "LX" },
  { name: "Mazda", initial: "MZ" },
  { name: "Mitsubishi", initial: "MT" },
  { name: "Nissan", initial: "N" },
  { name: "Subaru", initial: "SU" },
  { name: "Suzuki", initial: "SZ" },
  { name: "Toyota", initial: "TY" },

  // Korean
  { name: "Genesis", initial: "GN" },
  { name: "Hyundai", initial: "HY" },
  { name: "Kia", initial: "K" },
  { name: "SsangYong", initial: "SY" },

  // American
  { name: "Buick", initial: "BK" },
  { name: "Cadillac", initial: "CD" },
  { name: "Chevrolet", initial: "CH" },
  { name: "Chrysler", initial: "CR" },
  { name: "Dodge", initial: "DG" },
  { name: "GMC", initial: "GMC" },
  { name: "Hummer", initial: "HM" },
  { name: "Jeep", initial: "JP" },
  { name: "Lincoln", initial: "LN" },
  { name: "Mercury", initial: "MC" },
  { name: "Oldsmobile", initial: "OL" },
  { name: "Pontiac", initial: "PT" },
  { name: "RAM", initial: "RAM" },
  { name: "Saturn", initial: "ST" },
  { name: "Tesla", initial: "TS" },

  // Chinese & Other Asian
  { name: "BAIC", initial: "BAIC" },
  { name: "BYD", initial: "BYD" },
  { name: "Changan", initial: "CG" },
  { name: "Chery", initial: "CY" },
  { name: "Dongfeng", initial: "DF" },
  { name: "FAW", initial: "FAW" },
  { name: "Foton", initial: "FT" },
  { name: "GAC", initial: "GAC" },
  { name: "Geely", initial: "GE" },
  { name: "Great Wall", initial: "GW" },
  { name: "Haval", initial: "HV" },
  { name: "JAC", initial: "JAC" },
  { name: "Leapmotor", initial: "LP" },
  { name: "Li Auto", initial: "LA" },
  { name: "MG", initial: "MG" },
  { name: "NIO", initial: "NIO" },
  { name: "Ora", initial: "OR" },
  { name: "XPENG", initial: "XP" },
  { name: "Zeekr", initial: "ZK" },
];

// Widths tuned so exactly 2 / 3 / 4 / 5 / 6 full cards are visible at a time,
// accounting for the gap-5 (20px) spacing between cards. Adjust the math
// here if the gap value or breakpoint counts change.
const CARD_WIDTH_CLASSES =
  "w-[calc(50%-10px)] sm:w-[calc(33.3333%-13.333px)] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] xl:w-[calc(16.6667%-16.667px)]";

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
      <div className="mx-auto max-w-7xl">
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

          <div
            ref={trackRef}
            className="flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {brands.map((b) => (
              <div
                key={b.name}
                data-carousel-card
                className={`group flex ${CARD_WIDTH_CLASSES} flex-none snap-start flex-col items-center gap-4 border border-line px-4 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-card mt-2`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/15 font-display text-sm font-bold tracking-wide text-ink transition-colors duration-300 group-hover:border-gold-500 group-hover:text-gold-500">
                  {b.initial}
                </span>
                <span className="text-center text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                  {b.name}
                </span>
              </div>
            ))}
          </div>

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