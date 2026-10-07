import { useState } from "react"
import { Container, SectionHeading } from "@/components/layout/primitives"
import { technologies } from "@/content/studio"
import { cn } from "@/lib/utils"

export function Technology() {
  const [active, setActive] = useState(0)
  const current = technologies[active]

  return (
    <section className="border-t border-border/70 py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Capabilities"
              title="Tools we use"
              description="Hover a name for how it shows up in a project."
            />
            <div data-reveal className="mt-10 min-h-28 rounded-[24px] bg-secondary p-6 sm:p-8">
              <p className="text-sm font-medium tracking-[-0.02em]">{current.name}</p>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {current.blurb}
              </p>
            </div>
          </div>
          <div data-stagger className="flex flex-wrap content-start gap-2 lg:col-span-7 lg:pt-16">
            {technologies.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm tracking-[-0.02em] transition-colors",
                  active === index
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
