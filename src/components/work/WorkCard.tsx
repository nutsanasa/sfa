import { useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import type { WorkProject } from "@/content/work"
import { WorkCover } from "@/components/work/WorkCover"
import { useTilt3D } from "@/components/motion/useTilt3D"
import { cn } from "@/lib/utils"

export function WorkCard({
  project,
  featured = false,
}: {
  project: WorkProject
  featured?: boolean
}) {
  const tiltRef = useRef<HTMLAnchorElement>(null)
  useTilt3D(tiltRef, { max: featured ? 3 : 5, lift: 8 })

  return (
    <Link
      ref={tiltRef}
      to={`/work/${project.slug}`}
      className={cn("group block will-change-transform", featured && "md:col-span-2")}
    >
      <div className="overflow-hidden rounded-[24px]">
        <WorkCover
          src={project.image}
          alt={`${project.title} — ${project.industry}`}
          className={cn(
            "aspect-[16/11] transition-transform duration-700 group-hover:scale-[1.03]",
            featured && "md:aspect-[21/9]"
          )}
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            <span>{project.client}</span>
            <span className="text-foreground/20">/</span>
            <span>{project.industry}</span>
            <span className="text-foreground/20">/</span>
            <span>{project.year}</span>
          </div>
          <h3 className="mt-2 text-2xl font-medium tracking-[-0.035em] sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.summary}
          </p>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </div>
    </Link>
  )
}
