import CarMark from "./CarMark";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Brands We Serve", href: "/#brands" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-8 border-b border-line pb-10 text-center lg:flex-row lg:justify-between lg:text-left">
          <a href="/" className="flex items-center gap-3">
            <CarMark className="h-6 w-14 text-ink" strokeWidth={2} />
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-wide text-ink">
                FRONT LINE AUTOMOTIVE
              </span>
              <span className="mt-0.5 text-[9px] font-medium tracking-widest2 text-gold-500">
                PRECISION IN MOTION
              </span>
            </span>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-xs text-ink-faint sm:flex-row">
          <p>© 2026 Front Line Automotive. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-gold-500">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-gold-500">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
