import { Container, SectionHeading } from "@/components/layout/primitives"
import { CTA } from "@/components/sections/CTA"
import { clients, photos, testimonials } from "@/content/studio"
import { usePageTitle } from "@/hooks/use-page-title"

export function ClientsPage() {
  usePageTitle(
    "Clients",
    "What recent clients said about working with Openlab."
  )

  return (
    <>
      <section className="border-b border-border/70 py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            className="max-w-4xl"
            eyebrow="Clients"
            title="What they said"
            description="Recent work for outdoor retail, healthtech, fashion, logistics, and public sector."
          />
          <figure data-media className="mt-12 overflow-hidden rounded-[28px]">
            <img
              src={photos.collab}
              alt="A working session with a client team"
              className="aspect-[21/9] w-full object-cover object-[center_40%]"
              decoding="async"
            />
          </figure>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            {clients.map((client) => (
              <li key={client.name}>{client.name}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div data-stagger className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote
                key={item.name}
                className="flex h-full flex-col overflow-hidden rounded-[28px] bg-secondary"
              >
                <img
                  src={item.image}
                  alt=""
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-lg leading-relaxed tracking-[-0.02em] text-balance">
                    “{item.quote}”
                  </p>
                  <footer className="mt-8 pt-2">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
                  </footer>
                </div>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  )
}
