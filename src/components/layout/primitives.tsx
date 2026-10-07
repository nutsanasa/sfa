import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Container({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  )
}

export function Eyebrow({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <p
      data-copy="eyebrow"
      className={cn(
        "font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase",
        className
      )}
    >
      {children}
    </p>
  )
}

export function ClipLine({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span className={cn("block overflow-hidden", className)}>
      <span data-clip-line className="block">
        {children}
      </span>
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  as = "h2",
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  as?: "h1" | "h2"
}) {
  const Heading = as

  return (
    <div className={cn("max-w-3xl", className)} data-reveal>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading
        className={cn(
          "overflow-hidden text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance sm:text-5xl",
          eyebrow && "mt-4"
        )}
      >
        <span data-clip-line className="block">
          {title}
        </span>
      </Heading>
      {description ? (
        <p
          data-copy
          className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
