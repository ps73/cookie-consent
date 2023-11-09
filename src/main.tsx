import { render } from 'preact';
import { App } from './app';
import './index.css';
import { reopen, reset } from './hooks/useSettings';
import { consentStore, hasConsent } from './store';
import type { CookieConsentSettings } from './types/settings';

const mount = () => {
  const root = document.getElementById('cc');
  if (root) render(<App />, root);
  else console.warn('No Div with id="cc" or id="simpler-consent" found.');
  setWindowMethods();
};

const setWindowMethods = () => {
  if (typeof window === 'undefined') return;
  window.renderCookieConsent = mount;
  window.mountCookieConsent = mount;
  window.ccGetConsent = getConsent;
  window.ccConsentStore = consentStore;
  window.ccHasConsent = (name: string) => hasConsent(name).get();
  window.ccHasConsentStore = hasConsent;
  window.ccReopen = () => {
    reopen();
  };
  window.ccReset = () => {
    reset();
  };
};

const getConsent = () => consentStore.get();

const setDebugLogs = (active: boolean) => {
  window.CC_DEBUG = active;
};

const setSettings = (settings: CookieConsentSettings) => {
  window.CC_SETTINGS = settings;
  setWindowMethods();
};

if (typeof window !== 'undefined') {
  setWindowMethods();
}

export { mount, reopen, reset, getConsent, consentStore, hasConsent, setDebugLogs, setSettings };

export * from './types/settings';
