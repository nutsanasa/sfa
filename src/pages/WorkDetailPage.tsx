import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Container, ClipLine, Eyebrow } from "@/components/layout/primitives"
import { WorkCover } from "@/components/work/WorkCover"
import { getNextProject, getProject } from "@/content/work"
import { usePageTitle } from "@/hooks/use-page-title"

export function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  usePageTitle(
    project?.title,
    project?.summary ?? "Selected work from Openlab."
  )

  if (!project) {
    return <Navigate to="/work" replace />
  }

  const next = getNextProject(project.slug)

  return (
    <article className="pb-24">
      <Container className="py-10" data-reveal>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All work
        </Link>
        <Eyebrow className="mt-10">
          {project.client} / {project.industry} / {project.year}
        </Eyebrow>
        <h1 className="mt-4 max-w-4xl overflow-hidden text-[clamp(3rem,7vw,5.8rem)] leading-[0.92] font-medium tracking-[-0.05em] text-balance">
          <ClipLine>{project.title}</ClipLine>
        </h1>
        <p data-copy className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </Container>

      <div className="px-5 sm:px-8 lg:px-12">
        <WorkCover
          src={project.image}
          alt={`${project.title} — ${project.industry}`}
          className="aspect-[16/8] w-full overflow-hidden rounded-[28px]"
        />
      </div>

      <Container className="grid gap-16 py-16 lg:grid-cols-12">
        <div className="grid gap-12 lg:col-span-7">
          <Block title="Challenge" body={project.challenge} />
          <Block title="Approach" body={project.approach} />
          <Block title="Outcome" body={project.outcome} />
        </div>
        <aside className="space-y-10 lg:col-span-5">
          <div className="grid grid-cols-3 gap-4 rounded-[24px] bg-secondary p-6">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-2xl font-medium tracking-[-0.03em]">{metric.value}</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
          <Meta label="Services" items={project.services} />
          <Meta label="Stack" items={project.stack} />
        </aside>
      </Container>

      <Container>
        <Link
          to={`/work/${next.slug}`}
          className="group flex items-end justify-between gap-6 border-t border-border pt-10"
        >
          <div>
            <Eyebrow>Next project</Eyebrow>
            <p className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
              {next.title}
            </p>
          </div>
          <ArrowUpRight className="mb-2 size-6 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </Link>
      </Container>
    </article>
  )
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <section data-reveal>
      <h2 className="overflow-hidden text-2xl font-medium tracking-[-0.03em]">
        <span data-clip-line className="block">
          {title}
        </span>
      </h2>
      <p data-copy className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {body}
      </p>
    </section>
  )
}

function Meta({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        {label}
      </p>
      <ul className="mt-3 space-y-1 text-sm">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
