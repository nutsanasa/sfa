import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { ClipLine, Container, Eyebrow, SectionHeading } from "@/components/layout/primitives"
import { useServicesMotion } from "@/components/motion/useServicesMotion"
import { cancelHashScroll, scrollFrameToHash } from "@/lib/motion"
import { CTA } from "@/components/sections/CTA"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { engagements, faqs, services } from "@/content/services"
import { photos } from "@/content/studio"
import { usePageTitle } from "@/hooks/use-page-title"

function ClipWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index, words) => (
        <span key={`${index}-${word}`}>
          <ClipLine className="inline-block pb-[0.12em]">{word}</ClipLine>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  )
}

function Lede({ text }: { text: string }) {
  return (
    <p className="text-lg leading-relaxed">
      {text.split(" ").map((word, index, words) => (
        <span key={`${index}-${word}`} data-lede-word>
          {word}
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  )
}

export function ServicesPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  usePageTitle(
    "Services",
    "Web, product, mobile, commerce, and ongoing development from Openlab."
  )
  useServicesMotion(rootRef)
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    let frame = 0
    let attempts = 0
    const tryScroll = () => {
      if (scrollFrameToHash(hash, "auto")) return
      if (attempts++ > 24) return
      frame = requestAnimationFrame(tryScroll)
    }

    frame = requestAnimationFrame(tryScroll)
    return () => {
      cancelAnimationFrame(frame)
      cancelHashScroll()
    }
  }, [hash])

  return (
    <div ref={rootRef}>
      <div className="border-b border-border/70 py-16 sm:py-20">
        <Container>
          <div data-services-intro className="max-w-4xl">
            <Eyebrow>Capabilities</Eyebrow>
            <h1 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance sm:text-5xl">
              <ClipWords text="What we offer" />
            </h1>
            <p
              data-intro-copy
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              From a new site to a product we stay on after launch.
            </p>
          </div>
          <figure
            data-services-hero
            className="mt-12 overflow-hidden rounded-[28px]"
          >
            <div data-services-hero-shift>
              <img
                src={photos.workspace}
                alt=""
                width={2100}
                height={900}
                className="aspect-[21/9] w-full object-cover object-[center_70%]"
                decoding="async"
              />
            </div>
          </figure>
        </Container>
      </div>

      <div>
        {services.map((service) => (
          <section
            key={service.slug}
            id={service.slug}
            data-service
            className="scroll-mt-[var(--header-h)] border-b border-border/70 last:border-b-0"
          >
            <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
              <div data-service-index className="lg:col-span-2">
                <ClipLine className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                  <span data-service-number data-count={service.number} className="inline-block">
                    {service.number}
                  </span>
                </ClipLine>
              </div>
              <div data-service-title className="lg:col-span-4">
                <h2 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                  <ClipWords text={service.title} />
                </h2>
              </div>
              <div className="lg:col-span-6">
                <Lede text={service.lede} />
                <p
                  data-copy
                  className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base"
                >
                  {service.body}
                </p>
                <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                  {service.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      data-outcome
                      className="relative pl-3 text-sm text-muted-foreground"
                    >
                      <span
                        data-outcome-rule
                        className="absolute top-0 left-0 h-full w-px bg-foreground/20"
                      />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <section className="border-b border-border/70 py-20">
        <Container>
          <SectionHeading eyebrow="Engagements" title="Sprint, build, or retainer" />
          <div
            data-engagements
            className="mt-12 grid gap-px overflow-hidden rounded-[28px] bg-border/80 md:grid-cols-3"
          >
            {engagements.map((item) => (
              <article key={item.title} data-engagement className="bg-background p-8">
                <ClipLine className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                  {item.duration}
                </ClipLine>
                <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em]">
                  <ClipWords text={item.title} />
                </h3>
                <p data-copy className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title="Common questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion
              type="single"
              collapsible
              data-faq-list
              className="border-t border-border"
            >
              {faqs.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${index}`}
                  data-faq-item
                >
                  <AccordionTrigger className="py-5 text-left text-base no-underline hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <span data-faq-answer className="block">
                      {item.answer}
                    </span>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>
      <CTA />
    </div>
  )
}
