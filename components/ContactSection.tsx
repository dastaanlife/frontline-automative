"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

const hours = [
  { day: "Monday — Friday", time: "8:00 AM – 7:00 PM" },
  { day: "Saturday", time: "9:00 AM – 5:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
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
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 flex-none text-gold-500" size={20} />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white">
                  Visit Us
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Al Quoz Industrial Area 3, Dubai, United Arab Emirates
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-1 flex-none text-gold-500" size={20} />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white">
                  Call Us
                </p>
                <p className="mt-1 text-sm text-white/60">+971 50 123 4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 flex-none text-gold-500" size={20} />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white">
                  Email Us
                </p>
                <p className="mt-1 text-sm text-white/60">
                  info@frontlineautomotive.ae
                </p>
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
                      className="flex justify-between gap-6 text-sm text-white/60"
                    >
                      <span>{h.day}</span>
                      <span className="text-white/80">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative mt-2 hidden aspect-[4/3] max-w-sm overflow-hidden border border-white/10 sm:block">
              <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="text-gold-500" size={30} fill="currentColor" />
              </div>
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
                <select
                  name="service"
                  defaultValue=""
                  required
                  className="border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none transition-colors duration-300 focus:border-gold-500 [&>option]:text-ink"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option>Vehicle Inspection</option>
                  <option>Car Detailing</option>
                  <option>Paint Protection Film (PPF)</option>
                  <option>Mechanical Service</option>
                  <option>Ceramic Coating</option>
                  <option>Restoration &amp; Customization</option>
                </select>
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
