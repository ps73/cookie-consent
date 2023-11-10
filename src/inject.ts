import { consentStore, mount } from './main';
import debug from './utils/debug';

mount();

if (window.CC_DEBUG) {
  consentStore.subscribe((s, key) => {
    debug.log('ccConsentStore', s);
    if (key === 'cookies.Google Analytics') {
      debug.log('Google Analytics ccHasConsent', window.ccHasConsent('Google Analytics'));
    }
  });
}
