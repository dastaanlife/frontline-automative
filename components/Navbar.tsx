"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import CarMark from "./CarMark";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-card backdrop-blur-md"
          : "bg-white/0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <CarMark className="h-6 w-14 text-ink" strokeWidth={2} />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-wide text-ink">
              FRONT LINE AUTOMOTIVE
            </span>
            <span className="mt-0.5 text-[10px] font-medium tracking-widest2 text-gold-500">
              PRECISION IN MOTION
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link href="/services" className="nav-link">
            Services
          </Link>
          <Link href="/#contact" className="btn-gold">
            Contact Us
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-ink md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 pb-6">
          <Link href="/services" className="nav-link" onClick={() => setOpen(false)}>
            Services
          </Link>
          <Link href="/#contact" className="btn-gold w-fit" onClick={() => setOpen(false)}>
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
