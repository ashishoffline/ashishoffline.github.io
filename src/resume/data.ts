import { ExperienceItem, EducationItem, SkillCategory, SocialLink, ProjectItem } from './types';

export const personalInfo = {
    firstName: 'Ashish',
    lastName: 'Jha',
    location: 'Bengaluru, Karnataka, India',
    leadBio: `Dynamic and results-driven Software Engineer with over 7 years of experience in backend development across the healthcare, real estate, and media sectors. Currently working at Nielsen, contributing to the transition and future ownership of a key product, with a focus on system performance and architectural direction.`,
    secondaryBio: `Proficient in .NET technologies (ASP.NET Core, .NET 6/8), C#, SQL, and Azure services, I have consistently delivered scalable backend solutions that optimize performance and reduce operational overhead. At CareStack, I led initiatives that reduced manual reporting effort by over 95% and improved message processing efficiency by 60%. My work spans from designing microservices to building developer tools that streamline deployment and maintenance.`,
    closingBio: `I bring a strong focus on writing reliable, maintainable code and solving complex technical problems. Passionate about continuous learning and cross-team collaboration, I aim to build robust systems that drive business outcomes and long-term value.`,
    socials: [
        {
            platform: 'LinkedIn',
            url: 'https://linkedin.ashishjha.dev',
            iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg',
            alt: 'LinkedIn'
        },
        {
            platform: 'GitHub',
            url: 'https://github.ashishjha.dev',
            iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
            alt: 'GitHub'
        },
        {
            platform: 'Twitter / X',
            url: 'https://x.ashishjha.dev',
            iconSvg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg',
            alt: 'Twitter'
        }
    ] as SocialLink[]
};

export const experiences: ExperienceItem[] = [
    {
        role: 'Member of Technical Staff III',
        company: 'Nielsen',
        period: 'Jan 2025 – Present',
        description: 'Currently onboarding as Technical Lead for a critical product transition to my team, taking ownership post-handover and guiding its future development and technical direction.'
    },
    {
        role: 'Staff Engineer',
        company: 'CareStack',
        period: 'Jan 2022 – Jan 2025',
        description: 'Delivered scalable backend solutions focused on automation, performance, and architectural enhancements. Reduced manual reporting time by over 95% through background job and Power BI integration. Improved message processing efficiency by 60% through optimized database interactions. Built a custom database schema migration tool for systems unsupported by Flyway. Led development of strategic features in collaboration with the company’s largest investor, and mentored junior developers while contributing to engineering standards across teams.'
    },
    {
        role: 'Software Development Engineer II',
        company: 'Xome',
        period: 'Oct 2020 – Jan 2022',
        description: 'Enhanced the next-gen Xome Auction Platform by optimizing bidding workflows and improving key page load times by 50% using Razor Pages. Led development of a Travel Management System used internally by the company, replacing a third-party service and reducing operational costs by up to 50%.'
    },
    {
        role: 'Software Developer',
        company: 'Cognizant',
        period: 'Mar 2018 – Oct 2020',
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
            { name: 'C#', iconClass: 'devicon-csharp-plain colored' },
            { name: 'JavaScript', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
            { name: 'TypeScript', iconClass: 'devicon-typescript-plain colored' },
            { name: '.NET', imgSrc: 'https://raw.githubusercontent.com/dotnet/brand/refs/heads/main/logo/dotnet-logo.svg' },
            { name: '.NET Core', iconClass: 'devicon-dotnetcore-plain colored' }
        ]
    },
    {
        category: 'Databases & Data Technologies',
        skills: [
            { name: 'Azure SQL Database', iconClass: 'devicon-azuresqldatabase-plain colored' },
            { name: 'MS SQL Server', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original-wordmark.svg' },
            { name: 'MySQL', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg' },
            { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain-wordmark colored' },
            { name: 'Redis', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original-wordmark.svg' }
        ]
    },
    {
        category: 'Cloud & DevOps',
        skills: [
            { name: 'Azure', iconClass: 'devicon-azure-plain colored' },
            { name: 'Azure DevOps', iconClass: 'devicon-azuredevops-plain colored' },
            { name: 'Docker', iconClass: 'devicon-docker-plain-wordmark colored' },
            { name: 'Kubernetes', iconClass: 'devicon-kubernetes-plain colored' },
            { name: 'ArgoCD', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/argocd/argocd-original.svg' },
            { name: 'Helm', iconClass: 'devicon-helm-original colored' },
            { name: 'Git', iconClass: 'devicon-git-plain colored' },
            { name: 'GitHub', iconClass: 'devicon-github-original-wordmark colored' },
            { name: 'GitLab', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original-wordmark.svg' },
            { name: 'Bitbucket', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bitbucket/bitbucket-original-wordmark.svg' },
            { name: 'NuGet', iconClass: 'devicon-nuget-original colored' },
            { name: 'Grafana', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original-wordmark.svg' },
            { name: 'Splunk', iconClass: 'devicon-splunk-original-wordmark colored' },
            { name: 'SonarQube', iconClass: 'devicon-sonarqube-plain-wordmark colored' }
        ]
    },
    {
        category: 'Tools & Miscellaneous',
        skills: [
            { name: 'Visual Studio', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg' },
            { name: 'VS Code', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
            { name: 'YAML', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/yaml/yaml-original.svg' },
            { name: 'JSON', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg' },
            { name: 'Jira', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original-wordmark.svg' },
            { name: 'Apache Kafka', iconClass: 'devicon-apachekafka-original-wordmark colored' }
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


