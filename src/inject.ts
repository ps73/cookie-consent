import { consentStore, mount } from './main';
import debug from './utils/debug';

mount();

if (window.CC_DEBUG) {
  consentStore.subscribe((s) => {
    debug.log('ccConsentStore', s);
    debug.log('Google Analytics ccHasConsent', window.ccHasConsent('Google Analytics'));
  });
}
