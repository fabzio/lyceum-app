import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@frontend/components/ui/accordion'
import { Course } from '@frontend/interfaces/models/Course'
import { Hiring } from '@frontend/interfaces/models/Hiring'

interface Props {
  hirings: Hiring[]
}

export default function HiringAccordion({ hirings = [] }: Props) {
  return (
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
              <AssigmentAccordionItem courses={courses} />
            </AccordionContent>
          </AccordionItem>
        ))
      ) : (
        <div className="text-center text-muted-foreground mt-2">
          No hay roles asignados
        </div>
      )}
    </Accordion>
  )
}

function AssigmentAccordionItem({ courses }: { courses: Course[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {courses.map((course) => (
        <li className="flex justify-between" key={course.id}>
          <div>
            <span className="font-">{course.name}</span> {course.unitName}
          </div>
        </li>
      ))}
    </ul>
  )
}
