import { Link } from "react-router-dom"
import { Container, Eyebrow } from "@/components/layout/primitives"
import { usePageTitle } from "@/hooks/use-page-title"

export function NotFoundPage() {
  usePageTitle("Not found")

  return (
    <Container className="flex min-h-[70svh] flex-col justify-center py-20">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-5 text-5xl font-medium tracking-[-0.05em] sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-5 max-w-md text-muted-foreground">
        This route does not exist. Go home or look through the work.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          to="/"
          className="inline-flex h-11 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background"
        >
          Home
        </Link>
        <Link
          to="/work"
          className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-medium"
        >
          Work
        </Link>
      </div>
    </Container>
  )
}
