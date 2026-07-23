import { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Brands from "@/components/Brands";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Front Line Automotive | Premium Auto Maintenance in Sharjah",
  description:
    "Expert vehicle diagnostics, mechanical repairs, and detailing at Front Line Auto Maint L.L.C in Sharjah. Book your appointment today.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Front Line Auto Maint L.L.C",
    image: "https://frontlineautomotive.com/logo/logo-l.png", // PLACEHOLDER: Ensure this image URL is correct
    "@id": "https://frontlineautomotive.com",
    url: "https://frontlineautomotive.com",
    telephone: "+971559764426",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 01, Industrial Area 11, Al Senaiyat",
      addressLocality: "Sharjah",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.322327, // PLACEHOLDER: Update with exact latitude
      longitude: 55.389843, // PLACEHOLDER: Update with exact longitude
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
        opens: "08:30",
        closes: "21:00",
      }
    ],
  };

  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Services />
      <Brands />
      <ContactSection />
    </main>
  );
}

