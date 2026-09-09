/**
 * Theme Manager (Light / Dark mode)
 * Uses Bootstrap 5.3 native data-bs-theme with localStorage persistence.
 */
import 'bootstrap';

export type Theme = 'light' | 'dark';

export function getPreferredTheme(): Theme {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    const metaColorScheme = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    if (metaColorScheme) {
        metaColorScheme.content = theme;
    }

    const icon = document.getElementById('theme-icon');
    const label = document.getElementById('theme-label');
    if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    if (label) {
        label.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
}

export function initTheme(): void {
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = (document.documentElement.getAttribute('data-bs-theme') as Theme) || 'light';
            const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // Listen to OS-level theme changes when user hasn't explicitly set a preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

