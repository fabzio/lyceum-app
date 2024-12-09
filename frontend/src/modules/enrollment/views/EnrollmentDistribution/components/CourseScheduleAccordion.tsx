import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@frontend/components/ui/accordion'
import { CourseSchedule } from '../interfaces/CourseSchedules'
import { Schedule } from '@frontend/interfaces/models/Schedule'
import AsingProfessorsToCoursesDialog from './AsingProfessorsToCoursesDialog'
import ScheduleVisibilityDropdown from './ScheduleVisibilityDropdown'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import Need from '@frontend/components/Need'

interface Props {
  courseSchedules: CourseSchedule[]
}
export default function CourseScheduleAccordion({ courseSchedules }: Props) {
  return (
    <Accordion type="multiple" className="w-full">
      {courseSchedules.map((courseSchedule, index) => (
        <AccordionItem key={index} value={courseSchedule.id.toString()}>
          <AccordionTrigger>
            <div className="flex justify-between w-full px-3">
              <h3>{courseSchedule.name}</h3>
              <span>{`
                ${courseSchedule.schedules.length} horario${courseSchedule.schedules.length === 1 ? '' : 's'}
              `}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ScheduleList schedules={courseSchedule.schedules} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
interface ScheduleListProps {
  schedules: Schedule[]
}
function ScheduleList({ schedules }: ScheduleListProps) {
  return (
    <ul className="flex flex-col gap-2 w-full my-1">
      {schedules.map((schedule, index) => (
        <li key={index} className="flex gap-1 justify-between items-center">
          <span>{schedule.code}</span>
          <div className="px-2 flex gap-3 items-center">
            <Need
              permissions={EnrollmentPermissionsDict.READ_SCHEDULE_PROFESORS}
            >
              <div>
                <ScheduleVisibilityDropdown
                  scheduleId={schedule.id}
                  defaultValue={schedule.visibility}
                />
              </div>
            </Need>
            <span>{schedule.vacancies} vacantes</span>
            <span>
              {schedule.state === 'saved'
                ? 'Docentes asignados'
                : 'Sin docente'}
            </span>
            {schedule.state !== 'saved' && (
              <Need
                permissions={
                  EnrollmentPermissionsDict.ASSIGN_SCHEDULE_PROFESORS
                }
              >
                <AsingProfessorsToCoursesDialog scheduleId={schedule.id} />
              </Need>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
