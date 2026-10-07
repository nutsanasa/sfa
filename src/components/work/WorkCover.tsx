import { cn } from "@/lib/utils"

export function WorkCover({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div data-media className={cn("relative overflow-hidden bg-secondary", className)}>
      <img
        src={src}
        alt={alt}
        className="size-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
