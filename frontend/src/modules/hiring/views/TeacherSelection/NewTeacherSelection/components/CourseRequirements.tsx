import { useFormContext, useFieldArray } from 'react-hook-form'
import { Input } from '@frontend/components/ui/input'
import { Button } from '@frontend/components/ui/button'
import { Plus, X } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@frontend/components/ui/form'
import { z } from 'zod'
import { formSchema } from './TeacherSelectionForm'

interface CourseRequirementsProps {
  index: number
}

export default function CourseRequirements({ index }: CourseRequirementsProps) {
  const form = useFormContext<z.infer<typeof formSchema>>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `courses.${index}.requirements`,
  })

  return (
    <article className="px-1">
      <header className="flex gap-2 items-center">
        <h3>Requerimientos</h3>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => append({ detail: '' })}
        >
          <Plus />
        </Button>
      </header>
      <Form {...form}>
        <ul className="mt-2 space-y-2">
          {fields.map((field, i) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`courses.${index}.requirements.${i}.detail`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-1">
                    <div className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Descrpción del requerimiento"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => remove(i)}
                    >
                      <X />
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          ))}
        </ul>
      </Form>
    </article>
  )
}
