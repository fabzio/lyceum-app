import { createFileRoute } from '@tanstack/react-router'
import CoverLetters from '@/modules/student-process/views/CoverLetter'

export const Route = createFileRoute('/_auth/cursos/')({
  component: () => <CoverLetters />,
})
