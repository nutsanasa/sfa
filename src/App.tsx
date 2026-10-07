import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RootLayout } from "@/components/layout/RootLayout"
import { ClientsPage } from "@/pages/ClientsPage"
import { ContactPage } from "@/pages/ContactPage"
import { HomePage } from "@/pages/HomePage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ProcessPage } from "@/pages/ProcessPage"
import { ServicesPage } from "@/pages/ServicesPage"
import { StudioPage } from "@/pages/StudioPage"
import { WorkDetailPage } from "@/pages/WorkDetailPage"
import { WorkPage } from "@/pages/WorkPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="work/:slug" element={<WorkDetailPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="process" element={<ProcessPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="studio" element={<StudioPage />} />
          <Route path="about" element={<StudioPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
