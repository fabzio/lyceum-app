import Layout from '@/layouts'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: () => <MainLayout />,
})

function MainLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
