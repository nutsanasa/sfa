import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.config({ nullTargetWarn: false })
gsap.registerPlugin(ScrollTrigger)

export const SCROLLER_ID = "frame-scroll"

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function canHover3D() {
  return (
    window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion()
  )
}

export function getScroller() {
  return document.getElementById(SCROLLER_ID)
}

export function armClip(line: HTMLElement) {
  gsap.set(line, { yPercent: 110 })
}

export function playClip(lines: ArrayLike<HTMLElement>, delay = 0) {
  return gsap.to(lines, {
    yPercent: 0,
    duration: 0.95,
    delay,
    stagger: 0.06,
    ease: "power3.out",
    overwrite: "auto",
    onComplete() {
      gsap.set(lines, { clearProps: "transform" })
    },
  })
}

export function armMedia(img: HTMLElement) {
  gsap.set(img, { scale: 1.1, yPercent: 5, transformOrigin: "50% 62%" })
}

export function playMedia(img: HTMLElement, delay = 0) {
  return gsap.to(img, {
    scale: 1,
    yPercent: 0,
    duration: 1.45,
    delay,
    ease: "power2.out",
    overwrite: "auto",
    onComplete() {
      gsap.set(img, { clearProps: "transform" })
    },
  })
}

export function armFade(nodes: ArrayLike<HTMLElement>) {
  gsap.set(nodes, { opacity: 0 })
}

export function playFade(nodes: ArrayLike<HTMLElement>, delay = 0) {
  return gsap.to(nodes, {
    opacity: 1,
    duration: 0.7,
    delay,
    stagger: 0.04,
    ease: "power2.out",
    overwrite: "auto",
    onComplete() {
      gsap.set(nodes, { clearProps: "opacity" })
    },
  })
}

let hashScrollGeneration = 0
const HASH_SETTLE_MS = [300, 700, 1200] as const

export function cancelHashScroll() {
  hashScrollGeneration += 1
}

function headerOffset() {
  const headerEl = document.querySelector("header")
  return headerEl instanceof HTMLElement ? headerEl.getBoundingClientRect().height : 70
}

function alignFrameToTarget(
  node: HTMLElement,
  target: HTMLElement,
  behavior: ScrollBehavior
) {
  const top = Math.max(
    0,
    node.scrollTop +
      target.getBoundingClientRect().top -
      node.getBoundingClientRect().top -
      headerOffset()
  )
  const moved = Math.abs(node.scrollTop - top) > 2
  if (moved) {
    node.scrollTo({
      top,
      behavior: prefersReducedMotion() ? "auto" : behavior,
    })
  }
  return !moved
}

export function scrollFrameToHash(hash: string, behavior: ScrollBehavior = "auto") {
  const node = getScroller()
  const id = hash.replace(/^#/, "")
  const target = id ? document.getElementById(id) : null
  if (!node || !target) return false

  const generation = ++hashScrollGeneration
  let userScrolled = false
  const timers: number[] = []

  const onUserScroll = () => {
    userScrolled = true
  }

  const onUserKey = (event: KeyboardEvent) => {
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === "PageDown" ||
      event.key === "PageUp" ||
      event.key === "Home" ||
      event.key === "End" ||
      event.key === " "
    ) {
      userScrolled = true
    }
  }

  const done = () => {
    node.removeEventListener("wheel", onUserScroll)
    node.removeEventListener("touchmove", onUserScroll)
    window.removeEventListener("keydown", onUserKey)
    ScrollTrigger.removeEventListener("refresh", onRefresh)
    timers.forEach((timer) => window.clearTimeout(timer))
  }

  const stillActive = () => generation === hashScrollGeneration && !userScrolled

  const settle = () => {
    if (!stillActive()) {
      done()
      return true
    }
    return alignFrameToTarget(node, target, "auto")
  }

  const onRefresh = () => {
    settle()
  }

  node.addEventListener("wheel", onUserScroll, { passive: true })
  node.addEventListener("touchmove", onUserScroll, { passive: true })
  window.addEventListener("keydown", onUserKey)
  ScrollTrigger.addEventListener("refresh", onRefresh)

  const start = () => {
    if (!stillActive()) {
      done()
      return
    }
    alignFrameToTarget(node, target, behavior)

    let last = 0
    for (const wait of HASH_SETTLE_MS) {
      timers.push(window.setTimeout(() => settle(), wait))
      last = wait
    }
    timers.push(window.setTimeout(done, last + 50))
  }

  const fonts = document.fonts?.ready
  if (fonts) {
    void fonts.then(start).catch(start)
  } else {
    start()
  }

  return true
}

export { gsap }
