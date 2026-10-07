import { Container, SectionHeading } from "@/components/layout/primitives"
import { CTA } from "@/components/sections/CTA"
import { photos, processSteps } from "@/content/studio"
import { usePageTitle } from "@/hooks/use-page-title"

export function ProcessPage() {
  usePageTitle(
    "Process",
    "How Openlab runs a project: discover, frame, design, build, and launch."
  )

  return (
    <>
      <section className="border-b border-border/70 py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            className="max-w-4xl"
            eyebrow="How we work"
            title="How a project usually runs"
            description="Kickoff, a written plan, design and engineering together, then launch support."
          />
          <figure data-media className="mt-12 overflow-hidden rounded-[28px]">
            <img
              src={photos.desk}
              alt="Laptop and notes during a build"
              className="aspect-[21/9] w-full object-cover object-[center_40%]"
              decoding="async"
            />
          </figure>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div
            data-stagger="flat"
            className="grid gap-px overflow-hidden rounded-[28px] bg-border/80 sm:grid-cols-2 lg:grid-cols-5"
          >
            {processSteps.map((step) => (
              <article key={step.number} className="bg-background p-6 sm:p-7">
                <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                  {step.number}
                </p>
                <h2 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{step.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  )
}
