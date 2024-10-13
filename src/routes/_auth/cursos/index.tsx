import { createFileRoute } from '@tanstack/react-router'
import CoverLetters from '@/modules/courses/views/CoverLetter'

export const Route = createFileRoute('/_auth/cursos/')({
  component: () => <CoverLetters />,
})
