import { QueryKeys } from '@frontend/constants/queryKeys'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSessionStore } from '@frontend/store'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import EnrollmenDistributionService from '@frontend/modules/enrollment/services/EnrollmentDistribution.service'
import CourseScheduleAccordion from './CourseScheduleAccordion'
export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export default function EnrollmentProposalAccordion() {
  const { getRoleWithPermission } = useSessionStore()
  const facultyId = getRoleWithPermission(
    EnrollmentPermissionsDict.READ_SCHEDULE_PROFESORS
  )?.unitId
  const unitId = getRoleWithPermission(
    EnrollmentPermissionsDict.ASSIGN_SCHEDULE_PROFESORS
  )?.unitId
  const { data: coursesSchedule } = useSuspenseQuery({
    queryKey: [QueryKeys.enrollment.SCHEDULE_DISTRIBUTION],
    queryFn: () =>
      EnrollmenDistributionService.getCoursesSchedules({
        unitId: (facultyId ?? unitId)!,
      }),
  })
  if (!coursesSchedule.length) {
    return (
      <p className="mx-auto text-muted-foreground">
        No se encontraron horarios de cursos para la unidad seleccionada
      </p>
    )
  }
  return (
    <>
      <CourseScheduleAccordion courseSchedules={coursesSchedule ?? []} />
    </>
  )
}
