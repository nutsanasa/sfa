import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronDown, Menu } from "lucide-react"
import { Logo } from "@/components/brand/Logo"
import { ServicesMenu } from "@/components/layout/ServicesMenu"
import { Button } from "@/components/ui/button"
import { services } from "@/content/services"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { site } from "@/config/site"
import { scrollFrameToHash } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { pathname, hash } = useLocation()

  return (
    <header className="sticky top-0 z-40 h-[var(--header-h)] bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
          aria-label="Primary"
        >
          {site.nav.map((item, index) => {
            const hashTarget = item.href.includes("#")
              ? item.href.slice(item.href.indexOf("#"))
              : null
            const active = hashTarget
              ? pathname === "/" && hash === hashTarget
              : pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <span key={item.href} className="flex items-center">
                {index > 0 ? (
                  <span className="px-3 text-[11px] text-foreground/30 lg:px-4" aria-hidden>
                    +
                  </span>
                ) : null}
                {item.href === "/services" ? (
                  <ServicesMenu active={active} />
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => {
                      if (hashTarget && pathname === "/" && hash === hashTarget) {
                        scrollFrameToHash(hashTarget)
                      }
                    }}
                    className={cn(
                      "text-[13px] tracking-[-0.01em] text-foreground/55 transition-colors hover:text-foreground",
                      active && "text-foreground"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </span>
            )
          })}
        </nav>

        <Sheet
          open={open}
          onOpenChange={(next) => {
            setOpen(next)
            if (!next) setServicesOpen(false)
          }}
        >
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-10 rounded-full text-foreground hover:bg-foreground/5"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-md overflow-y-auto border-l-border bg-background sm:max-w-md"
          >
            <SheetHeader>
              <SheetTitle className="text-left text-2xl font-medium tracking-[-0.04em]">
                {site.name}
                <sup className="ml-0.5 text-xs">®</sup>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1 px-4" aria-label="Menu">
              {site.nav.map((item) => (
                <div key={item.href}>
                  {item.href === "/services" ? (
                    <div className="flex items-center">
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="block min-w-0 flex-1 py-2.5 text-3xl font-medium tracking-[-0.04em] text-foreground/70 transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls="mobile-services-list"
                        aria-label={servicesOpen ? "Hide services" : "Show services"}
                        onClick={() => setServicesOpen((visible) => !visible)}
                        className="-mr-1 flex size-10 shrink-0 items-center justify-center text-foreground/55"
                      >
                        <ChevronDown
                          className={cn(
                            "size-5 opacity-45 transition-transform duration-200 ease-out",
                            servicesOpen && "rotate-180"
                          )}
                          aria-hidden
                        />
                      </button>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => {
                        setOpen(false)
                        const hashTarget = item.href.includes("#")
                          ? item.href.slice(item.href.indexOf("#"))
                          : null
                        if (hashTarget && pathname === "/" && hash === hashTarget) {
                          scrollFrameToHash(hashTarget)
                        }
                      }}
                      className="block py-2.5 text-3xl font-medium tracking-[-0.04em] text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.href === "/services" ? (
                    <div
                      id="mobile-services-list"
                      className={cn(
                        "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
                        servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <ul className="min-h-0 border-l border-foreground/15 pl-3">
                        {services.map((service) => (
                          <li key={service.slug} className="min-w-0">
                            <Link
                              to={`/services#${service.slug}`}
                              onClick={() => setOpen(false)}
                              className="flex min-h-10 items-center py-2 text-[15px] leading-[1.4] text-foreground/65 transition-colors hover:text-foreground"
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="py-2.5 text-3xl font-medium tracking-[-0.04em]"
              >
                Start a project
              </Link>
            </nav>
            <p className="mt-auto px-4 pb-8 text-sm text-muted-foreground">
              {site.location}
              <br />
              <a href={`mailto:${site.email}`} className="text-foreground">
                {site.email}
              </a>
            </p>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
