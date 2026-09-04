import '../shared/base';
import { ScrollSpy } from 'bootstrap';
import { ContactFormData } from './types';
import { renderResume } from './render';

declare const grecaptcha: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

window.addEventListener('DOMContentLoaded', () => {
    // 0. Render resume content dynamically from strongly-typed data
    renderResume();

    // 1. Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector<HTMLElement>('#sideNav');
    if (sideNav) {
        new ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // 2. Collapse responsive navbar when a nav-item is clicked on mobile
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

    // 3. Contact Form Submission
    const contactForm = document.getElementById('contactForm') as HTMLFormElement | null;
    const formErrorMessage = document.getElementById('formErrorMessage');

    if (contactForm && formErrorMessage) {
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

            if (typeof grecaptcha === 'undefined') {
                formErrorMessage.textContent = 'reCAPTCHA failed to load. Please refresh and try again.';
                formErrorMessage.classList.remove('d-none', 'alert-success');
                formErrorMessage.classList.add('alert', 'alert-danger');
                return;
            }

            // Execute reCAPTCHA v3
            grecaptcha.ready(() => {
                grecaptcha
                    .execute('6LcX7WwqAAAAAHTkqZTeAaX3UDgHaDy7bfNiaOo-', { action: 'submit' })
                    .then((token: string) => {
                        const formData: ContactFormData = {
                            name: (document.getElementById('name') as HTMLInputElement).value,
                            replyTo: (document.getElementById('replyTo') as HTMLInputElement).value,
                            subject: (document.getElementById('subject') as HTMLInputElement).value,
                            message: (document.getElementById('message') as HTMLTextAreaElement).value,
                            recaptchaToken: token,
                        };

                        return fetch(
                            'https://ashishjha-dev.azurewebsites.net/api/ContactMeEmail?code=jRH9RI56M0kHjxm05jVoX7DsqML6JRgEShFEpSKyAkJ_AzFuwGmx1g==',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(formData),
                            }
                        );
                    })
                    .then((response: Response) => {
                        if (response.ok) {
                            formErrorMessage.textContent = 'Thanks! Your message has been sent successfully.';
                            formErrorMessage.classList.remove('d-none', 'alert-danger');
                            formErrorMessage.classList.add('alert', 'alert-success');
                            contactForm.reset();
                            contactForm.classList.remove('was-validated');
                        } else {
                            throw new Error('Something went wrong. Please try again later.');
                        }
                    })
                    .catch((error: Error) => {
                        formErrorMessage.textContent = error.message;
                        formErrorMessage.classList.remove('d-none', 'alert-success');
                        formErrorMessage.classList.add('alert', 'alert-danger');
                    });
            });
        });
    }
});
