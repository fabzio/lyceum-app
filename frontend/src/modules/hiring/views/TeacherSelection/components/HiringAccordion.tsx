import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@frontend/components/ui/accordion'
import { Button } from '@frontend/components/ui/button'
import { Course } from '@frontend/interfaces/models/Course'
import { Hiring } from '@frontend/interfaces/models/Hiring'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Eye, PenBox } from 'lucide-react'
import { useSessionStore } from '@frontend/store'
import { HiringPermissionsDict } from '@frontend/interfaces/enums/permissions/Hiring'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@frontend/constants/queryKeys'
import HiringService from '@frontend/modules/hiring/Services/Hirings.service'
import { JobApplication } from '@frontend/interfaces/models/JobApplication'

const ITEMS_PER_PAGE = 5
interface Props {
  hirings: Hiring[]
}

export default function HiringAccordion({ hirings = [] }: Props) {
  const [currentPage, setCurrentPage] = useState(0)

  const { session } = useSessionStore()

  const { data: userApplications } = useQuery({
    queryKey: [QueryKeys.hiring.HIRINGS],
    queryFn: () => HiringService.getApplicationsFromUser(String(session?.id)),
    placeholderData: keepPreviousData,
    enabled: !!session, // Only fetch if session is truthy
  })

  const totalPages = Math.ceil(hirings.length / ITEMS_PER_PAGE)

  return (
    <div>
      <Accordion type="single" collapsible>
        {hirings.length > 0 ? (
          hirings.map(({ id, name, endDate, courses }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger>
                <div className="w-full px-2 flex justify-between">
                  <h3>{name}</h3>
                  <p>{endDate}</p>
                  <p>
                    {courses.length} {courses.length === 1 ? 'curso' : 'cursos'}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <AssigmentAccordionItem
                  courses={courses}
                  hiringId={id}
                  applications={userApplications}
                />
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <div className="text-center text-muted-foreground mt-2">
            No hay roles asignados
          </div>
        )}
      </Accordion>

      {/* Paginación */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-3 py-1 rounded-md ${
            currentPage === 0 ? 'cursor-not-allowed' : ' hover:bg-muted'
          }`}
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 rounded-md ${
              i === currentPage ? ' text- font-medium' : 'bg-muted'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages - 1 ? 'cursor-not-allowed' : ''
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

function AssigmentAccordionItem({
  courses,
  hiringId,
  applications,
}: {
  courses: (Course & { processId: string })[]
  hiringId: string
  applications:
    | {
        jrId: JobApplication['id']
        jrState: JobApplication['state']
        courseHiringId: JobApplication['courseHiringId']
      }[]
    | undefined
}) {
  const getJrStateText = (jrState: string): string => {
    switch (jrState) {
      case 'sent':
        return 'Enviado para revisión'
      case 'rejected':
        return 'Rechazado'
      case 'to_evaluate':
        return 'Por evaluar'
      case 'evaluated':
        return 'Evaluado'
      default:
        return ''
    }
  }

  const { havePermission } = useSessionStore()
  return (
    <ul className="flex flex-col gap-2">
      {courses.map((course) => (
        <li className="flex justify-between" key={course.id}>
          <div className="flex ml-4 items-center">
            <span className="font-semibold">{course.name}</span>
            <span className="ml-2">{course.unitName}</span>
          </div>
          <div className="text-sm text-muted-foreground flex items-center pl-4 min-w-[100px]">
            <span className="text-center w-full">
              {getJrStateText(
                (applications &&
                  applications.find(
                    (app) => app.courseHiringId === course.processId
                  )?.jrState) ||
                  ''
              )}
            </span>
          </div>
          <div>
            {(havePermission(
              HiringPermissionsDict.VIEW_ALL_CANDIDATES_PHASE_1
            ) ||
              havePermission(
                HiringPermissionsDict.VIEW_ALL_CANDIDATES_PHASE_2
              )) &&
              (!applications ||
                !applications.some(
                  (app) => app.courseHiringId === course.processId
                )) && (
                <Link
                  to="/contrataciones/seleccion-docentes/$hiringId"
                  params={{
                    hiringId,
                  }}
                  search={{ courseId: course.id, courseName: course.name }}
                >
                  <Button
                    variant="outline"
                    className="justify-start gap-2 w-42"
                  >
                    <Eye className="h-4 w-4" />
                    Ver postulantes
                  </Button>
                </Link>
              )}
            {havePermission(HiringPermissionsDict.CREATE_JOB_REQUEST) &&
              (!applications ||
                !applications.some(
                  (app) => app.courseHiringId === course.processId
                )) && (
                <Link
                  to="/contrataciones/seleccion-docentes/postulacion"
                  search={{
                    courseId: course.id,
                    courseName: course.name,
                    hiringId: hiringId,
                    hiringProcessId: course.processId,
                  }}
                >
                  <Button
                    variant="outline"
                    className="justify-start gap-2 w-42 ml-4"
                  >
                    <PenBox className="h-4 w-4" />
                    Postular
                  </Button>
                </Link>
              )}
            {havePermission(HiringPermissionsDict.READ_OWN_JOB_REQUESTS) &&
              applications &&
              applications.some(
                (app) => app.courseHiringId === course.processId
              ) && (
                <Link
                  to="/contrataciones/seleccion-docentes/revision"
                  search={{
                    courseId: course.id,
                    courseName: course.name,
                    hiringId: hiringId,
                    hiringProcessId: course.processId,
                    jobRequestId: applications.find(
                      (app) => app.courseHiringId === course.processId
                    )?.jrId as number,
                  }}
                >
                  <Button
                    variant="outline"
                    className="justify-start gap-2 w-42"
                  >
                    <Eye className="h-4 w-4" />
                    Ver postulación
                  </Button>
                </Link>
              )}
          </div>
        </li>
      ))}
    </ul>
  )
}
