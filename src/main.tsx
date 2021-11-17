import { render } from 'preact';
import { App } from './app';
import './index.css';

const renderCookieConsent = () => {
  const root = document.getElementById('cc');
  if (root) render(<App />, root);
};

export default renderCookieConsent;
