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

const projects = [
  {
    name: "CodeTrail - AI Career Guidance Platform",
    description:
      "Your personal AI career coach that analyzes your resume and GitHub profile to uncover skill gaps, recommend perfect roles, suggest impactful projects, and build a custom learning roadmap. Unlike generic career advice, CodeTrail uses generative AI to provide hyper-personalized guidance tailored to your unique developer journey.",
    tags: [
      {
        name: "next.js",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "genai",
        color: "pink-text-gradient",
      },
      {
        name: "career-guidance",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/codetrail.svg",
    source_code_link: "https://github.com/piyushrajyadav/CodeTrail",
    deployed_link: "https://code-trail-dusky.vercel.app/",
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
    featured: true,
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
    featured: true,
  },
  {
    name: "CodeChronicle - Git Platform with Analytics",
    description:
      "A GitHub-like code hosting platform built from scratch with a custom Git engine. What makes it unique? Queryable version history and code evolution analytics - find most changed files, detect risky hotspots, track author contributions, and visualize commit patterns. Features custom SHA-256 based storage, branch management, and a full REST API. Final year project showcasing deep VCS internals.",
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
    deployed_link: "https://github.com/piyushrajyadav/CodeChronicle",
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
    featured: true,
  },
  {
    name: "Geeta GPT - Spiritual AI Companion",
    description:
      "Seek wisdom from the Bhagavad Gita through conversations with Lord Krishna himself. This AI chatbot, powered by Gemini and LangChain, responds to life's questions with relevant shlokas and timeless guidance. Whether facing career dilemmas, relationship struggles, or existential questions - receive personalized spiritual insights in Krishna's authentic voice.",
    tags: [
      {
        name: "next.js",
        color: "blue-text-gradient",
      },
      {
        name: "langchain",
        color: "green-text-gradient",
      },
      {
        name: "gemini",
        color: "pink-text-gradient",
      },
    ],
    image: "/assets/projects/geetagpt.svg",
    source_code_link: "https://github.com/piyushrajyadav/geeta-gpt",
    deployed_link: "https://geeta-gpt.vercel.app/",
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
  },
  {
    name: "AI Meeting Summarizer",
    description:
      "Never miss action items again. Paste your meeting notes and get AI-generated summaries with key insights, decisions, and next steps extracted automatically. Built-in email integration sends summaries directly to all participants. Perfect for remote teams who want to spend less time on documentation and more time on execution.",
    tags: [
      {
        name: "next.js",
        color: "blue-text-gradient",
      },
      {
        name: "genai",
        color: "green-text-gradient",
      },
      {
        name: "email-api",
        color: "pink-text-gradient",
      },
      {
        name: "nlp",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/ai-meeting-summarizer.svg",
    source_code_link: "https://github.com/piyushrajyadav/AI-Meeting-summarizer",
    deployed_link: "https://meeting-notes-theta.vercel.app/",
  },
  {
    name: "Smart Legal Assistant - AI Contract Generator",
    description:
      "Draft, review, and manage legal contracts with AI precision. Powered by LangChain and Gemini, this Web3-ready tool generates compliant contracts, spots risky clauses, and simplifies legal jargon. Whether you're a startup founder or freelancer, get lawyer-quality document assistance without the billable hours.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "next.js",
        color: "green-text-gradient",
      },
      {
        name: "langchain",
        color: "pink-text-gradient",
      },
      {
        name: "gemini",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/legal-assistant.svg",
    source_code_link: "https://github.com/piyushrajyadav/DigiLex-ai",
    deployed_link: "https://github.com/piyushrajyadav",
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
  socials,
  heroTexts,
};
