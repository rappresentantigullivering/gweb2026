import type { Metadata } from "next";
import Gruppi26Form from "./Gruppi26Form";

export const metadata: Metadata = {
  title: "Gruppi WhatsApp Matricole 2026/2027 | Gulliver",
  description: "Accedi ai gruppi WhatsApp ufficiali di Gulliver per ogni corso di laurea dell'UNIVPM.",
};

export default function Gruppi26Page() {
  return <Gruppi26Form />;
}
