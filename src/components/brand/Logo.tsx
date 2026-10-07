import { Link } from "react-router-dom"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("inline-flex items-center", className)}
      aria-label={`${site.name} home`}
    >
      <img
        src="/images/brand/openlab-logo.png"
        alt=""
        className="h-7 w-auto sm:h-8"
      />
    </Link>
  )
}
