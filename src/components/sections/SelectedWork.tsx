import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { Container, SectionHeading } from "@/components/layout/primitives"
import { WorkCard } from "@/components/work/WorkCard"
import { getFeaturedWork } from "@/content/work"

export function SelectedWork() {
  const featured = getFeaturedWork()

  return (
    <section className="border-t border-border/70 py-24 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Recent projects"
          />
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-[-0.02em]"
          >
            All projects
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div data-stagger className="mt-16 grid gap-12 md:grid-cols-2">
          {featured.map((project, index) => (
            <WorkCard
              key={project.slug}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
