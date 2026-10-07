export const workCategories = [
  "All",
  "Product",
  "Platform",
  "Commerce",
  "Brand",
] as const

export type WorkCategory = Exclude<(typeof workCategories)[number], "All">

export type WorkProject = {
  slug: string
  title: string
  client: string
  year: string
  category: WorkCategory
  industry: string
  summary: string
  description: string
  challenge: string
  approach: string
  outcome: string
  metrics: { label: string; value: string }[]
  services: string[]
  stack: string[]
  image: string
  featured?: boolean
}

export const projects: WorkProject[] = [
  {
    slug: "northline",
    title: "Northline",
    client: "Northline Outdoor",
    year: "2026",
    category: "Commerce",
    industry: "Outdoor retail",
    summary: "Headless storefront for a 90-year outdoor retailer.",
    description:
      "Northline needed a shop that could handle catalog, editorial, and campaign work without looking like a default Shopify theme.",
    challenge:
      "The old site was a theme on a warehouse catalog. Slow to load, hard to merchandize, weak conversion.",
    approach:
      "Custom storefront on Hydrogen, Sanity for merchandising, checkout rebuilt around their flows. Performance was a launch requirement.",
    outcome:
      "Conversion up 38% in the first weeks. Campaign pages go live without an engineering ticket. LCP at 0.9s.",
    metrics: [
      { label: "Conversion", value: "+38%" },
      { label: "LCP", value: "0.9s" },
      { label: "Campaign time", value: "−64%" },
    ],
    services: ["Product engineering", "Websites & platforms", "Design systems"],
    stack: ["React", "Shopify Hydrogen", "Sanity", "Cloudflare"],
    image: "/images/work/northline.jpg",
    featured: true,
  },
  {
    slug: "kite-health",
    title: "Kite Health",
    client: "Kite",
    year: "2025",
    category: "Product",
    industry: "Healthtech",
    summary: "Care coordination software for clinic networks.",
    description:
      "A multi-sided platform for clinics that had outgrown spreadsheets and could not afford another unused portal.",
    challenge:
      "Care teams were stitching five tools to move a patient from intake to follow-up. Extra clicks meant drop-off.",
    approach:
      "We sat with nurses as well as product owners. Keyboard-first interface, next action always visible. Modular architecture so new specialties can land without a rewrite.",
    outcome:
      "Kite is now the system of record for a growing clinic network. Weekly active use held after launch.",
    metrics: [
      { label: "Weekly actives", value: "12k" },
      { label: "Task time", value: "−47%" },
      { label: "Specialties", value: "8" },
    ],
    services: ["Product engineering", "Custom software", "Technical direction"],
    stack: ["React", "TypeScript", "Supabase", "Postgres"],
    image: "/images/work/kite.jpg",
    featured: true,
  },
  {
    slug: "atelier-no-4",
    title: "Atelier No. 4",
    client: "Atelier No. 4",
    year: "2026",
    category: "Brand",
    industry: "Fashion",
    summary: "Editorial site and CMS for a fashion house.",
    description:
      "A fashion house needed a site with the same pacing as its collections, plus a CMS editors could run themselves.",
    challenge:
      "Portfolio themes flattened the work. Every lookbook waited on a developer.",
    approach:
      "Type-led design system and a CMS built around collections, films, notes, and shops. Motion kept small. Images treated as objects.",
    outcome:
      "Editors publish in hours. The site is now part of new-business conversations, and press picked it up 14 times in the first season.",
    metrics: [
      { label: "Publish time", value: "Hours, not weeks" },
      { label: "Press features", value: "14" },
      { label: "Avg. session", value: "3m 40s" },
    ],
    services: ["Websites & platforms", "Design systems"],
    stack: ["React", "Vite", "Sanity", "Cloudinary"],
    image: "/images/work/atelier.jpg",
    featured: true,
  },
  {
    slug: "harbor",
    title: "Harbor",
    client: "Harbor Logistics",
    year: "2025",
    category: "Platform",
    industry: "Logistics",
    summary: "Dispatch console for freight yards.",
    description:
      "A freight company needed one screen for yards, drivers, and exceptions.",
    challenge:
      "Ops lived in email, whiteboards, and a 2007 desktop tool. Exceptions hid until they were expensive.",
    approach:
      "We mapped the dispatch loop, then built a dense console: live yard state, exception queues, and audit trails. Legibility at 6 a.m. was the brief.",
    outcome:
      "Dispatchers use the screen as the source of truth. Average exception resolution dropped 41%. Eleven yards are live.",
    metrics: [
      { label: "Dispatch time", value: "−41%" },
      { label: "Exceptions", value: "Visible in 2s" },
      { label: "Yards live", value: "11" },
    ],
    services: ["Custom software", "Product engineering", "Technical direction"],
    stack: ["React", "Node", "Postgres", "Redis"],
    image: "/images/work/harbor.jpg",
  },
  {
    slug: "solace",
    title: "Solace",
    client: "Solace Audio",
    year: "2026",
    category: "Product",
    industry: "Consumer audio",
    summary: "Listening app for an independent audio brand.",
    description:
      "An independent audio company wanted a streaming product that matched their hardware.",
    challenge:
      "Generic music apps made the catalog feel interchangeable. They needed their own player.",
    approach:
      "Playback built around albums and rooms, large type, and tactile controls. React, Web Audio, Supabase.",
    outcome:
      "Day-30 retention at 61%. Catalog plays up 2.4×. Support tickets down.",
    metrics: [
      { label: "Retention D30", value: "61%" },
      { label: "Catalog plays", value: "+2.4×" },
      { label: "Support tickets", value: "−22%" },
    ],
    services: ["Product engineering", "Websites & platforms"],
    stack: ["React", "Web Audio", "Supabase", "Cloudflare R2"],
    image: "/images/work/solace.jpg",
  },
  {
    slug: "civic-ledger",
    title: "Civic Ledger",
    client: "City of Redwood",
    year: "2025",
    category: "Platform",
    industry: "Public sector",
    summary: "Searchable public records for the City of Redwood.",
    description:
      "A records portal rebuilt so residents can find documents without calling the clerk.",
    challenge:
      "Documents were online in the legal sense and unusable in every other. Staff answered the same requests daily.",
    approach:
      "Search that matches how residents ask questions, plus scanable layouts. Accessibility and performance were launch criteria.",
    outcome:
      "Self-serve up 71%. Records tickets down 33%. The portal meets WCAG AA.",
    metrics: [
      { label: "Self-serve", value: "+71%" },
      { label: "Ticket volume", value: "−33%" },
      { label: "WCAG", value: "AA" },
    ],
    services: ["Websites & platforms", "Custom software"],
    stack: ["React", "Postgres", "Meilisearch", "Supabase"],
    image: "/images/work/civic.jpg",
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getFeaturedWork() {
  return projects.filter((project) => project.featured)
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return projects[0]
  return projects[(index + 1) % projects.length]
}
