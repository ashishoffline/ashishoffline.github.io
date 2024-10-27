window.addEventListener('DOMContentLoaded', event =>
{
    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav)
    {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem)
    {
        responsiveNavItem.addEventListener('click', () =>
        {
            if (window.getComputedStyle(navbarToggler).display !== 'none')
            {
                navbarToggler.click();
            }
        });
    });

    // Contact From submission
    const contactForm = document.getElementById("contactForm");
    const formErrorMessage = document.getElementById("formErrorMessage");

    if (contactForm)
    {
        contactForm.addEventListener("submit", function (event)
        {
            event.preventDefault();
            event.stopPropagation();

            // Reset previous error messages
            formErrorMessage.classList.add('d-none');
            formErrorMessage.textContent = '';

            // Check if the form is valid
            if (!contactForm.checkValidity())
            {
                contactForm.classList.add('was-validated');
                return;  // Do not proceed if form is invalid
            }

            // Execute reCAPTCHA v3 to get the token
            grecaptcha.ready(function ()
            {
                grecaptcha.execute('6LcX7WwqAAAAAHTkqZTeAaX3UDgHaDy7bfNiaOo-', { action: 'submit' }).then(function (token)
                {
                    // Append token to the form data
                    const formData = {
                        name: document.getElementById("name").value,
                        replyTo: document.getElementById("replyTo").value,
                        subject: document.getElementById("subject").value,
                        message: document.getElementById("message").value,
                        recaptchaToken: token
                    };

                    // Submit the form data
                    fetch("https://ashishjha-dev.azurewebsites.net/api/ContactMeEmail?code=jRH9RI56M0kHjxm05jVoX7DsqML6JRgEShFEpSKyAkJ_AzFuwGmx1g==",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(formData)
                        })
                        .then(response =>
                        {
                            if (response.ok)
                            {
                                // Show success message
                                formErrorMessage.textContent = "Thanks! Your message has been sent successfully.";
                                formErrorMessage.classList.remove('d-none', 'alert-danger');
                                formErrorMessage.classList.add('alert', 'alert-success');
                                contactForm.reset();
                                contactForm.classList.remove('was-validated');
                            } else
                            {
                                throw new Error("Something went wrong. Please try again later.");
                            }
                        })
                        .catch(error =>
                        {
                            // Show error message in the form UI
                            formErrorMessage.textContent = error.message;
                            formErrorMessage.classList.remove('d-none', 'alert-success');
                            formErrorMessage.classList.add('alert', 'alert-danger');
                        });
                })
                    .catch(error =>
                    {
                        // Show error message in the form UI
                        formErrorMessage.textContent = error.message;
                        formErrorMessage.classList.remove('d-none', 'alert-success');
                        formErrorMessage.classList.add('alert', 'alert-danger');
                    });
            });
        });
    }
});
