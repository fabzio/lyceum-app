import Layout from '@/layouts'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context: { auth } }) => {
    if (!auth.isAuth) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: () => <MainLayout />,
})

function MainLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
