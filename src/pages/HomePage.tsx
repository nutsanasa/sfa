import { CTA } from "@/components/sections/CTA"
import { Hero } from "@/components/sections/Hero"
import { Intro } from "@/components/sections/Intro"
import { Process } from "@/components/sections/Process"
import { SelectedWork } from "@/components/sections/SelectedWork"
import { ServicesPreview } from "@/components/sections/ServicesPreview"
import { Technology } from "@/components/sections/Technology"
import { Testimonials } from "@/components/sections/Testimonials"
import { WhyUs } from "@/components/sections/WhyUs"
import { usePageTitle } from "@/hooks/use-page-title"

export function HomePage() {
  usePageTitle()

  return (
    <>
      <Hero />
      <Intro />
      <SelectedWork />
      <ServicesPreview />
      <WhyUs />
      <Technology />
      <Process />
      <Testimonials />
      <CTA />
    </>
  )
}
