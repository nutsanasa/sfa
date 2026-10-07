import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"
import {
  armClip,
  armFade,
  armMedia,
  getScroller,
  gsap,
  playClip,
  playFade,
  playMedia,
  prefersReducedMotion,
} from "@/lib/motion"

function toList(nodes: NodeListOf<HTMLElement> | HTMLElement[]) {
  return Array.from(nodes)
}

function imagesIn(root: HTMLElement) {
  return toList(root.querySelectorAll<HTMLElement>("img"))
}

function clipsIn(root: HTMLElement) {
  return toList(root.querySelectorAll<HTMLElement>("[data-clip-line]"))
}

function copyIn(root: HTMLElement) {
  return toList(root.querySelectorAll<HTMLElement>("[data-copy]"))
}

function armBlock(element: HTMLElement) {
  const clips = clipsIn(element)
  const copy = copyIn(element)
  const images = imagesIn(element)

  clips.forEach(armClip)
  if (copy.length) armFade(copy)
  images.forEach(armMedia)

  if (!clips.length && !copy.length && !images.length) {
    armFade([element])
  }
}

function playBlock(element: HTMLElement, delay = 0) {
  const clips = clipsIn(element)
  const copy = copyIn(element)
  const images = imagesIn(element)

  if (clips.length) playClip(clips, delay)
  if (copy.length) playFade(copy, delay + (clips.length ? 0.12 : 0))
  images.forEach((img, index) => playMedia(img, delay + index * 0.08))

  if (!clips.length && !copy.length && !images.length) {
    playFade([element], delay)
  }
}

function playStagger(element: HTMLElement) {
  const items = toList(element.querySelectorAll<HTMLElement>(":scope > *"))

  items.forEach((item, index) => {
    const step =
      element.dataset.stagger === "letters"
        ? 0.08
        : element.dataset.stagger === "list"
          ? 0.09
          : items.length > 6
            ? 0.04
            : 0.07
    const delay = index * step
    const images = imagesIn(item)
    const clips = clipsIn(item)
    const copy = copyIn(item)
    const text = toList(
      item.querySelectorAll<HTMLElement>("h2, h3, p, footer, [data-copy]")
    )

    if (images.length) {
      images.forEach((img, imageIndex) => playMedia(img, delay + imageIndex * 0.06))
      const rest = text.filter((node) => !images.includes(node))
      if (rest.length) playFade(rest, delay + 0.16)
      return
    }

    if (clips.length) playClip(clips, delay)
    if (copy.length) playFade(copy, delay + 0.08)
    if (!clips.length && !copy.length && text.length) playFade(text, delay)
    if (!images.length && !clips.length && !copy.length && !text.length) {
      playFade([item], delay)
    }
  })
}

function isOwnedMedia(element: HTMLElement) {
  const owner = element.closest("[data-reveal], [data-stagger]")
  return Boolean(owner && owner !== element)
}

export function PageMotion() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    const scroller = getScroller()
    const observed = new Set<HTMLElement>()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const element = entry.target as HTMLElement
          io.unobserve(element)
          observed.delete(element)

          if (element.hasAttribute("data-stagger")) {
            ctx.add(() => playStagger(element))
            continue
          }

          ctx.add(() => playBlock(element))
        }
      },
      {
        root: scroller,
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    )

    const ctx = gsap.context(() => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal], [data-stagger], [data-media]")
        .forEach((element) => {
          if (element.hasAttribute("data-media") && isOwnedMedia(element)) return

          if (element.hasAttribute("data-stagger")) {
            toList(element.querySelectorAll<HTMLElement>(":scope > *")).forEach((item) => {
              imagesIn(item).forEach(armMedia)
              const text = toList(
                item.querySelectorAll<HTMLElement>("h2, h3, p, footer, [data-copy], [data-clip-line]")
              )
              clipsIn(item).forEach(armClip)
              const fadeNodes = text.filter(
                (node) =>
                  !node.hasAttribute("data-clip-line") &&
                  !node.querySelector("[data-clip-line]")
              )
              if (fadeNodes.length) armFade(fadeNodes)
              if (!imagesIn(item).length && !text.length) armFade([item])
            })
          } else {
            armBlock(element)
          }

          io.observe(element)
          observed.add(element)
        })
    })

    return () => {
      io.disconnect()
      observed.clear()
      ctx.revert()
    }
  }, [pathname])

  return null
}
