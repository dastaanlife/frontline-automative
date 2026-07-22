import type { Metadata } from "next";
import ServicesGrid from "@/components/ServicesGrid";

export const metadata: Metadata = {
  title: "Our Services | Front Line Automotive",
  description:
    "The full range of luxury automotive services offered by Front Line Automotive — from mechanical repairs and diagnostics to detailing and performance upgrades.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-mist pt-32 sm:pt-36">
        <div className="section-pad !pb-16 mx-auto !pt-0">
          <p className="eyebrow mb-4">What We Offer</p>
          <h1 className="max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Every Service. <span className="text-gold-500">One Trusted Team.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            From routine maintenance to full restoration, our certified
            technicians cover every system in your vehicle. Select a category
            below to see exactly what&apos;s included.
          </p>
        </div>
      </section>

      <ServicesGrid />
    </>
  );
}
