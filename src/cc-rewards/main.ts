import { initTheme } from '../shared/theme';
import { renderApp } from './render';
import './cc-rewards.css';

// Initialize Light/Dark theme manager
initTheme();

// Mount Credit Card Rewards Optimizer Application
const appContainer = document.getElementById('app');
if (appContainer) {
  renderApp(appContainer);
} else {
  console.error('App container #app not found in cc-rewards/index.html');
}
