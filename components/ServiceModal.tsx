"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { useServiceModal } from "@/context/ServiceModalContext";

export default function ServiceModal() {
  const { activeService, closeService } = useServiceModal();

  useEffect(() => {
    if (!activeService) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeService();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeService, closeService]);

  return (
    <AnimatePresence>
      {activeService && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={closeService}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden bg-paper shadow-cardHover sm:max-h-[80vh]"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-6 sm:px-9">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center bg-gold-500/10 text-gold-500">
                  <activeService.icon size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="eyebrow mb-1">Service</p>
                  <h3
                    id="service-modal-title"
                    className="font-display text-lg font-bold uppercase leading-snug text-ink sm:text-2xl"
                  >
                    {activeService.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={closeService}
                aria-label="Close"
                className="flex-none text-ink-faint transition-colors duration-200 hover:text-ink"
              >
                <X size={22} />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-6 py-6 sm:px-9">
              <p className="text-[15px] leading-relaxed text-ink-soft">
                {activeService.summary}
              </p>

              {activeService.note && (
                <p className="mt-4 border-l-2 border-gold-500 pl-4 text-sm italic leading-relaxed text-ink-soft">
                  {activeService.note}
                </p>
              )}

              <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {activeService.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <CheckCircle2 size={16} className="mt-0.5 flex-none text-gold-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer CTA */}
            <div className="border-t border-line px-6 py-5 sm:px-9">
              <a
                href="/#contact"
                onClick={closeService}
                className="btn-gold w-full sm:w-auto"
              >
                Book This Service
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
