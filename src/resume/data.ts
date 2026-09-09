import { ExperienceItem, EducationItem, SkillCategory, ProjectItem, PersonalInfo } from './types';

export const personalInfo: PersonalInfo = {
    firstName: 'Ashish',
    lastName: 'Jha',
    location: 'Bengaluru, Karnataka, India',
    leadBio: `Dynamic and results-driven Software Engineer with over 7 years of experience in backend development across the healthcare, real estate, and media sectors. Currently working at Nielsen, contributing to the transition and future ownership of a key product, with a focus on system performance and architectural direction.`,
    secondaryBio: `Proficient in .NET technologies (ASP.NET Core, .NET 6/8), C#, SQL, and Azure services, I have consistently delivered scalable backend solutions that optimize performance and reduce operational overhead. At CareStack, I led initiatives that reduced manual reporting effort by over 95% and improved message processing efficiency by 60%. My work spans from designing microservices to building developer tools that streamline deployment and maintenance.`,
    closingBio: `I bring a strong focus on writing reliable, maintainable code and solving complex technical problems. Passionate about continuous learning and cross-team collaboration, I aim to build robust systems that drive business outcomes and long-term value.`,
    resumeUrl: 'https://drive.google.com/', // Replace with your direct Google Drive resume link
    socials: [
        {
            platform: 'LinkedIn',
            url: 'https://linkedin.ashishjha.dev',
            iconClass: 'devicon-linkedin-plain colored',
            alt: 'LinkedIn'
        },
        {
            platform: 'GitHub',
            url: 'https://github.ashishjha.dev',
            iconClass: 'devicon-github-original colored',
            alt: 'GitHub'
        },
        {
            platform: 'Twitter / X',
            url: 'https://x.ashishjha.dev',
            iconClass: 'devicon-twitter-original colored',
            alt: 'Twitter'
        }
    ]
};

export const experiences: ExperienceItem[] = [
    {
        role: 'Member of Technical Staff III',
        company: 'Nielsen',
        period: 'Jan 2025 - Present',
        description: 'Currently onboarding as Technical Lead for a critical product transition to my team, taking ownership post-handover and guiding its future development and technical direction.'
    },
    {
        role: 'Staff Engineer',
        company: 'CareStack',
        period: 'Jan 2022 - Jan 2025',
        description: 'Delivered scalable backend solutions focused on automation, performance, and architectural enhancements. Reduced manual reporting time by over 95% through background job and Power BI integration. Improved message processing efficiency by 60% through optimized database interactions. Built a custom database schema migration tool for systems unsupported by Flyway. Led development of strategic features in collaboration with the company’s largest investor, and mentored junior developers while contributing to engineering standards across teams.'
    },
    {
        role: 'Software Development Engineer II',
        company: 'Xome',
        period: 'Oct 2020 - Jan 2022',
        description: 'Enhanced the next-gen Xome Auction Platform by optimizing bidding workflows and improving key page load times by 50% using Razor Pages. Led development of a Travel Management System used internally by the company, replacing a third-party service and reducing operational costs by up to 50%.'
    },
    {
        role: 'Software Developer',
        company: 'Cognizant',
        period: 'Mar 2018 - Oct 2020',
        description: 'Modernized a legacy CICS-based system by introducing a microservices-based backend, enabling real-time record processing. Upgraded project dependency handling by migrating to PackageReference and integrated JFrog Artifactory into Azure DevOps for efficient NuGet package management across teams.'
    }
];

export const educations: EducationItem[] = [
    {
        institution: 'Maulana Abul Kalam Azad University of Technology (Formerly WBUT)',
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science and Engineering',
        period: 'August 2013 - May 2017',
        gpa: 'GPA: 7.93'
    }
];

export const skillCategories: SkillCategory[] = [
    {
        category: 'Programming Languages & Frameworks',
        skills: [
            { name: '.NET', iconSvg: '/assets/icons/dotnet.svg' },
            { name: 'C#', iconSvg: '/assets/icons/csharp.svg' },
            { name: 'NestJS', iconClass: 'devicon-nestjs-original colored' },
            { name: 'JavaScript', iconClass: 'devicon-javascript-plain colored' },
            { name: 'TypeScript', iconClass: 'devicon-typescript-plain colored' },
        ]
    },
    {
        category: 'Databases & Data Technologies',
        skills: [
            { name: 'Azure SQL Database', iconClass: 'devicon-azuresqldatabase-plain colored' },
            { name: 'MS SQL Server', iconClass: 'devicon-microsoftsqlserver-plain colored' },
            { name: 'MySQL', iconClass: 'devicon-mysql-original colored' },
            { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain colored' },
            { name: 'Redis', iconClass: 'devicon-redis-plain colored' }
        ]
    },
    {
        category: 'Cloud & DevOps',
        skills: [
            { name: 'Azure', iconClass: 'devicon-azure-plain colored' },
            { name: 'Azure DevOps', iconClass: 'devicon-azuredevops-plain colored' },
            { name: 'Docker', iconClass: 'devicon-docker-plain colored' },
            { name: 'Kubernetes', iconClass: 'devicon-kubernetes-plain colored' },
            { name: 'ArgoCD', iconClass: 'devicon-argocd-plain colored' },
            { name: 'Helm', iconClass: 'devicon-helm-original colored' },
            { name: 'Git', iconClass: 'devicon-git-plain colored' },
            { name: 'GitHub', iconClass: 'devicon-github-original colored' },
            { name: 'GitLab', iconClass: 'devicon-gitlab-plain colored' },
            { name: 'Bitbucket', iconClass: 'devicon-bitbucket-original colored' },
            { name: 'NuGet', iconClass: 'devicon-nuget-original colored' },
            { name: 'Grafana', iconClass: 'devicon-grafana-plain colored' },
            { name: 'Splunk', iconClass: 'devicon-splunk-original-wordmark colored' },
            { name: 'SonarQube', iconClass: 'devicon-sonarqube-original colored' }
        ]
    },
    {
        category: 'Tools & Miscellaneous',
        skills: [
            { name: 'Visual Studio', iconClass: 'devicon-visualstudio-plain colored' },
            { name: 'VS Code', iconClass: 'devicon-vscode-plain colored' },
            { name: 'YAML', iconClass: 'devicon-yaml-plain colored' },
            { name: 'JSON', iconClass: 'devicon-json-plain colored' },
            { name: 'Jira', iconClass: 'devicon-jira-plain colored' },
            { name: 'Apache Kafka', iconClass: 'devicon-apachekafka-original colored' }
        ]
    }
];

export const workflows: string[] = [
    'System Architecture Design',
    'Microservices Architecture and Design Patterns',
    'API Development and Integration',
    'Agile Software Development',
    'Database Optimization Strategies',
    'Performance Optimization',
    'Software Development Life Cycle (SDLC)'
];

export const interests = [
    'Apart from being a Backend developer, I enjoy watching Action/Thriller Web Series and Movies. I enjoy listening to music and cooking as well.',
    'I spend a large amount of my free time exploring the latest technology advancements in the backend development world and coding/programming.'
];

export const projects: ProjectItem[] = [
    {
        title: 'Credit Card Rewards Optimizer',
        badge: 'Rule Engine',
        description: 'A rule engine to recommend the optimal credit card for maximum rewards and cashback based on merchant category, card portfolio, and transaction amount.',
        techStack: ['TypeScript', 'Rule Engine'],
        link: '/cc-rewards/',
        linkText: 'Launch Tool'
    }
];


