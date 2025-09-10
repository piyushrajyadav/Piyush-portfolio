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
    title: "AI -ML Engineer",
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
      "Contributed extensively to ERP HR and CRM sections of Alphaxine ERP system using Spring Boot backend with React frontend and MySQL database.",
      "Developed and implemented master data configuration features for employee management, enabling administrators to define and customize employee hierarchies, roles, and organizational structures.",
      "Built comprehensive HR modules including employee onboarding workflows, attendance management systems, and performance tracking dashboards.",
      "Designed and developed CRM functionalities for customer relationship management, including lead tracking, sales pipeline management, and customer interaction history.",
      "Worked on full-stack development, including responsive UI design, REST API integration, and database optimization for enterprise-scale applications."
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
    name: "AI Meeting Summarizer",
    description:
      "An intelligent web application that converts meeting recordings into comprehensive notes and summaries. Features include automatic transcription, AI-powered summarization, and email integration to send meeting summaries to participants.",
    tags: [
      {
        name: "next.js",
        color: "blue-text-gradient",
      },
      {
        name: "openai",
        color: "green-text-gradient",
      },
      {
        name: "langchain",
        color: "pink-text-gradient",
      },
      {
        name: "email-integration",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/meeting-summarizer.svg",
    source_code_link: "https://github.com/piyushrajyadav/AI-Meeting-summarizer",
    deployed_link: "https://meeting-notes-theta.vercel.app/",
  },
  {
    name: "Geeta GPT - Bhagavad Gita Based Chatbot",
    description:
      "Built with Gemini API and GenAI to answer user questions in Krishna's voice. The application provides spiritual guidance and wisdom from the Bhagavad Gita in an interactive conversational format.",
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
    name: "CodeTrail - AI-Powered Career Guidance",
    description:
      "Upload your resume and GitHub profile to get personalized skill gap analysis, role recommendations, project suggestions, and a custom learning roadmap. Powered by generative AI to provide intelligent career guidance for developers.",
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
  },
  {
    name: "TypePulse - Typing Speed Test Website",
    description:
      "TypePulse is a sleek and responsive typing speed test application built with Next.js. It helps users improve typing speed and accuracy while providing real-time stats and an engaging user experience.",
    tags: [
      {
        name: "next.js",
        color: "blue-text-gradient",
      },
      {
        name: "react",
        color: "green-text-gradient",
      },
      {
        name: "typescript",
        color: "pink-text-gradient",
      },
      {
        name: "css modules",
        color: "orange-text-gradient",
      },
      {
        name: "vercel",
        color: "blue-text-gradient",
      },
    ],
    image: "/assets/projects/typepulse.svg",
    source_code_link: "https://github.com/piyushrajyadav",
    deployed_link: "https://github.com/piyushrajyadav",
  },
  {
    name: "CodeExplainer - NLP-Powered Code Explanation",
    description:
      "A smart web application that uses NLP to analyze and explain code snippets, making complex code easier to understand with detailed explanations and language support.",
    tags: [
      {
        name: "next.js",
        color: "blue-text-gradient",
      },
      {
        name: "python",
        color: "green-text-gradient",
      },
      {
        name: "fastapi",
        color: "pink-text-gradient",
      },
      {
        name: "nlp",
        color: "orange-text-gradient",
      },
      {
        name: "huggingface",
        color: "blue-text-gradient",
      },
      {
        name: "aws",
        color: "green-text-gradient",
      },
    ],
    image: "/assets/projects/code-explainer.svg",
    source_code_link: "https://github.com/piyushrajyadav/code-explainer",
    deployed_link: "https://github.com/piyushrajyadav",
  },
  {
    name: "DigiLex AI - Smart Legal Assistant",
    description:
      "AI-powered legal document generator and analyzer built with advanced language models. This tool helps users create, review, and manage legal contracts with intelligent AI assistance and document analysis.",
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
        name: "ai",
        color: "orange-text-gradient",
      },
    ],
    image: "/assets/projects/legal-assistant.svg",
    source_code_link: "https://github.com/piyushrajyadav/DigiLex-ai",
    deployed_link: "https://github.com/piyushrajyadav",
  },
  {
    name: "DropFade - File Management System",
    description:
      "A secure file and text sharing platform where users can upload files and receive a unique code. Anyone with the code can access the exact file without login. Files are automatically deleted permanently from the cloud database after access for enhanced security.",
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
  "Full-Stack Developer",
  500,
  "AI Enthusiast",
  500,
  "Software Engineer",
  500,
  "MERN Stack Developer",
  500,
  "Spring Boot Developer",
  500,
  "Problem Solver",
  500,
  "Innovation Driver",
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
