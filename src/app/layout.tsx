import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gulliverancona.it"),
  title: {
    default: "Gulliver – Lista di Rappresentanza UNIVPM",
    template: "%s | Gulliver UNIVPM",
  },
  description:
    "Gulliver è la lista di rappresentanza studentesca dell'Università Politecnica delle Marche. Dal 1987 difendiamo i diritti degli studenti. Confederati con UDU.",
  keywords: [
    "Gulliver",
    "Gulliver Ancona",
    "Sinistra Universitaria",
    "UNIVPM",
    "Università Politecnica delle Marche",
    "rappresentanza studentesca",
    "sindacato studentesco",
    "UDU",
    "elezioni studentesche",
    "Ancona",
  ],
  authors: [{ name: "Gulliver UNIVPM", url: "https://www.gulliverancona.it" }],
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
    url: "https://www.gulliverancona.it",
    siteName: "Gulliver UNIVPM",
    title: "Gulliver – Lista di Rappresentanza UNIVPM",
    description:
      "Dal 1987 difendiamo i diritti della comunità studentesca dell'Università Politecnica delle Marche.",
    images: [
      {
        url: "/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "Logo Gulliver UNIVPM",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Gulliver – Lista di Rappresentanza UNIVPM",
    description:
      "Dal 1987 difendiamo i diritti della comunità studentesca dell'Università Politecnica delle Marche.",
    images: ["/apple-touch-icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
