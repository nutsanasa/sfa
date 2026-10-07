import { useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { useTilt3D } from "@/components/motion/useTilt3D"
import type { WorkProject } from "@/content/work"

export function FeaturedProjectCard({ project }: { project: WorkProject }) {
  const tiltRef = useRef<HTMLAnchorElement>(null)
  useTilt3D(tiltRef, { max: 4, lift: 8 })

  return (
    <Link
      ref={tiltRef}
      to={`/work/${project.slug}`}
      className="group block w-[min(100%,280px)] rounded-[22px] bg-background/95 p-2 shadow-[0_18px_50px_rgba(30,28,24,0.16)] ring-1 ring-black/5 backdrop-blur-md"
    >
      <div className="overflow-hidden rounded-[16px]">
        <img
          src={project.image}
          alt=""
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-3">
        <div>
          <p className="text-sm font-medium tracking-[-0.02em]">
            {project.title}
            <sup className="ml-0.5 text-[9px]">®</sup>
          </p>
          <p className="mt-0.5 text-[11px] tracking-[-0.01em] text-muted-foreground">
            {project.industry} · {project.year}°
          </p>
        </div>
        <span className="flex size-8 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors group-hover:border-foreground group-hover:text-foreground">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}
