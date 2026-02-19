export const personalInfo = {
  name: "Manav Patel",
  location: "Ottawa, Canada",
  email: "manav0282@gmail.com",
  github: "https://github.com/manav0282",
  linkedin: "https://www.linkedin.com/in/manav0282/",
  resumeUrl: "/resume.pdf",
  roles: [
    "Technical Support Specialist",
    "SaaS Troubleshooter",
    "Web Developer",
    "Problem Solver",
  ],
};

export const aboutSummary = {
  intro:
    "I'm the person people call when things break. For 3+ years I've been the calm voice on the other end — diagnosing, troubleshooting, and resolving technical issues so teams can get back to what they do best.",
  detail:
    "Right now I'm at Shopify, working the front lines of SaaS support — handling everything from DNS misconfigurations and broken API integrations to payment gateway failures. Before that, I cut my teeth at Concentrix and on the IT help desk at St. Clair College, where I learned that great support isn't just about fixing problems — it's about making people feel heard.",
  philosophy:
    "I don't just close tickets. I dig into root causes, document what I find, and make sure the same issue doesn't come back. I also build things — React apps, automation tools, anything that makes support faster and smarter.",
};

export const identityCards = [
  {
    tag: "The Troubleshooter",
    description: "I find the root cause, not just the symptom. Every ticket is a puzzle worth solving properly.",
    accent: "green",
  },
  {
    tag: "SaaS Native",
    description: "DNS, APIs, payment gateways, storefronts — I speak the language of modern web platforms fluently.",
    accent: "cyan",
  },
  {
    tag: "Builder at Heart",
    description: "I don't just support software — I build it. React, Next.js, and automation tools that make support smarter.",
    accent: "amber",
  },
  {
    tag: "Always Online",
    description: "Remote-first, timezone-flexible, and available when it matters. 40+ tickets a day, zero dropped balls.",
    accent: "green",
  },
];

export const experiences = [
  {
    role: "Technical Support Specialist",
    company: "Shopify",
    type: "Remote",
    period: "Feb 2025 - Present",
    bullets: [
      "Provide Tier 1/Tier 2 SaaS support via chat and email, resolving 40+ technical tickets daily with a high first-contact resolution rate",
      "Troubleshoot DNS, domain configuration, payment gateway, API, and storefront issues across Shopify's platform",
      "Perform root cause analysis and escalate complex incidents to engineering teams with detailed reproduction steps",
      "Debug Liquid template code, REST/GraphQL API integrations, and third-party app conflicts for merchants",
      "Collaborate cross-functionally with product and engineering to identify recurring issues and advocate for platform improvements",
      "Maintain thorough internal documentation and knowledge base articles to accelerate team resolution times",
    ],
  },
  {
    role: "Technical Support Advisor",
    company: "Concentrix",
    type: "Remote",
    period: "May 2024 - Jan 2025",
    bullets: [
      "Diagnosed application errors, system issues, and connectivity problems in a high-volume support environment handling 30+ daily interactions",
      "Documented and tracked incidents in Zendesk with detailed notes, adhering to SLA targets and escalation procedures",
      "Provided Tier 1 technical and account support, resolving issues efficiently with strong troubleshooting and problem-solving skills",
      "Identified patterns in recurring issues and contributed to process improvements that reduced average handle time",
      "Mentored new team members on troubleshooting workflows, ticketing best practices, and customer communication",
    ],
  },
  {
    role: "IT Help Desk Support",
    company: "St. Clair College",
    type: "Windsor",
    period: "Jan 2023 - Apr 2024",
    bullets: [
      "Provided frontline IT support for students, faculty, and staff across hardware, software, and system access issues",
      "Managed Active Directory accounts including password resets, group permissions, and multi-factor authentication setup",
      "Assisted with VPN configuration, account provisioning, printer troubleshooting, and remote desktop support",
      "Resolved network connectivity issues and escalated infrastructure problems to senior network administrators",
      "Maintained inventory tracking and asset management for campus IT equipment across multiple departments",
    ],
  },
];

export const skillCategories = [
  {
    title: "Languages & Web",
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "HTML/CSS", level: 90 },
      { name: "React", level: 80 },
      { name: "Next.js", level: 75 },
      { name: "REST APIs", level: 85 },
      { name: "Git", level: 80 },
    ],
  },
  {
    title: "Platforms",
    skills: [
      { name: "Windows", level: 95 },
      { name: "macOS", level: 90 },
      { name: "Linux", level: 80 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Zendesk", level: 90 },
      { name: "Jira", level: 85 },
      { name: "ServiceNow", level: 80 },
      { name: "Microsoft 365", level: 90 },
      { name: "Google Workspace", level: 85 },
      { name: "Slack", level: 90 },
    ],
  },
  {
    title: "Domains",
    skills: [
      { name: "Active Directory", level: 90 },
      { name: "MFA / IAM", level: 85 },
      { name: "DNS / VPN", level: 80 },
      { name: "ITIL Practices", level: 85 },
      { name: "Incident Mgmt", level: 90 },
      { name: "SLA Adherence", level: 95 },
    ],
  },
];

export const projects = [
  {
    name: "iam-automation-engine",
    description:
      "Enterprise IAM lifecycle automation CLI — RBAC-driven provisioning, onboarding/offboarding workflows, access governance reviews with privilege-creep detection, and compliance-ready audit logging. Simulates real-world Okta/Azure AD patterns.",
    tech: ["Python", "RBAC", "IAM", "CLI", "JSON"],
    github: "https://github.com/manav0282/iam-automation-engine",
    live: "",
  },
  {
    name: "ai-debugging-assistant",
    description:
      "AI-powered debugging assistant that analyzes API errors and workflow conflicts. Built to automate the diagnostic process and surface root causes faster than manual troubleshooting.",
    tech: ["Python", "AI", "API Debugging", "Automation"],
    github: "https://github.com/manav0282/ai-debugging-assistant",
    live: "",
  },
  {
    name: "portfolio-terminal",
    description:
      "This 3D interactive terminal-themed portfolio you're viewing right now — boot sequence, holographic scene, interactive terminal, glitch effects, and mouse-reactive particles.",
    tech: ["Next.js", "Three.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/manav0282",
    live: "#",
  },
];

export const education = [
  {
    degree: "Computer Networking",
    institution: "St. Clair College",
    year: "2024",
    location: "Windsor, ON",
  },
];

export const navLinks = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "education", href: "#education" },
  { label: "contact", href: "#contact" },
];
