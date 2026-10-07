import { Container, SectionHeading } from "@/components/layout/primitives"
import { testimonials } from "@/content/studio"

export function Testimonials() {
  return (
    <section id="testimonial" className="scroll-mt-[var(--header-h)] border-t border-border/70 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Clients"
          title="What they said"
        />
        <div data-stagger className="mt-14 grid gap-6 lg:grid-cols-3">
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
  )
}
