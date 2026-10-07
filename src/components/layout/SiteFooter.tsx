import { Link, useLocation } from "react-router-dom"
import { Logo } from "@/components/brand/Logo"
import { site } from "@/config/site"
import { scrollFrameToHash } from "@/lib/motion"

const copyrightYear = new Date().getFullYear()

export function SiteFooter() {
  const { pathname, hash } = useLocation()
  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-12 lg:px-12 lg:py-20">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Design and engineering studio in Los Angeles. Websites, products,
            and custom software.
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            Studio
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="transition-colors hover:text-foreground"
                  onClick={() => {
                    const hashTarget = item.href.includes("#")
                      ? item.href.slice(item.href.indexOf("#"))
                      : null
                    if (hashTarget && pathname === "/" && hash === hashTarget) {
                      scrollFrameToHash(hashTarget)
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" className="transition-colors hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            Elsewhere
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            Contact
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 block text-sm transition-colors hover:text-foreground"
          >
            {site.email}
          </a>
          <p className="mt-2 text-sm text-muted-foreground">{site.location}</p>
          <p className="mt-2 text-sm text-muted-foreground">{site.availability}</p>
        </div>
      </div>

      <div className="px-5 pt-10 pb-6 sm:px-8 lg:px-10">
        <p
          aria-label={site.name}
          data-stagger="letters"
          className="flex w-full items-end justify-between font-medium"
        >
          {site.name.split("").map((letter, index, letters) => (
            <span
              key={`${letter}-${index}`}
              className="-mx-[0.28em] block overflow-hidden px-[0.28em] pt-[0.1em] pb-[0.36em] leading-none"
            >
              <span
                data-clip-line
                className="block text-[clamp(3.2rem,12vw,11rem)] leading-none"
              >
                {letter}
                {index === letters.length - 1 ? (
                  <sup className="ml-[0.02em] align-super text-[0.22em] tracking-tight">
                    ®
                  </sup>
                ) : null}
              </span>
            </span>
          ))}
        </p>
        <div className="mt-8 flex flex-col gap-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {copyrightYear} {site.legalName}
          </p>
          <p>Design and engineering</p>
        </div>
      </div>
    </footer>
  )
}
