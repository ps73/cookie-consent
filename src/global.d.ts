import { CookieConsentSettings } from './types/settings';

declare global {
  interface Window {
    CC_SETTINGS?: CookieConsentSettings;
    CC_DEBUG?: boolean;
    execScript?: (s: string) => void;
    ccReopen: () => void;
    ccReset: () => void;
    renderCookieConsent: () => void;
  }
}
