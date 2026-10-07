import { useLayoutEffect, type RefObject } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  canHover3D,
  getScroller,
  gsap,
  prefersReducedMotion,
} from "@/lib/motion"

gsap.registerPlugin(ScrollTrigger)

function list(nodes: NodeListOf<HTMLElement> | HTMLElement[]) {
  return Array.from(nodes)
}

export function useServicesMotion(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const scroller = getScroller()
    const cleanups: Array<() => void> = []
    const hash = window.location.hash.replace(/^#/, "")

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const element = entry.target as HTMLElement
          io.unobserve(element)

          if (element.hasAttribute("data-service")) {
            ctx.add(() => playService(element, scroller, cleanups))
            continue
          }
          if (element.hasAttribute("data-engagements")) {
            ctx.add(() => playEngagements(element, cleanups))
            continue
          }
          if (element.hasAttribute("data-faq-list")) {
            ctx.add(() => playFaqs(element, cleanups))
          }
        }
      },
      {
        root: scroller,
        threshold: 0.14,
        rootMargin: "0px 0px -10% 0px",
      }
    )

    const ctx = gsap.context(() => {
      playIntro(root, scroller, cleanups)
      armServices(root, hash, io, scroller, cleanups)
      armEngagements(root, io)
      armFaqs(root, io, cleanups)
    }, root)

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      io.disconnect()
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [rootRef])
}

function clipsIn(root: HTMLElement) {
  return list(root.querySelectorAll<HTMLElement>("[data-clip-line]"))
}

function armClips(lines: HTMLElement[]) {
  lines.forEach((line) => {
    const parent = line.parentElement
    if (parent) gsap.set(parent, { perspective: 820 })
    gsap.set(line, {
      yPercent: 130,
      rotateX: -68,
      transformOrigin: "50% 100%",
    })
  })
}

function playClips(lines: HTMLElement[], delay = 0, stagger = 0.07) {
  if (!lines.length) return
  return gsap.to(lines, {
    yPercent: 0,
    rotateX: 0,
    duration: 1.05,
    delay,
    stagger,
    ease: "power3.out",
    overwrite: "auto",
    onComplete() {
      gsap.set(lines, { clearProps: "transform" })
    },
  })
}

function playIntro(
  root: HTMLElement,
  scroller: HTMLElement | null,
  cleanups: Array<() => void>
) {
  const intro = root.querySelector<HTMLElement>("[data-services-intro]")
  const figure = root.querySelector<HTMLElement>("[data-services-hero]")
  const shift = root.querySelector<HTMLElement>("[data-services-hero-shift]")
  const img = figure?.querySelector<HTMLElement>("img")
  if (!intro) return

  const lines = clipsIn(intro)
  const copy = intro.querySelector<HTMLElement>("[data-intro-copy]")
  const eyebrow = intro.querySelector<HTMLElement>("[data-copy]")

  armClips(lines)
  if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 10 })
  if (copy) gsap.set(copy, { opacity: 0, y: 18, filter: "blur(8px)" })

  if (figure && img && shift) {
    gsap.set(figure, { clipPath: "inset(100% 0 0 0)" })
    gsap.set(img, { scale: 1.24, transformOrigin: "50% 62%" })
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

  if (eyebrow) {
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0)
  }
  if (lines.length) {
    tl.to(
      lines,
      {
        yPercent: 0,
        rotateX: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        onComplete() {
          gsap.set(lines, { clearProps: "transform" })
        },
      },
      0.08
    )
  }
  if (copy) {
    tl.to(
      copy,
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
      0.28
    )
  }
  if (figure && img) {
    tl.to(
      figure,
      { clipPath: "inset(0% 0 0 0)", duration: 1.35, ease: "power3.inOut" },
      0.22
    )
    tl.to(img, { scale: 1.07, duration: 1.85, ease: "power2.out" }, 0.22)
  }

  if (figure && shift && scroller) {
    gsap.fromTo(
      shift,
      { yPercent: -8 },
      {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: figure,
          scroller,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.85,
        },
      }
    )
  }

  if (figure && img && canHover3D()) {
    const xTo = gsap.quickTo(img, "x", { duration: 1.1, ease: "power3.out" })
    const yTo = gsap.quickTo(img, "y", { duration: 1.1, ease: "power3.out" })
    const rotY = gsap.quickTo(img, "rotationY", { duration: 0.9, ease: "power3.out" })
    const rotX = gsap.quickTo(img, "rotationX", { duration: 0.9, ease: "power3.out" })

    gsap.set(img, { transformPerspective: 1100 })

    const onMove = (event: PointerEvent) => {
      const rect = figure.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      xTo(px * 22)
      yTo(py * 14)
      rotY(px * 4)
      rotX(-py * 3)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
      rotY(0)
      rotX(0)
    }

    figure.addEventListener("pointermove", onMove)
    figure.addEventListener("pointerleave", onLeave)
    cleanups.push(() => {
      figure.removeEventListener("pointermove", onMove)
      figure.removeEventListener("pointerleave", onLeave)
    })
  }
}

function armServices(
  root: HTMLElement,
  hash: string,
  io: IntersectionObserver,
  scroller: HTMLElement | null,
  cleanups: Array<() => void>
) {
  root.querySelectorAll<HTMLElement>("[data-service]").forEach((section) => {
    if (hash && section.id === hash) {
      bindServiceHover(section, cleanups)
      bindNumberParallax(section, scroller)
      return
    }

    const number = section.querySelector<HTMLElement>("[data-service-number]")
    const clips = clipsIn(section)
    const words = list(section.querySelectorAll<HTMLElement>("[data-lede-word]"))
    const copy = list(section.querySelectorAll<HTMLElement>("[data-copy]"))
    const outcomes = list(section.querySelectorAll<HTMLElement>("[data-outcome]"))
    const rules = list(section.querySelectorAll<HTMLElement>("[data-outcome-rule]"))

    armClips(clips)
    if (number) {
      number.textContent = "00"
      gsap.set(number, { opacity: 0.35 })
    }
    if (words.length) gsap.set(words, { opacity: 0, y: 10 })
    if (copy.length) gsap.set(copy, { opacity: 0, y: 16, filter: "blur(7px)" })
    if (outcomes.length) gsap.set(outcomes, { opacity: 0, x: -14 })
    if (rules.length) gsap.set(rules, { scaleY: 0, transformOrigin: "50% 0%" })

    io.observe(section)
  })
}

function playService(
  section: HTMLElement,
  scroller: HTMLElement | null,
  cleanups: Array<() => void>
) {
  const number = section.querySelector<HTMLElement>("[data-service-number]")
  const clips = clipsIn(section)
  const words = list(section.querySelectorAll<HTMLElement>("[data-lede-word]"))
  const copy = list(section.querySelectorAll<HTMLElement>("[data-copy]"))
  const outcomes = list(section.querySelectorAll<HTMLElement>("[data-outcome]"))
  const rules = list(section.querySelectorAll<HTMLElement>("[data-outcome-rule]"))
  const target = Number(number?.dataset.count ?? "0")

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete() {
      bindServiceHover(section, cleanups)
    },
  })

  if (number) {
    const proxy = { n: 0 }
    tl.to(number, { opacity: 1, duration: 0.35, ease: "power2.out" }, 0)
    tl.to(
      proxy,
      {
        n: target,
        duration: 0.85,
        ease: "power2.out",
        onUpdate() {
          number.textContent = String(Math.round(proxy.n)).padStart(2, "0")
        },
      },
      0
    )
  }

  playClips(clips, 0.04, 0.065)

  if (words.length) {
    tl.to(
      words,
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.018, ease: "power2.out" },
      0.22
    )
  }

  if (copy.length) {
    tl.to(
      copy,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      },
      0.32
    )
  }

  if (rules.length) {
    tl.to(
      rules,
      { scaleY: 1, duration: 0.55, stagger: 0.06, ease: "power3.out" },
      0.42
    )
  }

  if (outcomes.length) {
    tl.to(
      outcomes,
      { opacity: 1, x: 0, duration: 0.55, stagger: 0.06, ease: "power2.out" },
      0.42
    )
  }

  bindNumberParallax(section, scroller)
}

function bindNumberParallax(section: HTMLElement, scroller: HTMLElement | null) {
  const column = section.querySelector<HTMLElement>("[data-service-index]")
  if (!column || !scroller) return

  gsap.fromTo(
    column,
    { y: -18 },
    {
      y: 22,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        scroller,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    }
  )
}

function bindServiceHover(section: HTMLElement, cleanups: Array<() => void>) {
  if (!canHover3D() || section.dataset.hoverBound === "true") return
  section.dataset.hoverBound = "true"

  const number = section.querySelector<HTMLElement>("[data-service-number]")
  const title = section.querySelector<HTMLElement>("[data-service-title]")
  const outcomes = list(section.querySelectorAll<HTMLElement>("[data-outcome]"))

  const xTo = number
    ? gsap.quickTo(number, "x", { duration: 0.45, ease: "power3.out" })
    : null
  const yTo = number
    ? gsap.quickTo(number, "y", { duration: 0.45, ease: "power3.out" })
    : null

  const enter = () => {
    if (title) gsap.to(title, { x: 10, duration: 0.5, ease: "power3.out" })
    if (outcomes.length) {
      gsap.to(outcomes, {
        x: 6,
        duration: 0.45,
        stagger: 0.035,
        ease: "power3.out",
        overwrite: "auto",
      })
    }
  }

  const move = (event: PointerEvent) => {
    if (!number || !xTo || !yTo) return
    const rect = number.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    xTo(gsap.utils.clamp(-12, 12, dx * 0.12))
    yTo(gsap.utils.clamp(-10, 10, dy * 0.12))
  }

  const leave = () => {
    xTo?.(0)
    yTo?.(0)
    if (title) gsap.to(title, { x: 0, duration: 0.5, ease: "power3.out" })
    if (outcomes.length) {
      gsap.to(outcomes, {
        x: 0,
        duration: 0.45,
        stagger: 0.02,
        ease: "power3.out",
        overwrite: "auto",
      })
    }
  }

  section.addEventListener("pointerenter", enter)
  section.addEventListener("pointermove", move)
  section.addEventListener("pointerleave", leave)
  cleanups.push(() => {
    section.removeEventListener("pointerenter", enter)
    section.removeEventListener("pointermove", move)
    section.removeEventListener("pointerleave", leave)
    delete section.dataset.hoverBound
  })
}

function armEngagements(root: HTMLElement, io: IntersectionObserver) {
  const grid = root.querySelector<HTMLElement>("[data-engagements]")
  if (!grid) return

  const cards = list(grid.querySelectorAll<HTMLElement>("[data-engagement]"))
  cards.forEach((card) => {
    gsap.set(card, { opacity: 0, y: 24 })
    armClips(clipsIn(card))
    const copy = card.querySelector<HTMLElement>("[data-copy]")
    if (copy) gsap.set(copy, { opacity: 0, y: 12 })
  })

  io.observe(grid)
}

function playEngagements(grid: HTMLElement, cleanups: Array<() => void>) {
  const cards = list(grid.querySelectorAll<HTMLElement>("[data-engagement]"))

  cards.forEach((card, index) => {
    const delay = index * 0.12
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      delay,
      ease: "power3.out",
    })
    playClips(clipsIn(card), delay + 0.12, 0.06)
    const copy = card.querySelector<HTMLElement>("[data-copy]")
    if (copy) {
      gsap.to(copy, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        delay: delay + 0.28,
        ease: "power2.out",
      })
    }
  })

  if (!canHover3D()) return

  cards.forEach((card) => {
    const heading = card.querySelector<HTMLElement>("h3")

    const enter = () => {
      if (heading) gsap.to(heading, { x: 6, duration: 0.4, ease: "power3.out" })
      gsap.to(
        cards.filter((item) => item !== card),
        { opacity: 0.4, duration: 0.4, ease: "power2.out", overwrite: "auto" }
      )
    }

    const leave = () => {
      if (heading) gsap.to(heading, { x: 0, duration: 0.4, ease: "power3.out" })
      gsap.to(cards, { opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" })
    }

    card.addEventListener("pointerenter", enter)
    card.addEventListener("pointerleave", leave)
    cleanups.push(() => {
      card.removeEventListener("pointerenter", enter)
      card.removeEventListener("pointerleave", leave)
    })
  })
}

function armFaqs(
  root: HTMLElement,
  io: IntersectionObserver,
  cleanups: Array<() => void>
) {
  const listRoot = root.querySelector<HTMLElement>("[data-faq-list]")
  if (!listRoot) return

  const items = list(listRoot.querySelectorAll<HTMLElement>("[data-faq-item]"))
  items.forEach((item) => {
    gsap.set(item, { opacity: 0, y: 22 })
    bindFaqOpen(item, cleanups)
  })

  io.observe(listRoot)
}

function playFaqs(listRoot: HTMLElement, cleanups: Array<() => void>) {
  const items = list(listRoot.querySelectorAll<HTMLElement>("[data-faq-item]"))
  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.65,
    stagger: 0.09,
    ease: "power3.out",
    onComplete() {
      gsap.set(items, { clearProps: "transform,opacity" })
    },
  })

  if (!canHover3D()) return

  items.forEach((item) => {
    const trigger = item.querySelector<HTMLElement>("[data-slot='accordion-trigger']")
    if (!trigger) return

    const enter = () => gsap.to(trigger, { x: 6, duration: 0.35, ease: "power3.out" })
    const leave = () => gsap.to(trigger, { x: 0, duration: 0.35, ease: "power3.out" })

    trigger.addEventListener("pointerenter", enter)
    trigger.addEventListener("pointerleave", leave)
    cleanups.push(() => {
      trigger.removeEventListener("pointerenter", enter)
      trigger.removeEventListener("pointerleave", leave)
    })
  })
}

function bindFaqOpen(item: HTMLElement, cleanups: Array<() => void>) {
  const observer = new MutationObserver(() => {
    if (item.getAttribute("data-state") !== "open") return
    const answer = item.querySelector<HTMLElement>("[data-faq-answer]")
    if (!answer) return
    gsap.fromTo(
      answer,
      { opacity: 0, y: 12, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power2.out" }
    )
  })

  observer.observe(item, { attributes: true, attributeFilter: ["data-state"] })
  cleanups.push(() => observer.disconnect())
}
