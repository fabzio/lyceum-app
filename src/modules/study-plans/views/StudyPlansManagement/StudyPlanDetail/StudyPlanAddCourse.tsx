import ExpandibleAsidebar from '@/components/ExpandibleAsidebar'
import { Button } from '@/components/ui/button'
import { QueryKeys } from '@/constants/queryKeys'
import { useFilters } from '@/hooks/useFilters'
import CourseService from '@/modules/study-plans/services/course.service'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ListFilter } from 'lucide-react'
import CourseQuickSearch from './components/CourseQuickSearch'
import { ScrollArea } from '@/components/ui/scroll-area'
import DraggableCourseCard from './components/DraggableCourseCard'
import CourseCard from './components/CourseCard'
import { Skeleton } from '@/components/ui/skeleton'

export default function StudyPlanAddCourse() {
  const { filters } = useFilters('/_auth/plan-de-estudios/gestionar/$planId')
  const { data, isLoading } = useInfiniteQuery({
    queryKey: [QueryKeys.studyPlan.COURSES_INF, filters],
    queryFn: ({ pageParam }) =>
      CourseService.fetchCourses({ ...filters, pageIndex: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
  })

  return (
    <ExpandibleAsidebar>
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="relative flex flex-row space-x-2">
          <div className="flex-grow">
            <CourseQuickSearch />
          </div>
          <Button variant="ghost">
            <ListFilter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-188px)]">
        <ul className="space-y-2">
          {!isLoading ? (
            data?.pages
              ?.flatMap((course) => course.result)
              .map((course, idx) => (
                <DraggableCourseCard key={idx} {...course} origin="courses">
                  <CourseCard {...course} />
                </DraggableCourseCard>
              ))
          ) : (
            <>
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} className="h-[181px] w-auto" />
              ))}
            </>
          )}
        </ul>
      </ScrollArea>
    </ExpandibleAsidebar>
  )
}
