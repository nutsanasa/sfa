import { Container, SectionHeading } from "@/components/layout/primitives"
import { photos, processSteps } from "@/content/studio"

export function Process() {
  return (
    <section id="process" className="scroll-mt-[var(--header-h)] border-t border-border/70 py-24 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-6"
            eyebrow="How we work"
            title="How a project usually runs"
            description="Kickoff, a written plan, design and engineering together, then launch support."
          />
          <figure data-media className="overflow-hidden rounded-[24px] lg:col-span-6">
            <img
              src={photos.desk}
              alt="Laptop and notes during a build"
              className="aspect-[16/10] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
        <div data-stagger="flat" className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-border/80 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step) => (
            <article key={step.number} className="bg-background p-6 sm:p-7">
              <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                {step.number}
              </p>
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
