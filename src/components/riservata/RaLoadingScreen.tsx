import s from './riservata.module.css';
import { RaSpinner } from './RaSpinner';

/**
 * Schermata di attesa a pagina intera. Va usata dentro <RaPage center>,
 * cosi' anche il ramo di caricamento eredita i token: prima era un blocco
 * <style jsx> a parte, ed era il punto in cui si dimenticava il tema.
 */
export function RaLoadingScreen({ message }: { message: string }) {
  return (
    <div className={s.loadingScreen}>
      <RaSpinner size="lg" />
      <p className={s.loadingText}>{message}</p>
    </div>
  );
}
