import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@frontend/components/ui/accordion'
import { Course } from '@frontend/interfaces/models/Course'
import { Hiring } from '@frontend/interfaces/models/Hiring'
import { useMemo, useState } from 'react'

const ITEMS_PER_PAGE = 5
interface Props {
  hirings: Hiring[]
  searchTerm: string
}

export default function HiringAccordion({ hirings = [], searchTerm }: Props) {
  const [currentPage, setCurrentPage] = useState(0)

  // Filtrar los datos según el término de búsqueda
  const filteredHirings = useMemo(() => {
    return hirings.filter((hiring) =>
      hiring.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [hirings, searchTerm])

  // Dividir los datos en páginas
  const paginatedHirings = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredHirings.slice(start, end)
  }, [filteredHirings, currentPage])

  const totalPages = Math.ceil(filteredHirings.length / ITEMS_PER_PAGE)

  return (
    <div>
      <Accordion type="single" collapsible>
        {paginatedHirings.length > 0 ? (
          paginatedHirings.map(({ id, name, endDate, courses }) => (
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
            currentPage === 0
              ? 'text-gray-400 cursor-not-allowed bg-gray-100'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 rounded-md ${
              i === currentPage
                ? ' text- font-medium'
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages - 1
              ? 'text-gray-400 cursor-not-allowed bg-gray-100'
              : 'text-gray-600 hover:bg-gray-200'
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
            <button className="text-blue-500 hover:underline">
              Administrar
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
