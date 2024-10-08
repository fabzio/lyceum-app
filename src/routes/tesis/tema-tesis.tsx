import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tesis/tema-tesis')({
  component: () => <div>Hello /tesis/tema-tesis!</div>,
})
