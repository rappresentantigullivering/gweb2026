import { notFound } from 'next/navigation';
import RiservataPreview from './RiservataPreview';

/**
 * Banco di prova delle primitive dell'area riservata.
 *
 * Serve a verificare la resa grafica senza credenziali, dato che tutte le
 * pagine reali stanno dietro il login.
 *
 * La guardia non e' un vezzo: src/proxy.ts lascia passare qualunque
 * percorso quando il sottodominio e' vuoto o `www`, quindi questa pagina
 * sarebbe raggiungibile anche su www.gulliverancona.it/riservata-preview,
 * e src/app/robots.ts consente l'indicizzazione dell'intero sito.
 */
export default function Page() {
  if (process.env.NODE_ENV === 'production') notFound();
  return <RiservataPreview />;
}
