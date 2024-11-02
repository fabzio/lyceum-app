import { createFileRoute } from '@tanstack/react-router'
import CoverLetters from '@frontend/modules/student-process/views/CoverLetter'

export const Route = createFileRoute('/_auth/cursos/')({
  component: () => <CoverLetters />,
})
