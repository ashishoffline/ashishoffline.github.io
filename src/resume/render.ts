import { personalInfo, experiences, educations, skillCategories, workflows, interests, projects } from './data';

export function renderResume(): void {
    // 0. Render About Section Details
    const firstNameEl = document.getElementById('about-first-name');
    if (firstNameEl) firstNameEl.textContent = personalInfo.firstName;

    const lastNameEl = document.getElementById('about-last-name');
    if (lastNameEl) lastNameEl.textContent = personalInfo.lastName;

    const locationEl = document.getElementById('about-location');
    if (locationEl) locationEl.textContent = personalInfo.location;

    const contactLocationEl = document.getElementById('contact-location');
    if (contactLocationEl) contactLocationEl.textContent = personalInfo.location;

    const aboutBio = document.getElementById('about-bio');
    if (aboutBio) {
        aboutBio.innerHTML = `
            <p class="mb-4">${personalInfo.leadBio}</p>
            <p class="mb-4">${personalInfo.secondaryBio}</p>
            <p class="mb-0">${personalInfo.closingBio}</p>
        `;
    }

    // 1. Render Social Icons (in About section and Contact section)
    const renderSocialsHtml = () => personalInfo.socials.map(s => `
        <a class="social-icon" href="${s.url}" target="_blank" rel="noopener" aria-label="${s.alt}">
            <i class="${s.iconClass}" title="${s.alt}"></i>
        </a>
    `).join('');

    const aboutSocials = document.getElementById('about-socials');
    if (aboutSocials) {
        aboutSocials.innerHTML = renderSocialsHtml();
    }

    const contactSocials = document.getElementById('contact-socials');
    if (contactSocials) {
        contactSocials.innerHTML = renderSocialsHtml();
    }

    // 2. Render Experience Section
    const experienceList = document.getElementById('experience-list');
    if (experienceList) {
        experienceList.innerHTML = experiences.map((exp, index) => `
            <div class="d-flex flex-column flex-md-row justify-content-between ${index < experiences.length - 1 ? 'mb-5' : ''}">
                <div class="flex-grow-1">
                    <h3 class="mb-0">${exp.role}</h3>
                    <div class="subheading mb-3">${exp.company}</div>
                    <p>${exp.description}</p>
                </div>
                <div class="flex-shrink-0"><span class="text-primary">${exp.period}</span></div>
            </div>
        `).join('');
    }

    // 3. Render Education Section
    const educationList = document.getElementById('education-list');
    if (educationList) {
        educationList.innerHTML = educations.map((edu, index) => `
            <div class="d-flex flex-column flex-md-row justify-content-between ${index < educations.length - 1 ? 'mb-5' : ''}">
                <div class="flex-grow-1">
                    <h3 class="mb-0">${edu.institution}</h3>
                    <div class="subheading mb-3">${edu.degree}</div>
                    <div>${edu.field}</div>
                    ${edu.gpa ? `<p>${edu.gpa}</p>` : ''}
                </div>
                <div class="flex-shrink-0"><span class="text-primary">${edu.period}</span></div>
            </div>
        `).join('');
    }

    // 4. Render Skills Section
    const skillsList = document.getElementById('skills-list');
    if (skillsList) {
        skillsList.innerHTML = skillCategories.map(category => `
            <div class="subheading mb-3">${category.category}</div>
            <ul class="list-inline dev-icons">
                ${category.skills.map(skill => `
                    <li class="list-inline-item">
                        ${skill.iconClass ? `<i class="${skill.iconClass}" title="${skill.name}"></i>` : ''}
                        ${skill.iconSvg ? `<img src="${skill.iconSvg}" alt="${skill.name}" class="dev-icon-svg" title="${skill.name}" />` : ''}
                    </li>
                `).join('')}
            </ul>
        `).join('');
    }

    // 5. Render Projects & Tools Section
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
        projectsList.innerHTML = projects.map(proj => `
            <div class="card mb-4 shadow-sm">
                <div class="card-body p-4">
                    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-2 gap-2">
                        <h3 class="card-title mb-0 fs-4">${proj.title}</h3>
                        ${proj.badge ? `<span class="badge bg-primary text-uppercase">${proj.badge}</span>` : ''}
                    </div>
                    <p class="card-text text-muted mb-3">${proj.description}</p>
                    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                        <div class="d-flex gap-2 flex-wrap">
                            ${proj.techStack && proj.techStack.length ? proj.techStack.map(tech => `<span class="badge bg-secondary">${tech}</span>`).join('') : ''}
                        </div>
                        ${proj.link ? `<a href="${proj.link}" class="btn btn-outline-primary btn-sm px-3">${proj.linkText || 'Open Project'} &rarr;</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Populate Download Resume button link if present
    const resumeBtn = document.getElementById('resume-download-btn') as HTMLAnchorElement | null;
    if (resumeBtn && personalInfo.resumeUrl) {
        resumeBtn.href = personalInfo.resumeUrl;
    }

    // 6. Render Workflow Section
    const workflowList = document.getElementById('workflow-list');
    if (workflowList) {
        workflowList.innerHTML = `
            <div class="subheading mb-3">Workflow</div>
            <ul class="list-unstyled mb-0">
                ${workflows.map(item => `
                    <li class="d-flex align-items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-primary flex-shrink-0" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        <span>${item}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    // 7. Render Interests Section
    const interestsContainer = document.getElementById('interests-content');
    if (interestsContainer) {
        interestsContainer.innerHTML = interests.map((p, index) => `
            <p class="${index === interests.length - 1 ? 'mb-0' : ''}">${p}</p>
        `).join('');
    }
}

