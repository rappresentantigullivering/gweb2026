import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    icon: "/gulliver-tondo.png",
    shortcut: "/gulliver-tondo.png",
    apple: "/gulliver-tondo.png",
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
      </body>
    </html>
  );
}
