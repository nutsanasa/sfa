import { InquiryForm } from "@/components/contact/InquiryForm"
import { ClipLine, Container, Eyebrow } from "@/components/layout/primitives"
import { site } from "@/config/site"
import { photos } from "@/content/studio"
import { usePageTitle } from "@/hooks/use-page-title"

export function ContactPage() {
  usePageTitle(
    "Contact",
    "Start a project with Openlab. Type, budget, timeline, and a short brief."
  )

  return (
    <div className="py-16 sm:py-20">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-5">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-5 overflow-hidden text-[clamp(2.6rem,5.5vw,4.6rem)] leading-[0.95] font-medium tracking-[-0.05em]">
            <ClipLine>Start a project</ClipLine>
          </h1>
          <p data-copy className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Brief, budget, and timing. We reply within two working days.
          </p>
          <dl className="mt-12 space-y-6 text-sm">
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Email
              </dt>
              <dd className="mt-2">
                <a href={`mailto:${site.email}`} className="hover:opacity-70">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Studio
              </dt>
              <dd className="mt-2 text-muted-foreground">{site.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Availability
              </dt>
              <dd className="mt-2 text-muted-foreground">{site.availability}</dd>
            </div>
          </dl>
          <figure data-media className="mt-12 overflow-hidden rounded-[24px]">
            <img
              src={photos.city}
              alt="Los Angeles"
              className="aspect-[16/10] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
        <div data-reveal className="lg:col-span-6 lg:col-start-7">
          <InquiryForm />
        </div>
      </Container>
    </div>
  )
}
