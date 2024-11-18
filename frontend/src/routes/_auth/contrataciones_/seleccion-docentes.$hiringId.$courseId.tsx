import { createFileRoute } from '@tanstack/react-router'
import TransitionPage from '@frontend/components/anim/TransitionPage'
import HiringProcess from '@frontend/modules/hiring/indexProcess.tsx'

export const Route = createFileRoute(
  '/_auth/contrataciones/seleccion-docentes/$hiringId/$courseId'
)({
  validateSearch: (search: Record<string, unknown>) => ({
    courseName: search.courseName as string | undefined,
  }),
  component: HiringProcessWrapper,
})

function HiringProcessWrapper() {
  const { courseName } = Route.useSearch()

  return (
    <TransitionPage>
      <HiringProcess
        courseName={courseName ? decodeURIComponent(courseName) : ''}
      />
    </TransitionPage>
  )
}
