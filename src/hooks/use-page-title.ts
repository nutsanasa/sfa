import { useEffect } from "react"
import { site } from "@/config/site"

export function usePageTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : site.title

    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) {
      meta.setAttribute("content", description)
    }

    return () => {
      document.title = site.title
      if (meta) {
        meta.setAttribute("content", site.description)
      }
    }
  }, [title, description])
}
