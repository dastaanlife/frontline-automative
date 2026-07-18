import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Brands from "@/components/Brands";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <About />
      <Services />
      <Brands />
      <ContactSection />
    </main>
  );
}
