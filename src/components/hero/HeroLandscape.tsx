import { useLayoutEffect, useRef } from "react"
import { photos } from "@/content/studio"
import { canHover3D, gsap, prefersReducedMotion } from "@/lib/motion"

export function HeroLandscape() {
  const rootRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const image = imageRef.current
    if (!root || !image) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { scale: 1.12 },
        { scale: 1, duration: 2.1, ease: "power2.out" }
      )
    }, root)

    if (!canHover3D()) {
      return () => ctx.revert()
    }

    const xTo = gsap.quickTo(image, "x", { duration: 1.1, ease: "power3.out" })
    const yTo = gsap.quickTo(image, "y", { duration: 1.1, ease: "power3.out" })

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      xTo(px * 14)
      yTo(py * 8)
    }

    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerleave", onLeave)

    return () => {
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerleave", onLeave)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden" aria-hidden>
      <img
        ref={imageRef}
        src={photos.hero}
        alt=""
        className="size-full origin-center object-cover object-[center_45%]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
    </div>
  )
}
