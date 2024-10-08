import { createFileRoute } from '@tanstack/react-router'
import CoverLetters from '@/courses/views/CoverLetterView'

export const Route = createFileRoute('/cursos/')({
  component: () => <CoverLetters/>,
})
