/**
 * Central copy + links for the portfolio.
 * Edit this file to update text, roles, projects, and social URLs.
 */

import resumePdf from "../assets/pdf/SAUD_AFAQ_CV.pdf";
import careerImgDiverseDreams from "../assets/images/dd.png";
import careerImgHeidi from "../assets/images/heidi.png";
import careerImgMintellity from "../assets/images/mintellity.png";
import careerImgWapp from "../assets/images/wapp.png";

export const profile = {
  name: "Saud Afaq",
  nameHighlight: "AFAQ",
  initials: "SA",
  title: "Senior Flutter engineer · mobile product delivery",
  location: "Berlin, Germany",
  locationNote: "Based in Berlin · open to product-focused mobile roles",
  email: "Saud.afaq123@gmail.com",
  phoneDisplay: "+49 157 85104060",
  linkedinUrl: "https://www.linkedin.com/in/saud-bin-afaq-25066b133/",
  githubUrl: "https://github.com/SAUDAFAQ",
  /** Bundled from `src/assets/pdf/SAUD_AFAQ_CV.pdf` */
  resumePath: resumePdf,
  heroTagline:
    "Berlin-based Flutter engineer building scalable mobile products with strong UX, clean architecture, and real-world product focus.",
  openTo:
    "Open to senior Flutter roles, founding-engineer positions, and high-trust mobile products.",
  /** Hero right column — stacked headline */
  heroEyebrow: "Senior Flutter Engineer &",
  heroAccentLine: "MOBILE",
  heroPrimaryLine: "DEVELOPER",
} as const;

export const about = {
  body: `I’m a software engineer with several years of production experience in Flutter and Dart, mostly in Germany-based startups and product-led teams. I ship cross-platform apps with clear architecture (Clean Architecture, BLoC/Cubit), solid API layers, and the kind of UX polish users notice in daily use.

I’m comfortable owning features end to end—APIs and Firebase, payments and subscriptions, notifications, offline behaviour, tests, and release workflows—while staying aligned with product and design. I like lean teams where engineering decisions are tied to user outcomes, not buzzwords.`,
};

export type CareerEntry = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

export const career: CareerEntry[] = [
  {
    role: "Senior Flutter engineer (Founding Engineer)",
    company: "Diverse Dreams AI · Berlin",
    period: "Recent",
    summary:
      "Flutter app for AI storytelling: generation flows, subscriptions, founding-engineer scope.",
  },
  {
    role: "Flutter developer (Android / iOS)",
    company: "HEIDI GmbH · Salzkotten, DE",
    period: "May 2023 – Jul 2024",
    summary:
      "Smart-city citizen app: Clean Architecture, BLoC, Dio/REST, design-led UX.",
  },
  {
    role: "Flutter developer (Android / iOS)",
    company: "Mintellity GmbH · Münster, DE",
    period: "Jan 2021 – Apr 2023",
    summary:
      "Booking & events: GraphQL/REST, offline (Hive/Drift), maps, notifications, payments.",
  },
  {
    role: "Android developer (Kotlin)",
    company: "WAPP GmbH · Bielefeld, DE",
    period: "Sep 2019 – Dec 2020",
    summary:
      "Kotlin Android: MVVM, REST, async UI from design to production.",
  },
];

export type WhatCard = {
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
};

export const whatIDoCards: WhatCard[] = [
  {
    eyebrow: "Mobile product engineering",
    title: "Flutter apps that survive real users",
    body: "Cross-platform apps with clean layering, thoughtful state management, and UI that stays consistent from phones to tablets.",
    tags: [
      "Flutter",
      "Dart",
      "BLoC / Cubit",
      "Clean Architecture",
      "Responsive UI",
    ],
  },
  {
    eyebrow: "Integrations & platform work",
    title: "APIs, Firebase, and monetisation",
    body: "REST integrations (including Dio), Firebase services, subscriptions and one-off purchases, webhooks, notifications (FCM and local), and pragmatic offline strategies when connectivity is messy.",
    tags: [
      "Firebase",
      "REST / GraphQL",
      "Stripe",
      "RevenueCat",
      "FCM",
      "CI/CD",
    ],
  },
];

export type Project = {
  title: string;
  category: string;
  stack: string;
  bullets: string[];
  image: string;
  /** Public URL, or omit / null for no external demo */
  link?: string | null;
  ctaLabel?: string;
};

/** Selected work carousel — one slide per employer; same shape/layout as before, images from `src/assets/images`. */
export const projects: Project[] = [
  {
    title: "Diverse Dreams AI",
    category: "AI storytelling · Flutter · Berlin",
    stack: "Flutter · OpenAI APIs · subscriptions",
    bullets: [
      "Story-generation flows in Flutter for caregivers and kids.",
      "Subscriptions, entitlements, early product iteration.",
      "Founding engineer: features, releases, technical trade-offs.",
    ],
    image: careerImgDiverseDreams,
    link: null,
    ctaLabel: "Case study (contact)",
  },
  {
    title: "HEIDI GmbH",
    category: "Smart city · Flutter · Salzkotten",
    stack: "Flutter · Clean Architecture · BLoC · Dio · REST",
    bullets: [
      "Production citizen app: APIs, errors, maintainable structure.",
      "Design collaboration; consistent Android/iOS UX.",
      "Testing and performance for stable releases.",
    ],
    image: careerImgHeidi,
    link: null,
    ctaLabel: "Contact me",
  },
  {
    title: "Mintellity GmbH",
    category: "Booking & events · Flutter · Münster",
    stack: "Flutter · GraphQL · REST · Hive · Drift",
    bullets: [
      "Booking/event apps: GraphQL/REST, offline storage.",
      "Maps, notifications, payments where needed.",
      "Modular code, tests before release.",
    ],
    image: careerImgMintellity,
    link: null,
    ctaLabel: "Contact me",
  },
  {
    title: "WAPP GmbH",
    category: "Android · Kotlin · Bielefeld",
    stack: "Kotlin · MVVM · REST",
    bullets: [
      "Native Android: MVVM, REST, async data.",
      "Screens built to design, production quality.",
      "Step before full-time Flutter focus.",
    ],
    image: careerImgWapp,
    link: null,
    ctaLabel: "Contact me",
  },
];

/**
 * 3D tech bubbles: white spheres, white decal, colored tech name.
 * Optional icon: add `iconUrl` (e.g. Devicon SVG). Name prints under the icon unless
 * `showNameWithIcon: false` (icon-only).
 */
export type TechStackLabel = {
  name: string;
  color: string;
  iconUrl?: string;
  showNameWithIcon?: boolean;
};

export const techStackLabels: TechStackLabel[] = [
  { name: "Flutter", color: "#02569B" },
  { name: "Dart", color: "#0175C2" },
  { name: "Firebase", color: "#CA6510" },
  { name: "Android", color: "#0F9D58" },
  { name: "Kotlin", color: "#7F52FF" },
  { name: "Java", color: "#E76F00" },
  { name: "iOS", color: "#007AFF" },
  { name: "GraphQL", color: "#E10098" },
  { name: "JavaScript", color: "#D4A017" },
  { name: "Python", color: "#3C873A" },
  { name: "Git", color: "#F54D27" },
  { name: "GitHub Actions", color: "#1a1a2e" },
  { name: "SQLite", color: "#003B57" },
  { name: "MySQL", color: "#00758F" },
  { name: "Figma", color: "#A259FF" },
  { name: "Cursor", color: "#007ACC" },
  { name: "Agile", color: "#C21325" },
  { name: "REST", color: "#374151" },
  { name: "Testing", color: "#4285F4" },
  { name: "CI/CD", color: "#4285F4" },
  { name: "Stripe", color: "#4285F4" },
  
  // Icon example (logo + name on white decal):
  // {
  //   name: "React",
  //   color: "#149ECA",
  //   iconUrl:
  //     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  // },
  // Icon only: set `showNameWithIcon: false`.
];

export const education = [
  {
    degree: "MSc Computer Science",
    school: "University of Paderborn · Germany",
    years: "Mar 2019 – Mar 2023",
  },
  {
    degree: "BSc Computer Science",
    school: "Bahria University · Karachi, Pakistan",
    years: "Mar 2014 – Mar 2018",
  },
] as const;

export const languages = [
  "English — professional proficiency",
  "German — intermediate",
] as const;
