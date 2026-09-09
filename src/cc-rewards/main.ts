import { initTheme } from '../shared/theme';

// Initialize Light/Dark theme manager
initTheme();

// Credit Card Rewards Optimizer Entry Point
console.log('Credit Card Rewards Optimizer initialized');

const app = document.getElementById('app');
if (app) {
    app.innerHTML = `
        <strong>Rule Engine Online!</strong>
        <p class="mb-0 mt-2 text-muted">Ready for merchant, category, and card reward rule configurations.</p>
    `;
}

