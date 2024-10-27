import LoginPage from '@/views/Login'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context: { auth } }) => {
    if (auth.isAuth) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: () => <LoginPage />,
})
