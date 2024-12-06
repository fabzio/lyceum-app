import QuickSearchInput from '@frontend/components/QuickSearchInput.tsx/QuickSearchInput'
import { Course } from '@frontend/interfaces/models/Course'
import CourseService from '@frontend/modules/study-plans/services/course.service'
import CoursesList from './CoursesList'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from './TeacherSelectionForm'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'

export default function CoursesSelection() {
  const form = useFormContext<z.infer<typeof formSchema>>()
  const {
    fields: coursesField,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'courses',
  })
  return (
    <div className="px-4 w-1/2">
      <Form {...form}>
        <FormField
          control={form.control}
          name="courses"
          render={() => (
            <FormItem>
              <FormLabel>Cursos</FormLabel>
              <FormControl>
                <QuickSearchInput
                  notKeepSelected
                  searchFn={(q) => CourseService.searchCourse(q)}
                  renderOption={(course) => <p> {course.name}</p>}
                  renderSelected={(course) => (
                    <article>
                      <h3 className="font-semibold">{course.name}</h3>
                      <p className="text-xs">{course.code}</p>
                    </article>
                  )}
                  placeholder="Buscar curso por nombre o código"
                  handleSelect={(course) =>
                    append({ ...course!, requirements: [{ detail: '' }] })
                  }
                />
              </FormControl>
              {form.formState.errors.courses?.message && <FormMessage />}
            </FormItem>
          )}
        />
      </Form>
      <CoursesList
        coursesList={
          coursesField.map((course) => ({ ...course, credits: 0 })) as Course[]
        }
        handleRemoveCourse={(index) => remove(index)}
      />
    </div>
  )
}
