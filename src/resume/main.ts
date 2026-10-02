import { ScrollSpy } from 'bootstrap';
import { ContactFormData } from './types';
import { renderResume } from './render';
import { initTheme } from '../shared/theme';

declare const grecaptcha: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

function init(): void {
    // 0. Initialize Light/Dark theme manager
    initTheme();

    // 1. Render resume content dynamically from strongly-typed data
    renderResume();

    // 2. Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector<HTMLElement>('#sideNav');
    if (sideNav) {
        new ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // 3. Collapse responsive navbar when a nav-item is clicked on mobile
    const navbarToggler = document.body.querySelector<HTMLElement>('.navbar-toggler');
    const responsiveNavItems = Array.from(
        document.querySelectorAll<HTMLElement>('#navbarResponsive .nav-link')
    );

    responsiveNavItems.forEach((responsiveNavItem) => {
        responsiveNavItem.addEventListener('click', () => {
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // 4. Contact Form Submission
    const contactForm = document.getElementById('contactForm') as HTMLFormElement | null;
    const formErrorMessage = document.getElementById('formErrorMessage');

    if (contactForm && formErrorMessage) {
        const submitBtn = contactForm.querySelector('button[type="submit"]') as HTMLButtonElement | null;

        // Turnstile lifecycle callbacks to enable/disable submit button
        (window as any).onTurnstileSuccess = (_token: string) => {
            if (submitBtn) {
                submitBtn.disabled = false;
            }
        };

        (window as any).onTurnstileExpired = () => {
            if (submitBtn) {
                submitBtn.disabled = true;
            }
        };

        (window as any).onTurnstileError = () => {
            if (submitBtn) {
                submitBtn.disabled = false;
            }
        };

        contactForm.addEventListener('submit', (event: SubmitEvent) => {
            event.preventDefault();
            event.stopPropagation();

            // Reset previous messages
            formErrorMessage.classList.add('d-none');
            formErrorMessage.textContent = '';

            // Check if form is valid
            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }

            const turnstileInput = contactForm.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null;
            const turnstileToken = turnstileInput?.value || (window as any).turnstile?.getResponse();

            if (!turnstileToken) {
                formErrorMessage.textContent = 'Please complete the verification check before submitting.';
                formErrorMessage.classList.remove('d-none', 'alert-success');
                formErrorMessage.classList.add('alert', 'alert-danger');
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            const hpInput = contactForm.querySelector('input[name="hp"]') as HTMLInputElement | null;
            const formData: ContactFormData = {
                site: 'ashishjha-dev',
                name: (document.getElementById('name') as HTMLInputElement).value.trim(),
                email: (document.getElementById('replyTo') as HTMLInputElement).value.trim(),
                subject: (document.getElementById('subject') as HTMLInputElement).value.trim(),
                message: (document.getElementById('message') as HTMLTextAreaElement).value.trim(),
                turnstileToken,
                hp: hpInput?.value || '',
            };

            fetch('https://contact-api.ashishjha.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response: Response) => {
                    if (response.ok) {
                        formErrorMessage.textContent = 'Thanks! Your message has been sent successfully.';
                        formErrorMessage.classList.remove('d-none', 'alert-danger');
                        formErrorMessage.classList.add('alert', 'alert-success');
                        contactForm.reset();
                        contactForm.classList.remove('was-validated');
                        (window as any).turnstile?.reset('#turnstile-widget');
                    } else {
                        (window as any).turnstile?.reset('#turnstile-widget');
                        throw new Error('Something went wrong. Please try again later.');
                    }
                })
                .catch((error: Error) => {
                    formErrorMessage.textContent = error.message;
                    formErrorMessage.classList.remove('d-none', 'alert-success');
                    formErrorMessage.classList.add('alert', 'alert-danger');
                })
                .finally(() => {
                    if (submitBtn) {
                        submitBtn.textContent = 'Send';
                        const currentToken = (contactForm.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value;
                        submitBtn.disabled = !currentToken;
                    }
                });
        });
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
