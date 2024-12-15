import { createFileRoute } from '@tanstack/react-router'
import UserRegister from '@frontend/modules/sign-in'

export const Route = createFileRoute('/sign-in')({
  validateSearch: () =>
    ({}) as {
      email: string
      googleId: string
      name: string
      firstSurname: string
    },
  component: () => <UserRegister />,
})
