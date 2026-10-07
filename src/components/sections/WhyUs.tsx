import { Container, SectionHeading } from "@/components/layout/primitives"
import { photos, values } from "@/content/studio"

export function WhyUs() {
  return (
    <section className="border-t border-border/70 py-24 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-6"
            eyebrow="Why Openlab"
            title="Who does the work"
            description="We take fewer projects so the same people can stay on them."
          />
          <figure data-media className="overflow-hidden rounded-[24px] lg:col-span-6">
            <img
              src={photos.collab}
              alt="The team in a working session"
              className="aspect-[16/10] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
        <div data-stagger="flat" className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-border/80 sm:grid-cols-2">
          {values.map((value, index) => (
            <article key={value.title} className="bg-background p-8 sm:p-10">
              <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                0{index + 1}
              </p>
              <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em]">
                {value.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
