import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceModal from "@/components/ServiceModal";
import { ServiceModalProvider } from "@/context/ServiceModalContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://frontlineautomotive.co"), // PLACEHOLDER: Ensure this matches your actual production domain
  title: {
    default: "Front Line Automotive | Precision in Motion",
    template: "%s | Front Line Automotive",
  },
  description:
    "Luxury automotive care in Dubai and Sharjah. Vehicle inspection, detailing, PPF, mechanical service, ceramic coating, and restoration for the world's finest cars.",
  keywords: [
    "auto repair Sharjah",
    "car maintenance Dubai",
    "luxury vehicle service UAE",
    "car detailing",
    "mechanical repairs Sharjah",
  ], // PLACEHOLDER: You can adjust or add more specific keywords here
  openGraph: {
    title: "Front Line Automotive | Precision in Motion",
    description:
      "Luxury automotive care in Dubai and Sharjah. Vehicle inspection, detailing, PPF, mechanical service, ceramic coating, and restoration for the world's finest cars.",
    url: "https://frontlineautomotive.co", // PLACEHOLDER: Ensure this matches your production domain
    siteName: "Front Line Automotive",
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Front Line Automotive | Precision in Motion",
    description:
      "Luxury automotive care in Dubai and Sharjah. Vehicle inspection, detailing, PPF, mechanical service, ceramic coating, and restoration for the world's finest cars.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body>
        <ServiceModalProvider>
          <Navbar />
          {children}
          <Footer />
          <ServiceModal />
          <Toaster position="bottom-right" toastOptions={{ duration: 4000, style: { background: '#1c1c1c', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
        </ServiceModalProvider>
      </body>
    </html>
  );
}
