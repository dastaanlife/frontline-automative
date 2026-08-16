"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  ChevronDown,
  Send,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { services } from "@/lib/services";

const hours = [
  { day: "Monday — Thursday", time: "8:30 AM – 9:00 PM" },
  { day: "Friday", time: "Closed" },
  { day: "Saturday — Sunday", time: "8:30 AM – 9:00 PM" },
];

const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/3napSa7pEXQ7hkge7?g_st=ic";
const MAP_ADDRESS_QUERY =
  "Front Line Auto Maintenance, Unit 01, Industrial Area 11, Al Senaiyat, Sharjah, United Arab Emirates";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    const loadingToast = toast.loading("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("Response status from /api/contact:", response.status);
      const responseData = await response.json().catch(() => ({}));
      console.log("Response from /api/contact:", responseData);
      if (responseData?.success) {
        toast.success("Your message has been sent successfully!", { id: loadingToast });
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 3500);
      } else {
        toast.error(responseData.error || "Failed to send message. Please try again.", { id: loadingToast });
      }
    } catch (error) {
      toast.error("A network error occurred. Please check your connection and try again.", { id: loadingToast });
    }
  };

  return (
    <section id="contact" className="section-pad bg-ink text-white">
      <div className="mx-auto">
        <div className="mb-14 max-w-xl">
          <p className="eyebrow mb-4">Get In Touch</p>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
            Book Your <span className="text-gold-500">Appointment</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/60">
            Tell us about your vehicle and the service you need. Our advisors
            will get back to you within one business day.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Info panel */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-10 md:flex-row md:gap-4">
              <div className="flex items-start gap-4 md:flex-1">
                <MapPin className="mt-1 flex-none text-gold-500" size={20} />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-white">
                    Visit Us
                  </p>
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm text-white/60 transition-colors duration-300 hover:text-gold-500"
                  >
                    Unit 01, Industrial Area 11, Al Senaiyat,
                    <br />
                    Sharjah, United Arab Emirates
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 md:flex-1 lg:justify-end">
                <Phone className="mt-1 flex-none text-gold-500" size={20} />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-white">
                    Call Us
                  </p>
                  <a
                    href="tel:+971559764426"
                    className="mt-1 block text-sm text-white/60 transition-colors duration-300 hover:text-gold-500"
                  >
                    +971 55 976 4426
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 md:flex-row md:gap-4">
              <div className="flex items-start gap-4 md:flex-1">
                <Mail className="mt-1 flex-none text-gold-500" size={20} />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-white">
                    Email Us
                  </p>
                  <a
                    href="mailto:info@frontlineautomotive.co"
                    className="mt-1 block text-sm text-white/60 transition-colors duration-300 hover:text-gold-500"
                  >
                    info@frontlineautomotive.co
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 md:flex-1 lg:justify-end">
                <Globe className="mt-1 flex-none text-gold-500" size={20} />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-white">
                    Website
                  </p>
                  <a
                    href="https://frontlineautomotive.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm text-white/60 transition-colors duration-300 hover:text-gold-500"
                  >
                    frontlineautomotive.co
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="mt-1 flex-none text-gold-500" size={20} />
              <div className="w-full">
                <p className="text-sm font-semibold uppercase tracking-wide text-white">
                  Working Hours
                </p>
                <div className="mt-2 flex flex-col gap-1.5">
                  {hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex lg:justify-between gap-6 text-sm text-white/60"
                    >
                      <span>{h.day}</span>
                      <span className="text-white/80">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="relative mt-2 aspect-[4/3] w-full max-h-[30vh] lg:max-h-full overflow-hidden border border-white/10 sm:block">
              <iframe
                title="Front Line Auto Maintenance location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  MAP_ADDRESS_QUERY,
                )}&output=embed`}
                className="absolute inset-0 h-full w-full grayscale invert-[0.92] contrast-[1.1]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 z-10 border border-gold-500/40 bg-ink/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold-500 backdrop-blur transition-colors duration-300 hover:bg-gold-500 hover:text-ink"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="border border-white/10 bg-white/[0.03] p-8 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Full Name" name="name" type="text" required />
              <Field label="Phone Number" name="phone" type="tel" required />
              <Field label="Email Address" name="email" type="email" required />
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-white/70">
                  Service Interested In
                </label>
                <div className="relative">
                  <select
                    name="service"
                    defaultValue=""
                    required
                    className="peer w-full appearance-none border border-white/15 bg-transparent px-4 py-3 pr-10 text-sm text-white outline-none transition-colors duration-300 hover:border-white/30 focus:border-gold-500 [&>option]:bg-ink [&>option]:text-white"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50 transition-colors duration-300 peer-focus:text-gold-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your vehicle and what you need..."
                className="resize-none border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/30 focus:border-gold-500"
              />
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              className="btn-gold mt-8 w-full sm:w-auto"
            >
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} /> Message Sent
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2"
                  >
                    Send Message <Send size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-white/70">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none transition-colors duration-300 focus:border-gold-500"
      />
    </div>
  );
}
