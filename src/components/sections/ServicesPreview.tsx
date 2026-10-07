import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import { ClipLine, Container, SectionHeading } from "@/components/layout/primitives"
import { services } from "@/content/services"

export function ServicesPreview() {
  return (
    <section className="border-t border-border/70 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="What we build"
          description="Websites, products, mobile, commerce, and the systems underneath."
        />
        <div data-stagger="list" className="mt-14 divide-y divide-border/80 border-y border-border/80">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services#${service.slug}`}
              className="group grid gap-3 py-6 transition-colors md:grid-cols-12 md:items-center md:gap-6 md:py-7"
            >
              <ClipLine className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase md:col-span-1">
                {service.number}
              </ClipLine>
              <h3 className="text-xl font-medium tracking-[-0.03em] md:col-span-4 md:text-2xl">
                {service.title.split(" ").map((word, index, words) => (
                  <span key={`${service.slug}-${word}-${index}`}>
                    <ClipLine className="inline-block pb-[0.12em]">{word}</ClipLine>
                    {index < words.length - 1 ? " " : null}
                  </span>
                ))}
              </h3>
              <p
                data-copy
                className="text-sm leading-relaxed text-muted-foreground md:col-span-6"
              >
                {service.lede}
              </p>
              <span
                data-copy
                className="hidden size-9 items-center justify-center justify-self-end rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:border-foreground group-hover:text-foreground md:col-span-1 md:flex"
              >
                <Plus className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
