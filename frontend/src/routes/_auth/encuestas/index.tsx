import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/encuestas/')({
  component: () => <div>Hello /_auth/encuestas/!</div>,
})
