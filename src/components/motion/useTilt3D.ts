import { useEffect, useRef, type RefObject } from "react"
import { canHover3D, gsap } from "@/lib/motion"

type TiltOptions = {
  max?: number
  lift?: number
}

export function useTilt3D<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { max = 9, lift = 18 }: TiltOptions = {}
) {
  const options = useRef({ max, lift })
  options.current = { max, lift }

  useEffect(() => {
    const node = ref.current
    if (!node || !canHover3D()) return

    gsap.set(node, {
      transformPerspective: 900,
      transformStyle: "preserve-3d",
    })

    const rotateX = gsap.quickTo(node, "rotationX", {
      duration: 0.5,
      ease: "power3.out",
    })
    const rotateY = gsap.quickTo(node, "rotationY", {
      duration: 0.5,
      ease: "power3.out",
    })
    const z = gsap.quickTo(node, "z", { duration: 0.5, ease: "power3.out" })

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      rotateY(px * options.current.max * 2)
      rotateX(-py * options.current.max * 2)
      z(options.current.lift)
    }

    const onLeave = () => {
      rotateX(0)
      rotateY(0)
      z(0)
    }

    node.addEventListener("pointermove", onMove)
    node.addEventListener("pointerleave", onLeave)

    return () => {
      node.removeEventListener("pointermove", onMove)
      node.removeEventListener("pointerleave", onLeave)
      gsap.set(node, { clearProps: "transform" })
    }
  }, [ref])
}
