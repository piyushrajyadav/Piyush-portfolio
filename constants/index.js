import GithubIcon from "./../public/assets/icons/github.svg";
import LinkedInIcon from "./../public/assets/icons/linkedin.svg";
import XIcon from "./../public/assets/icons/x.svg";
import InstagramIcon from "./../public/assets/icons/instagram.svg";
import FrontendIcon from "./../public/assets/icons/frontend.svg";
import LeaderShipIcon from "./../public/assets/icons/leadership.svg";
import ProblemSolvingIcon from "./../public/assets/icons/problem-solving.svg";
import FreelancerIcon from "./../public/assets/icons/freelance.svg";
import BackendIcon from "./../public/assets/icons/backend.svg";
import FullStackIcon from "./../public/assets/icons/full-stack.svg";

const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "articles",
    title: "Articles",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Software Developer",
    icon: <FullStackIcon />,
  },
  {
    title: "Frontend Developer",
    icon: <FrontendIcon />,
  },
  {
    title: "Backend Developer",
    icon: <BackendIcon />,
  },
  {
    title: "DevOPS Engineer",
    icon: <ProblemSolvingIcon />,
  },
  {
    title: "AI Engineer",
    icon: <ProblemSolvingIcon />,
  },
];

const technologies = {
  languages: [
    {
      name: "HTML5",
      icon: "/assets/tech/html5.svg",
      link: "https://html.spec.whatwg.org/multipage/",
    },
    {
      name: "CSS3",
      icon: "/assets/tech/css3.svg",
      link: "https://www.w3.org/Style/CSS/Overview.en.html",
    },
    {
      name: "JavaScript",
      icon: "/assets/tech/javascript.svg",
      link: "https://262.ecma-international.org/",
    },
    {
      name: "C++",
      icon: "/assets/cpp.svg",
      link: "https://isocpp.org/",
    },
    {
      name: "Java",
      icon: "/assets/tech/java.svg",
      link: "https://www.java.com/en/",
    },
    {
      name: "Python",
      icon: "/assets/tech/python.svg",
      link: "https://www.python.org/",
    },
    {
      name: "Go",
      icon: "/assets/go.png",
      link: "https://golang.org/",
    },
    {
      name: "SQL",
      icon: "/assets/sql.webp",
      link: "https://www.w3schools.com/sql/",
    },
  ],
  frameworks: [
    {
      name: "Next.js",
      icon: "/assets/tech/nextjs.svg",
      link: "https://nextjs.org/",
    },
    {
      name: "TailwindCSS",
      icon: "/assets/tech/tailwindcss.svg",
      link: "https://tailwindcss.com/",
    },
    {
      name: "Express.js",
      icon: "/assets/tech/expressjs.png",
      link: "https://expressjs.com/",
    },
    {
      name: "Flask",
      icon: "/assets/flask.png",
      link: "https://flask.palletsprojects.com/",
    },
    {
      name: "Spring Boot",
      icon: "/assets/spring-boot.png",
      link: "https://spring.io/projects/spring-boot",
    },
    {
      name: "FastAPI",
      icon: "/assets/fast api.png",
      link: "https://fastapi.tiangolo.com/",
    },
  ],
  libraries: [
    {
      name: "React",
      icon: "/assets/tech/react.svg",
      link: "https://react.dev/",
    },
    {
      name: "Node.js",
      icon: "/assets/tech/nodejs.svg",
      link: "https://nodejs.org/en",
    },
    {
      name: "LangChain",
      icon: "/assets/lang chain.jpg",
      link: "https://langchain.com/",
    },
    {
      name: "TensorFlow",
      icon: "/assets/tenserflow.png",
      link: "https://www.tensorflow.org/",
    },
    {
      name: "Scikit-Learn",
      icon: "/assets/Scikit_learn.svg",
      link: "https://scikit-learn.org/",
    },
  ],
  tools: [
    {
      name: "Git",
      icon: "/assets/tech/git.svg",
      link: "https://git-scm.com/",
    },
    {
      name: "Github",
      icon: "/assets/icons/github.svg",
      link: "https://github.com/",
    },
    {
      name: "Docker",
      icon: "/assets/tech/docker.svg",
      link: "https://www.docker.com/",
    },
    {
      name: "Kubernetes",
      icon: "/assets/Kubernetes.png",
      link: "https://kubernetes.io/",
    },
    {
      name: "CI/CD",
      icon: "/assets/ci cd.webp",
      link: "https://about.gitlab.com/topics/ci-cd/",
    },
  ],
 
  databases: [
    {
      name: "MySQL",
      icon: "/assets/tech/my-sql.png",
      link: "https://www.mysql.com/",
    },
    {
      name: "PostgreSQL",
      icon: "/assets/tech/postgresql.png",
      link: "https://www.postgresql.org",
    },
    {
      name: "MongoDB",
      icon: "/assets/tech/mongodb.svg",
      link: "https://www.mongodb.com/",
    },
    {
      name: "Redis",
      icon: "/assets/redis.svg",
      link: "https://redis.io/",
    },
  ],
};

const experiences = [
  {
    title: "Software Development Intern",
    company_name: "Alphaxine",
    icon: "/assets/company/alphaxine_logo.jpeg",
    iconBg: "#E6DEDD",
    date: "March 2025 - Present",
    points: [
      "Contributed to the official company website using Next.js and Tailwind CSS.",
      "Developed and contributed to ERP HR and CRM sections of Alphaxine ERP system with Spring Boot backend, React frontend, and MySQL database.",
      "Built comprehensive HR module features including master data configuration by admin for employee management, role-based access control, and automated workflow systems.",
      "Implemented CRM functionalities with customer relationship tracking, lead management, and sales pipeline automation integrated with the existing ERP infrastructure.",
      "Designed and developed scalable database schemas and RESTful APIs to support HR and CRM operations, ensuring seamless data flow between modules."
    ],
  },
  {
    title: "Full Stack Developer Intern",
    company_name: "Gorjag",
    icon: "/assets/company/gorjag.jpg",
    iconBg: "#E6DEDD",
    date: "July 2025 - September 2025",
    points: [
      "Built 10+ frontend and backend modules using React, Node.js, and MongoDB, contributing to core platform functionality.",
      "Improved application performance and user experience for a platform serving 20,000+ active users through code optimization and efficient database queries.",
      "Collaborated with cross-functional teams on MERN stack development to implement new features and resolve production issues.",
      "Developed RESTful APIs and integrated third-party services to enhance platform capabilities and user engagement.",
    ],
  },
  {
    title: "Cybersecurity Virtual Intern",
    company_name: "Palo Alto Networks",
    icon: "/assets/company/palo-alto-logo.jpg",
    iconBg: "#E6DEDD",
    date: "August 2024 - September 2024",
    points: [
      "Applied advanced threat intelligence tools to detect and mitigate cybersecurity risks.",
      "Developed hands-on expertise in network security, cloud security, and Zero Trust frameworks.",
      "Conducted incident response analysis and formulated security strategies for enterprise environments.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Piyush demonstrated exceptional problem-solving skills during our collaborative project. His dedication to quality code is remarkable.",
    name: "Tech Lead",
    designation: "CTO",
    company: "Alphaxine",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    testimonial:
      "Working with Piyush was a great experience. His technical knowledge and ability to learn quickly made him an invaluable team member.",
    name: "Project Manager",
    designation: "Manager",
    company: "Palo Alto Networks",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "systems", label: "Systems Engineering" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "fullstack", label: "Web Applications" },
  { id: "packages", label: "Packages & Libraries" },
];

const projects = [
  {
    name: "SecureFlow AI - Security Middleware for Multi-Agent Systems",
    description:
      "Lightning-fast security middleware layer protecting Multi-Agent Systems (LangChain, LangGraph) from Inter-Agent Trust Exploitation. Acts as a real-time firewall intercepting agent communication to detect and block prompt injections, privilege escalations, jailbreaks, and data exfiltration before execution. Used by 100+ developers in just 2 days. Published on PyPI as installable package with production-ready threat detection.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "pypi",
        color: "green-text-gradient",
      },
      {
        name: "security",
        color: "pink-text-gradient",
      },
      {
        name: "middleware",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/secureflow.svg",
    source_code_link: "https://github.com/piyushrajyadav/Secure-Flow",
    deployed_link: "https://pypi.org/project/secureflow-ai/",
    category: "packages",
    featured: true,
  },
  {
    name: "FormEase - Zero-Config Form Library",
    description:
      "Published on NPM with 4+ stars! An intelligent form handling library that just works - auto-detects validation rules, persists data with autosave, and includes full accessibility support out of the box. Zero dependencies, TypeScript-ready, and framework-agnostic. Works with React, Vue, Angular, or vanilla JS. Smart validation for emails, URLs, passwords with strength detection.",
    tags: [
      {
        name: "typescript",
        color: "blue-text-gradient",
      },
      {
        name: "npm-package",
        color: "green-text-gradient",
      },
      {
        name: "a11y",
        color: "pink-text-gradient",
      },
      {
        name: "zero-deps",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/formease.svg",
    source_code_link: "https://github.com/piyushrajyadav/formease",
    deployed_link: "https://www.npmjs.com/package/@piyushrajyadav/formease",
    category: "packages",
    featured: true,
  },
  {
    name: "Awesome AI Dev Prompts - Production Prompt Library",
    description:
      "The ultimate prompt library for AI coding tools — 75+ production-grade system prompts to supercharge development workflows. One prompt transforms your AI assistant into a top 1% specialist engineer instantly. Curated collection covering architecture, debugging, code review, testing, and more. Open-source resource with growing GitHub stars used by developers worldwide.",
    tags: [
      {
        name: "prompts",
        color: "blue-text-gradient",
      },
      {
        name: "ai-tools",
        color: "green-text-gradient",
      },
      {
        name: "productivity",
        color: "pink-text-gradient",
      },
      {
        name: "open-source",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/awesome-prompts.svg",
    source_code_link: "https://github.com/piyushrajyadav/awesome-ai-dev-prompts",
    deployed_link: "https://github.com/piyushrajyadav/awesome-ai-dev-prompts",
    category: "packages",
    featured: false,
  },
  {
    name: "Flowmora - Knowledge-Focused Browser",
    description:
      "Not just another browser - it's a learning companion. Flowmora features built-in Knowledge Mode that auto-captures important content, one-click page summarization extracting key points and definitions, and exports your browsing sessions as a beautifully formatted knowledge book. Privacy-first with zero tracking, built on Electron with modern UI/UX.",
    tags: [
      {
        name: "electron",
        color: "blue-text-gradient",
      },
      {
        name: "chromium",
        color: "green-text-gradient",
      },
      {
        name: "indexeddb",
        color: "pink-text-gradient",
      },
      {
        name: "desktop-app",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/flowmora.svg",
    source_code_link: "https://github.com/piyushrajyadav/Flowmora-Browser",
    deployed_link: "https://github.com/piyushrajyadav/Flowmora-Browser/releases",
    category: "systems",
    featured: true,
  },
  {
    name: "K8s Store Platform - Kubernetes Provisioning Engine",
    description:
      "Enterprise-grade platform for provisioning e-commerce stores on Kubernetes clusters via dashboard. Complete automation pipeline from user request to Helm deployment. Features React frontend, Node.js/Express backend orchestrating K8s resources, and reusable Helm charts for WooCommerce + MySQL. Demonstrates production-level DevOps and cloud-native architecture.",
    tags: [
      {
        name: "kubernetes",
        color: "blue-text-gradient",
      },
      {
        name: "helm",
        color: "green-text-gradient",
      },
      {
        name: "react",
        color: "pink-text-gradient",
      },
      {
        name: "devops",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/k8s-store.svg",
    source_code_link: "https://github.com/piyushrajyadav/k8s-store-platform",
    deployed_link: "",
    category: "systems",
    featured: true,
  },
  {
    name: "CodeChronicle - Git Platform with Analytics",
    description:
      "GitHub-like code hosting platform built from scratch with custom Git engine and queryable version history. Features content-addressable storage using SHA-256, complete branch management, and unique code evolution analytics dashboard. Track most changed files, detect risky hotspots, visualize commit patterns, and analyze author contributions. Final year project showcasing deep VCS internals.",
    tags: [
      {
        name: "next.js",
        color: "blue-text-gradient",
      },
      {
        name: "express.js",
        color: "green-text-gradient",
      },
      {
        name: "custom-git",
        color: "pink-text-gradient",
      },
      {
        name: "analytics",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/codechroncile.svg",
    source_code_link: "https://github.com/piyushrajyadav/CodeChronicle",
    deployed_link: "",
    category: "systems",
    featured: true,
  },
  {
    name: "CodeTrail - AI Career Coach Platform",
    description:
      "Intelligent career guidance platform that analyzes your resume and GitHub profile using generative AI to uncover skill gaps, recommend perfect roles, suggest impactful projects, and build custom learning roadmaps. Unlike generic career advice, leverages LLM-powered analysis for hyper-personalized guidance tailored to your unique developer journey. Built with Next.js, Supabase for authentication and data persistence, and AI-driven recommendation engine.",
    tags: [
      {
        name: "genai",
        color: "blue-text-gradient",
      },
      {
        name: "next.js",
        color: "green-text-gradient",
      },
      {
        name: "supabase",
        color: "pink-text-gradient",
      },
      {
        name: "career-ai",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/codetrail.svg",
    source_code_link: "https://github.com/piyushrajyadav/CodeTrail",
    deployed_link: "https://code-trail-dusky.vercel.app/",
    category: "ai",
    featured: true,
  },
  {
    name: "DropFade - Secure Ephemeral File Sharing",
    description:
      "Featured in Top 20 on Product Hunt! A privacy-first file sharing platform where files self-destruct after access. Upload any file, get a unique code, share it - the file vanishes permanently from cloud storage once downloaded. Built to solve the frustrating WhatsApp login hassle in college labs. No accounts, no traces, just secure instant sharing with international user base.",
    tags: [
      {
        name: "next.js",
        color: "blue-text-gradient",
      },
      {
        name: "shadcn",
        color: "green-text-gradient",
      },
      {
        name: "redis",
        color: "pink-text-gradient",
      },
      {
        name: "cloud-storage",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/dropfade.svg",
    source_code_link: "https://github.com/piyushrajyadav/dropfade",
    deployed_link: "https://dropfade.piyushyadav.me/",
    category: "fullstack",
    featured: true,
  },
  {
    name: "Yantrika AI - Multi-Agent Development Platform",
    description:
      "Premium multi-agent orchestration platform that simulates a complete AI software development team. Enter a project idea and watch specialized AI agents collaborate to generate PRD, system architecture, production-ready code, and test suites. Built with CrewAI for agent coordination, Groq API (Llama 3.3 70B) for ultra-fast inference, Next.js 14, and modern glassmorphism UI. GitHub starred project showcasing advanced agentic AI workflows.",
    tags: [
      {
        name: "crewai",
        color: "blue-text-gradient",
      },
      {
        name: "multi-agent",
        color: "green-text-gradient",
      },
      {
        name: "groq",
        color: "pink-text-gradient",
      },
      {
        name: "next.js",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/yantrika.svg",
    source_code_link: "https://github.com/piyushrajyadav/Yantrika-AI",
    deployed_link: "",
    category: "ai",
    featured: true,
  },
  {
    name: "Geeta GPT - Spiritual AI Companion",
    description:
      "Conversational AI chatbot that channels wisdom from the Bhagavad Gita through Lord Krishna's voice. Powered by Google Gemini and LangChain for intelligent context-aware responses with relevant shlokas and timeless guidance. Whether facing career dilemmas, relationship struggles, or existential questions - receive personalized spiritual insights. Built with Next.js, RAG architecture, and vector embeddings for accurate scripture retrieval.",
    tags: [
      {
        name: "langchain",
        color: "blue-text-gradient",
      },
      {
        name: "gemini",
        color: "green-text-gradient",
      },
      {
        name: "rag",
        color: "pink-text-gradient",
      },
      {
        name: "next.js",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/geetagpt.svg",
    source_code_link: "https://github.com/piyushrajyadav/geeta-gpt",
    deployed_link: "https://geeta-gpt.vercel.app/",
    category: "ai",
  },
  {
    name: "PassiveCaptcha - ML-Powered Human Verification",
    description:
      "Frictionless, machine-learning powered human verification system eliminating traditional CAPTCHA friction. Passively collects DOM telemetry and behavioral biometrics (mouse linearity, scroll jerk, keystroke rhythms) without tracking PII. Multi-model ML ensemble with XGBoost, Random Forest, and LSTM for real-time bot detection. Features explainable AI with SHAP values, enterprise analytics dashboard, stateless JWT sessions, and Redis-backed rate limiting. Zero friction for humans, impenetrable for bots.",
    tags: [
      {
        name: "machine-learning",
        color: "blue-text-gradient",
      },
      {
        name: "lstm",
        color: "green-text-gradient",
      },
      {
        name: "xgboost",
        color: "pink-text-gradient",
      },
      {
        name: "security",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/passive-captcha.svg",
    source_code_link: "https://github.com/piyushrajyadav/PassiveCaptcha",
    deployed_link: "",
    category: "ai",
    featured: true,
  },
  {
    name: "HelioCast - Solar Power Forecasting Platform",
    description:
      "Deep learning-powered solar energy forecasting system using Bidirectional LSTM Neural Networks with 12 temporal and weather features. Provides real-time power output predictions and comprehensive 24-hour hourly forecasts. Built with TensorFlow for ML inference, Flask RESTful API with smart defaults and MinMaxScaler normalization, React + TypeScript frontend with WebGL shader backgrounds (fractal mountains, animated GLSL hills), interactive Recharts visualizations, and modern Tailwind CSS + shadcn/ui design. Production-ready with CORS support.",
    tags: [
      {
        name: "lstm",
        color: "blue-text-gradient",
      },
      {
        name: "tensorflow",
        color: "green-text-gradient",
      },
      {
        name: "react",
        color: "pink-text-gradient",
      },
      {
        name: "webgl",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/heliocast.svg",
    source_code_link: "https://github.com/piyushrajyadav/heliocast",
    deployed_link: "",
    category: "ai",
    featured: false,
  },
  {
    name: "Code Explainer - Intelligent Code Analysis Tool",
    description:
      "Intelligent code analysis tool helping developers understand code functionality through detailed explanations. Dual analysis approach: rule-based pattern recognition through syntax parsing for fast structural analysis, and NLP-based AI explanations using transformer models (CodeBERT, CodeGen, Gemini) for semantic understanding. Multi-language support (JavaScript, Python, Java, C++), modern UI with CodeMirror syntax highlighting, real-time analysis, and detailed insights on function signatures, class hierarchies, and code complexity metrics.",
    tags: [
      {
        name: "nlp",
        color: "blue-text-gradient",
      },
      {
        name: "transformers",
        color: "green-text-gradient",
      },
      {
        name: "codebert",
        color: "pink-text-gradient",
      },
      {
        name: "gemini",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/code-explainer.svg",
    source_code_link: "https://github.com/piyushrajyadav/code-explainer",
    deployed_link: "",
    category: "ai",
  },
  {
    name: "AI Meeting Summarizer - Smart Note Taker",
    description:
      "Never miss action items again. AI-powered meeting assistant that transforms raw meeting notes into structured summaries with key insights, decisions, and next steps extracted automatically. Features intelligent NLP for topic extraction, action item identification, participant tracking, and automated email distribution to all attendees. Built with Next.js, Google Gemini for text analysis, and NodeMailer for email integration. Perfect for remote teams and productivity optimization.",
    tags: [
      {
        name: "genai",
        color: "blue-text-gradient",
      },
      {
        name: "nlp",
        color: "green-text-gradient",
      },
      {
        name: "next.js",
        color: "pink-text-gradient",
      },
      {
        name: "email-api",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/ai-meeting-summarizer.svg",
    source_code_link: "https://github.com/piyushrajyadav/AI-Meeting-summarizer",
    deployed_link: "https://meeting-notes-theta.vercel.app/",
    category: "ai",
  },
  {
    name: "Restro Voice Booking - Conversational AI Assistant",
    description:
      "Voice-enabled AI booking assistant for restaurant table reservations with natural language understanding. Supports bilingual conversations in English and Hindi with seamless code-switching. Powered by Google Gemini for NLP, Web Speech API for voice interaction, real-time weather integration for intelligent seating suggestions, calendar-based availability system, automated email confirmations via NodeMailer, and admin dashboard with booking analytics. Gracefully handles off-topic queries.",
    tags: [
      {
        name: "voice-ai",
        color: "blue-text-gradient",
      },
      {
        name: "gemini",
        color: "green-text-gradient",
      },
      {
        name: "nlp",
        color: "pink-text-gradient",
      },
      {
        name: "mern",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/restro-voice.svg",
    source_code_link: "https://github.com/piyushrajyadav/Restro-voice-booking",
    deployed_link: "",
    category: "ai",
    featured: false,
  },
  {
    name: "Smart Legal Assistant - AI Contract Generator",
    description:
      "AI-powered legal document assistant for drafting, reviewing, and managing contracts with precision. Powered by LangChain and Google Gemini for intelligent contract generation, risk clause detection, and legal jargon simplification. Features contract templates, clause analysis, compliance checking, and document management. Built with Python backend and Next.js frontend. Perfect for startups, freelancers, and small businesses needing lawyer-quality assistance.",
    tags: [
      {
        name: "langchain",
        color: "blue-text-gradient",
      },
      {
        name: "gemini",
        color: "green-text-gradient",
      },
      {
        name: "python",
        color: "pink-text-gradient",
      },
      {
        name: "next.js",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/legal-assistant.svg",
    source_code_link: "https://github.com/piyushrajyadav/DigiLex-ai",
    deployed_link: "",
    category: "ai",
  },
  {
    name: "TypePulse - Master Your Typing Speed",
    description:
      "A beautifully designed typing speed test that makes practice addictive. Track WPM and accuracy in real-time with smooth animations. Features multiple difficulty levels, custom text options, and detailed performance analytics. Built with Next.js and TypeScript for a buttery-smooth experience that helps developers and writers level up their keyboard skills.",
    tags: [
      {
        name: "next.js",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "css-modules",
        color: "pink-text-gradient",
      },
    ],
    image: "/assets/projects/typepulse.svg",
    source_code_link: "https://github.com/piyushrajyadav/TypePulse",
    deployed_link: "https://typepulse.vercel.app/",
    category: "fullstack",
  },
];

const socials = [
  {
    id: "github",
    icon: <GithubIcon />,
    link: "https://github.com/piyushrajyadav",
  },
  {
    id: "linkedin",
    icon: <LinkedInIcon />,
    link: "https://www.linkedin.com/in/piyushrajyadav/",
  },
  {
    id: "x",
    icon: <XIcon />,
    link: "https://x.com/PiyushYada49189",
  },
  {
    id: "instagram",
    icon: <InstagramIcon />,
    link: "https://www.instagram.com/piyushyadav_raj/",
  },
];

const heroTexts = [
  "Software Developer",
  500,
  "AI Enthusiast",
  500,
  "Full-Stack developer",
  500,
  "Frontend developer",
  500,
  "Backend developer",
  500,
  "Problem solver",
  500,
];

export {
  navLinks,
  services,
  technologies,
  experiences,
  testimonials,
  projects,
  projectCategories,
  socials,
  heroTexts,
};
