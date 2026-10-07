import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { services } from "@/content/services"
import { cn } from "@/lib/utils"

export function ServicesMenu({
  active,
  className,
}: {
  active?: boolean
  className?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLAnchorElement>(null)
  const [open, setOpen] = useState(false)
  const [hoverLocked, setHoverLocked] = useState(false)

  const close = (lockHover = false) => {
    setOpen(false)
    setHoverLocked(lockHover)
  }

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      close()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      close()
      triggerRef.current?.focus()
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === "touch" || hoverLocked) return
        setOpen(true)
      }}
      onPointerLeave={() => {
        setOpen(false)
        setHoverLocked(false)
      }}
    >
      <Link
        ref={triggerRef}
        to="/services"
        className={cn(
          "inline-flex items-center gap-1 text-[13px] tracking-[-0.01em] text-foreground/55 transition-colors hover:text-foreground",
          (active || open) && "text-foreground",
          className
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-current={active ? "page" : undefined}
        onClick={() => {
          close(true)
          triggerRef.current?.blur()
        }}
      >
        Services
        <ChevronDown
          className={cn(
            "size-3.5 text-current opacity-45 transition-transform duration-200 ease-out",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </Link>

      <div
        role="menu"
        aria-label="Services"
        className={cn(
          "invisible absolute top-full left-1/2 z-50 w-[32rem] -translate-x-1/2 pt-4 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open && "visible translate-y-0 opacity-100"
        )}
      >
        <div className="rounded-[20px] border border-border/80 bg-background p-1.5 shadow-[0_18px_50px_rgba(40,36,30,0.16)]">
          <div className="grid grid-cols-2 gap-px">
            {services.map((service) => (
              <Link
                key={service.slug}
                role="menuitem"
                to={`/services#${service.slug}`}
                className="flex items-baseline gap-2.5 rounded-[14px] px-3 py-2.5 transition-colors hover:bg-secondary"
                onClick={(event) => {
                  close(true)
                  event.currentTarget.blur()
                  triggerRef.current?.blur()
                }}
              >
                <span className="w-5 shrink-0 font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
                  {service.number}
                </span>
                <span className="text-[13px] font-medium tracking-[-0.02em]">
                  {service.title}
                </span>
              </Link>
            ))}
          </div>
          <div className="mx-2 mt-1 border-t border-border/70 px-1 py-2">
            <Link
              role="menuitem"
              to="/services"
              className="text-[12px] tracking-[-0.01em] text-foreground/50 transition-colors hover:text-foreground"
              onClick={(event) => {
                close(true)
                event.currentTarget.blur()
                triggerRef.current?.blur()
              }}
            >
              All services
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
