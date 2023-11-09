import { render } from 'preact';
import { App } from './app';
import './index.css';
import { reopen, reset } from './hooks/useSettings';
import { consentStore } from './store';

const mount = () => {
  const root = document.getElementById('cc');
  if (root) render(<App />, root);
  else console.warn('No Div with id="cc" or id="simpler-consent" found.');
};

const getConsent = () => consentStore.get();

const setDebugLogs = (active: boolean) => {
  window.CC_DEBUG = active;
};

window.renderCookieConsent = mount;
window.mountCookieConsent = mount;

window.ccGetConsent = getConsent;

window.ccConsentStore = consentStore;

window.ccReopen = () => {
  reopen();
};

window.ccReset = () => {
  reset();
};

export { mount, reopen, reset, getConsent, consentStore, setDebugLogs };

export * from './types/settings';
