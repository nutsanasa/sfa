import { Container } from "@/components/layout/primitives"
import { clients, stats } from "@/content/studio"

export function Proof() {
  return (
    <section className="border-t border-border/70 py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-3xl leading-snug font-medium tracking-[-0.04em] text-balance sm:text-4xl">
              “If it only looks good in a case study, it isn’t done.”
            </p>
            <p className="mt-5 text-sm text-muted-foreground">
              A working principle at Openlab — applied to interfaces, query time,
              and the week after launch.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-3 border-t border-border/70 pt-8 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          {clients.map((client) => (
            <span key={client.name}>{client.name}</span>
          ))}
        </div>
      </Container>
    </section>
  )
}
