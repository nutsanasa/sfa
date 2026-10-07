import { useMemo, useState } from "react"
import { Container, SectionHeading } from "@/components/layout/primitives"
import { WorkCard } from "@/components/work/WorkCard"
import { projects, workCategories, type WorkCategory } from "@/content/work"
import { usePageTitle } from "@/hooks/use-page-title"
import { cn } from "@/lib/utils"

export function WorkPage() {
  usePageTitle("Work", "Selected projects from Openlab.")
  const [filter, setFilter] = useState<(typeof workCategories)[number]>("All")

  const visible = useMemo(() => {
    if (filter === "All") return projects
    return projects.filter((project) => project.category === (filter as WorkCategory))
  }, [filter])

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Index"
          title="Selected work"
          description="Six recent projects, with the brief, the stack, and what changed."
        />
        <div className="mt-10 flex flex-wrap gap-2">
          {workCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[12px] tracking-[-0.01em] transition-colors",
                filter === category
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          {visible.length} projects
        </p>
        <div data-stagger className="mt-14 grid gap-14 md:grid-cols-2">
          {visible.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </div>
  )
}
