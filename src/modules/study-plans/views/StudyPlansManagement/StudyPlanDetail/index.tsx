import { DndContext, DragOverlay } from '@dnd-kit/core'
import StudyPlanActions from './StudyPlanActions'
import StudyPlanCourses from './StudyPlanCourses'
import StudyPlanAddCourse from './StudyPlanAddCourse'
import CourseCard from './components/CourseCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useStudyPlan } from '@/modules/study-plans/hooks/useStudyPlan'
import { Course } from '@/interfaces/models/Course'

export default function StudyPlanDetail() {
  const { course, setCourse, handleDragEnd } = useStudyPlan()

  return (
    <DndContext
      onDragStart={({ active }) => setCourse(active.data.current as Course)}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full">
        <StudyPlanAddCourse />
        <ScrollArea className="h-svh w-full">
          <section className="flex-1 px-4">
            <StudyPlanActions />
            <StudyPlanCourses />
          </section>
        </ScrollArea>
      </div>
      <DragOverlay>{course && <CourseCard {...course} />}</DragOverlay>
    </DndContext>
  )
}
