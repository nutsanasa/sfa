import { capabilities } from "@/content/studio"

export function Marquee() {
  const items = [...capabilities, ...capabilities]

  return (
    <section className="overflow-hidden border-b border-border py-5" aria-hidden>
      <div className="flex w-max animate-marquee">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase"
          >
            <span>{item}</span>
            <span className="mx-5 text-primary">●</span>
          </span>
        ))}
      </div>
    </section>
  )
}
