import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/preguntas-frecuentes/sugerencias')({
  component: () => <div>Hello /preguntas-frecuentes/sugerencias!</div>
})