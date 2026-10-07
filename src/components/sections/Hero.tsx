import { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ClientStrip, TeamAvatars } from "@/components/hero/HeroMeta"
import { FeaturedProjectCard } from "@/components/hero/FeaturedProjectCard"
import { HeroLandscape } from "@/components/hero/HeroLandscape"
import { site } from "@/config/site"
import { getFeaturedWork } from "@/content/work"
import { gsap, prefersReducedMotion } from "@/lib/motion"

export function Hero() {
  const featured = getFeaturedWork()[0]
  const rootRef = useRef<HTMLElement>(null)
  const wordRef = useRef<HTMLHeadingElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const lines = wordRef.current?.querySelectorAll<HTMLElement>("[data-clip-line]")
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } })

      if (lines?.length) {
        intro.fromTo(
          lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.05, stagger: 0.1, ease: "power3.out" },
          0
        )
      }
      if (copyRef.current) {
        intro.fromTo(
          copyRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.7, ease: "power2.out" },
          0.18
        )
      }
      if (trustRef.current) {
        intro.fromTo(
          trustRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.65, ease: "power2.out" },
          0.42
        )
      }
      if (cardRef.current) {
        const photo = cardRef.current.querySelector("img")
        intro.fromTo(
          cardRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          0.28
        )
        if (photo) {
          intro.fromTo(
            photo,
            { scale: 1.08 },
            { scale: 1, duration: 1.2, ease: "power2.out" },
            0.28
          )
        }
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="hero-fold relative flex flex-col overflow-x-clip">
      <div className="relative z-10 grid gap-8 px-5 pt-2 pb-4 sm:px-8 md:grid-cols-12 md:items-start md:gap-x-5 md:px-24 lg:px-32 md:pt-3">
        <div className="md:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            {site.name}
          </p>
          <h1
            ref={wordRef}
            className="mt-4 max-w-[14ch] text-[clamp(2.8rem,6.4vw,5.4rem)] font-medium tracking-[-0.05em]"
          >
            <span className="-mx-[0.1em] block overflow-hidden px-[0.1em] pt-[0.1em] pb-[0.3em] leading-none">
              <span data-clip-line className="block leading-none">
                We design
              </span>
            </span>
            <span className="-mx-[0.1em] -mt-[0.08em] block overflow-hidden px-[0.1em] pt-[0.12em] pb-[0.12em] leading-none">
              <span data-clip-line className="block leading-none">
                and build.
              </span>
            </span>
          </h1>
        </div>

        <div
          ref={copyRef}
          className="max-w-sm md:col-span-5 md:justify-self-end md:pt-14"
        >
          <TeamAvatars />
          <p className="mt-5 text-[15px] leading-relaxed text-foreground/70">
            Websites, products, and software. Four people, one project, from
            first sketch through launch.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              to="/contact"
              className="inline-flex h-10 items-center rounded-full bg-foreground px-4 text-[13px] font-medium text-background transition-opacity hover:opacity-80"
            >
              Start a project
            </Link>
            <Link
              to="/work"
              className="inline-flex h-10 items-center rounded-full border border-foreground/15 px-4 text-[13px] font-medium transition-colors hover:border-foreground/40"
            >
              View our work
            </Link>
          </div>
        </div>
      </div>

      <div className="relative min-h-[42vh] flex-1 overflow-hidden sm:min-h-[48vh]">
        <HeroLandscape />
        <div className="grain rounded-none" />

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end gap-5 p-5 pb-7 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
          <div ref={trustRef} className="max-w-md">
            <p className="text-[13px] leading-relaxed text-foreground/80">
              Recent work for outdoor retail, healthtech, fashion, logistics,
              and public sector.
            </p>
            <div className="mt-4">
              <ClientStrip />
            </div>
          </div>
          {featured ? (
            <div ref={cardRef}>
              <FeaturedProjectCard project={featured} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
