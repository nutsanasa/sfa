import { Container, ClipLine } from "@/components/layout/primitives"
import { photos, stats } from "@/content/studio"

export function Intro() {
  return (
    <section className="border-t border-border/70 py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <p
            data-reveal
            className="text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08] font-medium tracking-[-0.045em] text-balance lg:col-span-7"
          >
            <ClipLine>
              Websites, products, and software — designed and built by the same
              team.
            </ClipLine>
          </p>
          <div data-reveal className="lg:col-span-5 lg:pt-2">
            <p data-copy className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Openlab is a small studio in Los Angeles. We take a project from
              concept through launch: interface, architecture, and the code in
              production.
            </p>
            <p data-copy className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              You work with the people who build it.
            </p>
          </div>
        </div>

        <div
          data-stagger="flat"
          className="mt-16 grid gap-3 sm:grid-cols-12 sm:gap-4"
        >
          <figure data-media className="overflow-hidden rounded-[24px] sm:col-span-7 sm:row-span-2">
            <img
              src={photos.workspace}
              alt="Studio workspace"
              className="aspect-[4/3] size-full object-cover object-[center_70%] sm:aspect-auto sm:min-h-[420px]"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure data-media className="overflow-hidden rounded-[24px] sm:col-span-5">
            <img
              src={photos.city}
              alt="Los Angeles at dusk"
              className="aspect-[16/10] size-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure data-media className="overflow-hidden rounded-[24px] sm:col-span-5">
            <img
              src={photos.interior}
              alt="Studio interior"
              className="aspect-[16/10] size-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        <div data-stagger className="mt-16 grid grid-cols-2 gap-8 border-t border-border/70 pt-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
