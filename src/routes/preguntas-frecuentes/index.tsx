import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/preguntas-frecuentes/')({
  component: () => <div>Hello /preguntas-frecuentes/!</div>
})