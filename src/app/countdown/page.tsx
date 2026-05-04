import type { Metadata } from 'next';
import ElectionCountdown from '@/components/ElectionCountdown';

export const metadata: Metadata = {
  title: 'Countdown Elezioni 2026 | Gulliver UNIVPM',
  description: 'Manca pochissimo alle elezioni studentesche UNIVPM. Vota Gulliver, Lista 1.',
  robots: { index: false, follow: false }, // pagina di campagna, non indicizzare
};

export default function CountdownPage() {
  return <ElectionCountdown variant="epic" />;
}
