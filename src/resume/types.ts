export interface SocialLink {
    platform: string;
    url: string;
    iconClass: string;
    alt: string;
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    location: string;
    leadBio: string;
    secondaryBio: string;
    closingBio: string;
    socials: SocialLink[];
    resumeUrl?: string;
}

export interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    description: string;
}

export interface EducationItem {
    institution: string;
    degree: string;
    field: string;
    period: string;
    gpa?: string;
}

export interface SkillItem {
    name: string;
    iconClass?: string;
    iconSvg?: string;
}

export interface SkillCategory {
    category: string;
    skills: SkillItem[];
}

export interface ContactFormData {
    name: string;
    replyTo: string;
    subject: string;
    message: string;
    recaptchaToken: string;
}

export interface ProjectItem {
    title: string;
    badge?: string;
    description: string;
    techStack?: string[];
    link?: string;
    linkText?: string;
}

