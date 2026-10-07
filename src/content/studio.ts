export const manifesto = {
  eyebrow: "Studio",
  title: "A studio that designs and builds.",
  body: "Openlab is four people in Los Angeles: design, product, and engineering on the same projects. We take a small number of clients so the people you meet are the people who ship.",
}

export const capabilities = [
  "Product strategy",
  "Interface design",
  "Frontend engineering",
  "Backend systems",
  "Platforms & CMS",
  "Commerce",
  "Mobile",
  "AI & automation",
  "Motion",
  "Accessibility",
  "Technical direction",
]

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    body: "A few concentrated days. We map the business, the constraints, and who uses the product.",
  },
  {
    number: "02",
    title: "Frame",
    body: "A written plan: what we will build, the architecture, and the order of work. Includes what is out of scope.",
  },
  {
    number: "03",
    title: "Design",
    body: "Interfaces and systems. We prototype in code when a file would slow the project down.",
  },
  {
    number: "04",
    title: "Build",
    body: "Senior engineers, regular reviews. Foundations first, then the parts people see.",
  },
  {
    number: "05",
    title: "Launch",
    body: "Ship, watch real traffic, fix what shows up. We stay through the first week live.",
  },
]

export const values = [
  {
    title: "Same team",
    body: "Designers and engineers work on the same tickets. You will not get a different team after the pitch.",
  },
  {
    title: "Fewer clients",
    body: "We take a handful of projects at a time. That is how the work stays consistent.",
  },
  {
    title: "Write it down",
    body: "Scope, architecture, and decisions live in a doc. If it is not written, it is not agreed.",
  },
  {
    title: "Finish it",
    body: "Empty states, errors, load time, the week after launch. That work is part of the job.",
  },
]

export const team = [
  {
    name: "Amina Cole",
    role: "Design Director",
    bio: "Visual design and interaction. Brand and product at two studios before Openlab.",
    initials: "AC",
    tone: "#d7c4ae",
    photo: "/images/team/amina.jpg",
  },
  {
    name: "Julian Park",
    role: "Engineering Director",
    bio: "Architecture and delivery. Writes the systems the rest of the product sits on.",
    initials: "JP",
    tone: "#b9c7b4",
    photo: "/images/team/julian.jpg",
  },
  {
    name: "Sofia Rahman",
    role: "Product Lead",
    bio: "Scopes the work and keeps the sequence. Previously product at a clinic-network SaaS.",
    initials: "SR",
    tone: "#c9c1d4",
    photo: "/images/team/sofia.jpg",
  },
  {
    name: "Theo Marsh",
    role: "Technical Director",
    bio: "Stack, integrations, and what the system looks like in year three.",
    initials: "TM",
    tone: "#c5d0d6",
    photo: "/images/team/theo.jpg",
  },
]

export const stats = [
  { value: "40+", label: "Projects shipped" },
  { value: "12 wks", label: "Typical build" },
  { value: "4", label: "People on the work" },
  { value: "2019", label: "Studio opened" },
]

export const clients = [
  { name: "Northline", mark: "mountain" },
  { name: "Kite", mark: "kite" },
  { name: "Atelier", mark: "serif" },
  { name: "Harbor", mark: "anchor" },
  { name: "Solace", mark: "wave" },
  { name: "Civic", mark: "column" },
] as const

export const photos = {
  workspace: "/images/studio/workspace.jpg",
  interior: "/images/studio/interior.jpg",
  city: "/images/studio/la.jpg",
  collab: "/images/studio/collab.jpg",
  desk: "/images/studio/desk.jpg",
  hero: "/images/hero/landscape.jpg",
}

export const testimonials = [
  {
    quote:
      "We launched on time. Conversion went up in the first week, and merchandisers can change the homepage themselves.",
    name: "Elena Voss",
    role: "VP Brand, Northline Outdoor",
    image: "/images/work/northline.jpg",
  },
  {
    quote:
      "Julian was on the first call and still answering tickets at launch. We have not had that from a vendor before.",
    name: "Marcus Hale",
    role: "COO, Kite Health",
    image: "/images/work/kite.jpg",
  },
  {
    quote:
      "Editors can publish a lookbook the same day. The site looks like our work.",
    name: "Inès Moreau",
    role: "Creative Director, Atelier No. 4",
    image: "/images/work/atelier.jpg",
  },
]

export const technologies = [
  {
    name: "React",
    blurb: "Frontends for sites and products.",
  },
  {
    name: "TypeScript",
    blurb: "Shared types across the team.",
  },
  {
    name: "Node",
    blurb: "APIs and background services.",
  },
  {
    name: "PostgreSQL",
    blurb: "Primary database on most builds.",
  },
  {
    name: "React Native",
    blurb: "iOS and Android from one codebase.",
  },
  {
    name: "Supabase",
    blurb: "Auth, data, and realtime when we do not need a custom platform.",
  },
  {
    name: "Shopify",
    blurb: "Storefronts, merchandising, and checkout.",
  },
  {
    name: "AWS",
    blurb: "Hosting, jobs, and file storage.",
  },
  {
    name: "Python",
    blurb: "Scripts, models, and internal tools.",
  },
  {
    name: "Web3",
    blurb: "Wallets and on-chain flows when the product needs them.",
  },
]
