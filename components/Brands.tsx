"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const brands = [
  { name: "Rolls-Royce", initial: "RR" },
  { name: "Aston Martin", initial: "AM" },
  { name: "Ferrari", initial: "F" },
  { name: "Bentley", initial: "B" },
  { name: "Lamborghini", initial: "L" },
  { name: "Porsche", initial: "P" },
  { name: "Mercedes-Benz", initial: "MB" },
];

export default function Brands() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
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

        <div className="relative flex items-center gap-4">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="hidden h-10 w-10 flex-none items-center justify-center border border-line text-ink transition-colors duration-300 hover:border-gold-500 hover:text-gold-500 sm:flex"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={trackRef}
            className="flex flex-1 gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {brands.map((b) => (
              <div
                key={b.name}
                className="group flex w-[150px] flex-none flex-col items-center gap-4 border border-line px-4 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-card"
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
            className="hidden h-10 w-10 flex-none items-center justify-center border border-line text-ink transition-colors duration-300 hover:border-gold-500 hover:text-gold-500 sm:flex"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
