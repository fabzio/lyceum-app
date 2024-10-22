import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import StudyPlanActions from './components/StudyPlanActions'
import StudyPlanCourses from './components/StudyPlanCourses'
import StudyPlanAddCourse from './components/StudyPlanAddCourse'
import CourseCard from './components/CourseCard'
import { useState } from 'react'
import { Course } from '@/interfaces/models/Course'

export default function StudyPlanDetail() {
  const [course, setCourse] = useState<Course | null>(null)
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    console.log(active.id, over?.id)
  }
  return (
    <DndContext
      onDragStart={({ active }) => setCourse(active.data.current as Course)}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full">
        <StudyPlanAddCourse />
        <section>
          <StudyPlanActions />
          <StudyPlanCourses />
        </section>
      </div>
      <DragOverlay>{course && <CourseCard {...course} />}</DragOverlay>
    </DndContext>
  )
}
