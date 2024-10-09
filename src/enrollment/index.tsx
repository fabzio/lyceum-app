import PageLayout from "@/layouts/PageLayout";
import { Outlet } from '@tanstack/react-router'

export default function Enrollments() {
  return (
    <PageLayout name="Modificación de matrícula">
      <Outlet />
    </PageLayout>
  )
}