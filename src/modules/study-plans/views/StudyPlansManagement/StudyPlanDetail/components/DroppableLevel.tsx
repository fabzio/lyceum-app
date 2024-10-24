import { Course } from '@/interfaces/models/Course'
import { useDroppable } from '@dnd-kit/core'
import CourseCard from './CourseCard'
import DraggableCourseCard from './DraggableCourseCard'

interface Props {
  level?: number
  courses: Course[]
}
export default function DroppableLevel({ level, courses = [] }: Props) {
  const { setNodeRef } = useDroppable({
    id: `study-plan-courses.${level}`,
  })
  return (
    <>
      <h4 className="font-semibold text-3xl">Nivel {level}</h4>
      <div ref={setNodeRef} className="bg-muted rounded-lg">
        <ul className="h-[216px] p-1 flex gap-1 items-stretch">
          {courses.length > 0 ? (
            courses.map((course) => (
              <DraggableCourseCard
                key={course.code}
                {...course}
                origin="study-plan"
              >
                <CourseCard {...course} />
              </DraggableCourseCard>
            ))
          ) : (
            <div className='h-full w-full grid place-content-center'>
              <p className="text-muted-foreground text-center">
                No hay cursos en este nivel
              </p>
            </div>
          )}
        </ul>
      </div>
    </>
  )
}
