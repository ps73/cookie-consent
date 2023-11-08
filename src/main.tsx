import { render } from 'preact';
import { App } from './app';
import './index.css';

const renderCookieConsent = () => {
  const root = document.getElementById('cc');
  if (root) render(<App />, root);
  else console.warn('No Div with id="cc" or id="simpler-consent" found.');
};

window.renderCookieConsent = renderCookieConsent;

export default renderCookieConsent;
