import { Course } from '@frontend/interfaces/models/Course'
import CourseRequirements from './CourseRequirements'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@frontend/components/ui/accordion'
import { Button } from '@frontend/components/ui/button'
import { X } from 'lucide-react'

interface CoursesListProps {
  coursesList: Course[]
  handleRemoveCourse: (index: number) => void
}

export default function CoursesList({
  coursesList,
  handleRemoveCourse,
}: CoursesListProps) {
  return (
    <Accordion type="single" collapsible defaultValue="course-0">
      {coursesList.map((course, index) => (
        <div className="w-full flex gap-1 items-start">
          <AccordionItem
            key={course.code}
            value={`course-${index}`}
            className="flex-1"
          >
            <AccordionTrigger>
              <div className="flex w-full">
                <h4>
                  {course.name} - {course.code}
                </h4>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CourseRequirements index={index} />
            </AccordionContent>
          </AccordionItem>

          <Button
            className="mt-2"
            type="button"
            size="icon"
            variant="outline"
            onClick={() => handleRemoveCourse(index)}
          >
            <X />
          </Button>
        </div>
      ))}
    </Accordion>
  )
}
