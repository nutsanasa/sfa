import { ClipLine, Container, Eyebrow, SectionHeading } from "@/components/layout/primitives"
import { CTA } from "@/components/sections/CTA"
import { manifesto, photos, team, values } from "@/content/studio"
import { usePageTitle } from "@/hooks/use-page-title"

export function StudioPage() {
  usePageTitle(
    "About",
    "Openlab is a four-person design and engineering studio in Los Angeles."
  )

  return (
    <>
      <section className="border-b border-border/70 py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-5">
            <Eyebrow>{manifesto.eyebrow}</Eyebrow>
            <h1 className="mt-5 overflow-hidden text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] font-medium tracking-[-0.05em] text-balance">
              <ClipLine>{manifesto.title}</ClipLine>
            </h1>
          </div>
          <p
            data-reveal
            data-copy
            className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7 lg:pt-16"
          >
            {manifesto.body}
          </p>
        </Container>
        <div className="mt-14 px-5 sm:px-8 lg:px-12">
          <figure data-media className="overflow-hidden rounded-[28px]">
            <img
              src={photos.workspace}
              alt="Openlab studio workspace"
              className="aspect-[21/9] w-full object-cover object-[center_70%]"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <section className="border-b border-border/70 py-20">
        <Container>
          <SectionHeading
            eyebrow="Approach"
            title="How we work with clients"
          />
          <div data-stagger="flat" className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-border/80 sm:grid-cols-2">
            {values.map((value) => (
              <article key={value.title} className="bg-background p-8">
                <h3 className="text-2xl font-medium tracking-[-0.03em]">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border/70 py-20">
        <Container>
          <SectionHeading
            eyebrow="People"
            title="The team"
            description="Design, product, and engineering."
          />
          <div data-stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <article key={person.name}>
                <div className="overflow-hidden rounded-[24px]">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-[-0.02em]">{person.name}</h3>
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                  {person.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {person.bio}
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
