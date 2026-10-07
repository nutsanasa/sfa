import { useEffect, useRef, type RefObject } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { PageMotion } from "@/components/motion/PageMotion"
import { scrollFrameToHash } from "@/lib/motion"

function ScrollManager({ frameRef }: { frameRef: RefObject<HTMLDivElement | null> }) {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const node = frameRef.current
    if (!node) return

    if (pathname === "/services") {
      if (!hash) node.scrollTo({ top: 0, behavior: "auto" })
      return
    }

    if (!hash) {
      node.scrollTo({ top: 0, behavior: "auto" })
      return
    }

    let frame = 0
    let attempts = 0
    const tryScroll = () => {
      if (scrollFrameToHash(hash, "auto")) return
      if (attempts++ > 24) return
      frame = requestAnimationFrame(tryScroll)
    }

    frame = requestAnimationFrame(tryScroll)

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [pathname, hash, frameRef])

  return null
}

export function RootLayout() {
  const frameRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-canvas h-dvh p-[var(--frame-pad)]">
      <div className="relative h-full overflow-hidden rounded-[26px] bg-background shadow-[0_24px_80px_rgba(40,36,30,0.22)] sm:rounded-[32px] lg:rounded-[36px]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <div
          id="frame-scroll"
          ref={frameRef}
          className="frame-scroll relative h-full overflow-y-auto overflow-x-hidden"
        >
          <ScrollManager frameRef={frameRef} />
          <PageMotion />
          <SiteHeader />
          <main id="main">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
