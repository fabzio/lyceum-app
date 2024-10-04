import PageLayout from '@/layouts/PageLayout'
import { Outlet } from '@tanstack/react-router'

export default function FAQ() {
  return (
    <PageLayout name="Preguntas Frecuentes">
      
      <Outlet />
    </PageLayout>
  )
}
