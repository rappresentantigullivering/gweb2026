import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    default: "Gulliver – Lista di Rappresentanza UNIVPM",
    template: "%s | Gulliver UNIVPM",
  },
  description:
    "Gulliver è la lista di rappresentanza studentesca dell'Università Politecnica delle Marche. Dal 1987 difendiamo i diritti degli studenti. Confederati con UDU.",
  keywords: [
    "Gulliver",
    "UNIVPM",
    "Università Politecnica delle Marche",
    "rappresentanza studentesca",
    "UDU",
    "elezioni studentesche",
    "Ancona",
  ],
  authors: [{ name: "Gulliver UNIVPM" }],
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Gulliver",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Gulliver UNIVPM",
    title: "Gulliver – Lista di Rappresentanza UNIVPM",
    description:
      "Dal 1987 difendiamo i diritti della comunità studentesca dell'Università Politecnica delle Marche.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
