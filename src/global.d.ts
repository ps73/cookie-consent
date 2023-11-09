import { GlobalCookieConsent } from './types/settings';

declare global {
  interface Window extends GlobalCookieConsent {
    execScript?: (s: string) => void;
  }
}
