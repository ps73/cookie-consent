import { render } from 'preact';
import { App } from './app';
import './index.css';
import { _injectOne, reopen, reset } from './hooks/useSettings';
import { consentStore, hasConsent, setAcCok } from './store';
import type { CookieConsentSettings } from './types/settings';

const mount = () => {
  const root = document.getElementById('cc');
  if (root) render(<App />, root);
  else console.warn('No Div with id="cc" found.');
  setWindowMethods();
};

const setConsent = (name: string) => {
  setAcCok(name, true);
  _injectOne(name);
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
  window.ccSetConsent = setConsent;
};

const getConsent = () => consentStore.get();

const setDebugLogs = (active: boolean) => {
  if (typeof window === 'undefined') return;
  window.CC_DEBUG = active;
};

const setSettings = (settings: CookieConsentSettings) => {
  if (typeof window === 'undefined') return;
  window.CC_SETTINGS = settings;
  setWindowMethods();
};

if (typeof window !== 'undefined') {
  setWindowMethods();
}

export {
  mount,
  reopen,
  reset,
  getConsent,
  consentStore,
  hasConsent,
  setDebugLogs,
  setSettings,
  setConsent,
};

export * from './types/settings';
