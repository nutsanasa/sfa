export type Service = {
  number: string
  slug: string
  title: string
  lede: string
  body: string
  outcomes: string[]
}

export const services: Service[] = [
  {
    number: "01",
    slug: "web-development",
    title: "Web development",
    lede: "Marketing sites and platforms that editors can run.",
    body: "We build the public site, the CMS, and the performance budget as one project. Fast, accessible, and still usable when a campaign lands on a Tuesday.",
    outcomes: [
      "Marketing sites and platforms",
      "Content systems and CMS",
      "Performance budgets",
      "Accessible frontends",
    ],
  },
  {
    number: "02",
    slug: "custom-software",
    title: "Custom software",
    lede: "Internal tools and consoles when the spreadsheet is the product.",
    body: "If the off-the-shelf tool is the bottleneck, we write the one you need. Dense screens, clear states, data models that match how the work happens.",
    outcomes: [
      "Operations consoles",
      "Customer portals",
      "Integrations and data layers",
      "Admin and back-office systems",
    ],
  },
  {
    number: "03",
    slug: "saas-development",
    title: "SaaS & web applications",
    lede: "Multi-tenant products with billing, roles, and settings.",
    body: "We design and ship the application together, from first-run to the admin screen. Architecture stays modular so the next version does not need a rewrite.",
    outcomes: [
      "SaaS platforms and dashboards",
      "Multi-tenant architecture",
      "Auth, billing, and permissions",
      "Design-to-code systems",
    ],
  },
  {
    number: "04",
    slug: "mobile-applications",
    title: "Mobile applications",
    lede: "iOS and Android apps that match the rest of the product.",
    body: "Native-quality mobile without a second vendor. Design language, data, and release process stay aligned with the web.",
    outcomes: [
      "iOS and Android apps",
      "Companions to web platforms",
      "Offline and realtime flows",
      "Store submission and updates",
    ],
  },
  {
    number: "05",
    slug: "ecommerce",
    title: "E-commerce development",
    lede: "Storefronts, merchandising, and checkout.",
    body: "We treat commerce as a product: editorial merchandising, custom checkout, and a system merchandisers can run without a ticket. Conversion is design and engineering.",
    outcomes: [
      "Headless and custom storefronts",
      "Checkout and merchandising",
      "Content-led campaigns",
      "Performance and SEO",
    ],
  },
  {
    number: "06",
    slug: "ui-ux",
    title: "UI/UX engineering",
    lede: "Interface design in the same room as production code.",
    body: "We prototype in the stack when a file would take longer. The people who design the screens are the people who ship them.",
    outcomes: [
      "Product interface design",
      "Design systems and tokens",
      "Motion",
      "Accessibility from the first pass",
    ],
  },
  {
    number: "07",
    slug: "api-backend",
    title: "API & backend",
    lede: "Data models, integrations, and services.",
    body: "We model the real work, expose clear APIs, and treat errors, audit logs, and jobs as designed surfaces.",
    outcomes: [
      "API design and integrations",
      "Data modeling and migrations",
      "Auth, jobs, and observability",
      "Partner and third-party systems",
    ],
  },
  {
    number: "08",
    slug: "ai-automation",
    title: "AI & automation",
    lede: "Models and automation where they remove work.",
    body: "We add them when they cut a real task, with human review and a fallback. The product still works if the model is wrong.",
    outcomes: [
      "Workflow automation",
      "Assistive product features",
      "Document and ops tools",
      "Evaluation and guardrails",
    ],
  },
  {
    number: "09",
    slug: "web3",
    title: "Blockchain / Web3",
    lede: "Wallets, minting, and protocol-adjacent interfaces.",
    body: "We take this work when a ledger is part of the product. If it is a marketing layer, we will say so.",
    outcomes: [
      "dApps and minting flows",
      "Wallet and identity UX",
      "Protocol-adjacent products",
      "Security review in delivery",
    ],
  },
  {
    number: "10",
    slug: "mvp-care",
    title: "MVP & long-term care",
    lede: "A first version, then a team that stays.",
    body: "Sprints for proof. Builds for launch. Retainers for the year after, when the product has to keep running.",
    outcomes: [
      "MVP and v1 builds",
      "Launch hardening",
      "Maintenance and iteration",
      "Retainer partnership",
    ],
  },
]

export const engagements = [
  {
    title: "Sprint",
    duration: "2–4 weeks",
    detail:
      "A focused pass: prototype, technical spike, or a small site. Small team, one artifact.",
  },
  {
    title: "Build",
    duration: "8–16 weeks",
    detail:
      "The usual product or platform job. Kickoff through launch, design and engineering together.",
  },
  {
    title: "Partner",
    duration: "Retainer",
    detail:
      "Ongoing work after launch. We stay on the system instead of handing you a ticket queue.",
  },
]

export const faqs = [
  {
    question: "Are you a design studio or a development shop?",
    answer:
      "Both. We design and write the production code. One team, one project.",
  },
  {
    question: "Do you take on design-only or code-only projects?",
    answer:
      "Rarely. The overlap is the point. If you already have a strong counterpart on one side, a focused slice can still make sense — we will say so quickly.",
  },
  {
    question: "What does a typical engagement cost?",
    answer:
      "Most builds land between $40k and $180k depending on scope, integrations, and how much of the product is still undefined. Sprints start lower. We scope in writing before anyone starts.",
  },
  {
    question: "Who do we work with day to day?",
    answer:
      "A small senior team. The people on the kickoff call do the work.",
  },
]
