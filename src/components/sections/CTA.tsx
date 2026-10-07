import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { Container, Eyebrow } from "@/components/layout/primitives"
import { site } from "@/config/site"
import { photos } from "@/content/studio"

export function CTA() {
  return (
    <section className="border-t border-border/70 py-24 sm:py-28">
      <Container>
        <div
          data-reveal
          className="grid overflow-hidden rounded-[32px] bg-secondary lg:grid-cols-2"
        >
          <img
            src={photos.interior}
            alt=""
            className="aspect-[16/11] w-full object-cover lg:aspect-auto lg:min-h-[420px]"
            loading="lazy"
            decoding="async"
          />
          <div className="flex flex-col justify-center px-6 py-12 sm:px-12 sm:py-16">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mt-5 max-w-xl overflow-hidden text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.02] font-medium tracking-[-0.045em] text-balance">
              <span data-clip-line className="block">
                Have a project?
              </span>
            </h2>
            <p data-copy className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Email a brief or use the form. We reply within two working days,
              including when it is not a fit.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Start a project
                <ArrowUpRight className="size-4" />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
