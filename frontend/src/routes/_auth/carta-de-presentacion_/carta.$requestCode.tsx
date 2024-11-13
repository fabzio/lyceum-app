import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/carta-de-presentacion/carta/$requestCode'
)({
  component: () => <div>Hello /_auth/carta-de-presentacion/$requestCode!</div>,
})
