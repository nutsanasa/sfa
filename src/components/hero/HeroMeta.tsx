import { clients, team } from "@/content/studio"

const heroTeam = team.slice(0, 3)

export function TeamAvatars() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        {heroTeam.map((person, index) => (
          <span
            key={person.initials}
            title={`${person.name}, ${person.role}`}
            className="relative size-9 overflow-hidden rounded-full ring-2 ring-background"
            style={{
              marginLeft: index === 0 ? 0 : -8,
              zIndex: heroTeam.length - index,
            }}
          >
            <img
              src={person.photo}
              alt=""
              className="size-full object-cover"
            />
          </span>
        ))}
      </div>
      <span className="hidden h-px w-8 bg-foreground/25 sm:block" />
      <p className="font-mono text-[10px] tracking-[0.18em] text-foreground/55 uppercase">
        Los Angeles
      </p>
    </div>
  )
}

function Mark({ type }: { type: (typeof clients)[number]["mark"] }) {
  const common = {
    viewBox: "0 0 16 16",
    className: "size-3.5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
  }

  if (type === "mountain") {
    return (
      <svg {...common}>
        <path d="M1.5 13 L6 6 L8.5 9.5 L11 5 L14.5 13 Z" />
      </svg>
    )
  }
  if (type === "kite") {
    return (
      <svg {...common}>
        <path d="M8 2 L13 8 L8 14 L3 8 Z" />
      </svg>
    )
  }
  if (type === "serif") {
    return (
      <svg {...common}>
        <path d="M4 13 V4 H12" />
        <path d="M4 8 H10" />
      </svg>
    )
  }
  if (type === "anchor") {
    return (
      <svg {...common}>
        <circle cx="8" cy="4" r="1.6" />
        <path d="M8 5.6 V13 M3 10 C3 13 13 13 13 10" />
      </svg>
    )
  }
  if (type === "wave") {
    return (
      <svg {...common}>
        <path d="M2 10 C4 7 6 7 8 10 C10 13 12 13 14 10" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M4 13 V6 L8 3 L12 6 V13" />
    </svg>
  )
}

export function ClientStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-foreground/80">
      {clients.map((client) => (
        <span key={client.name} className="inline-flex items-center gap-1.5">
          <Mark type={client.mark} />
          <span className="font-medium tracking-[-0.02em]">{client.name}</span>
        </span>
      ))}
    </div>
  )
}
