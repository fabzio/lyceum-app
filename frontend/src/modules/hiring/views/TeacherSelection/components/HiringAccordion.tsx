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

const ITEMS_PER_PAGE = 5
interface Props {
  hirings: Hiring[]
}

export default function HiringAccordion({ hirings = [] }: Props) {
  const [currentPage, setCurrentPage] = useState(0)

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

function AssigmentAccordionItem({ courses }: { courses: Course[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {courses.map((course) => (
        <li className="flex justify-between" key={course.id}>
          <div>
            <span className="font-">{course.name}</span> {course.unitName}
          </div>
          <div>
            <Button variant="outline">Administrar</Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
