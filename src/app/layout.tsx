import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VotingModal from "@/components/VotingModal";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gulliverancona.it"),
  title: {
    default: "Gulliver Ancona – Lista di Rappresentanza Studentesca UNIVPM",
    template: "%s | Gulliver UNIVPM",
  },
  description:
    "Gulliver è la prima associazione e lista di rappresentanza studentesca dell'Università Politecnica delle Marche. Dal 1987 difendiamo i diritti degli studenti.",
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
    title: "Gulliver Ancona – Lista di Rappresentanza Studentesca UNIVPM",
    description:
      "Gulliver è la prima associazione e lista di rappresentanza studentesca dell'Università Politecnica delle Marche. Dal 1987 difendiamo i diritti degli studenti.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Gulliver UNIVPM - Rappresentanza Studentesca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gulliver Ancona – Lista di Rappresentanza Studentesca UNIVPM",
    description:
      "Gulliver è la prima associazione e lista di rappresentanza studentesca dell'Università Politecnica delle Marche. Dal 1987 difendiamo i diritti degli studenti.",
    images: ["/opengraph-image.png"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  // Nasconde navbar e footer per sottodomini admin e forms
  const isAdminOrForms = host.startsWith("admin.") || host.startsWith("forms.");

  return (
    <html lang="it">
      <body>
        {!isAdminOrForms && <Navbar />}
        <main>{children}</main>
        {!isAdminOrForms && (
          <>
            <Footer />
            <VotingModal />
          </>
        )}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
