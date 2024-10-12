import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import ThesisService from '@/modules/thesis/services/thesis.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, Plus, X } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function NewThesisForm() {
  const navigate = useNavigate({
    from: '/tesis/nueva-solicitud',
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const {
    append: appendAdvisor,
    remove: removeAdvisor,
    fields: advisorFields,
  } = useFieldArray({
    control: form.control,
    name: 'advisors',
  })

  const {
    append: appendStudent,
    remove: removeStudent,
    fields: studentFields,
  } = useFieldArray({
    control: form.control,
    name: 'students',
  })

  const { mutate, isPending } = useMutation({
    mutationFn: ThesisService.createThesis,
    onSuccess: ({ historyId, thesisCode }) => {
      navigate({
        to: '/tesis/tema-tesis/$requestCode',
        params: {
          requestCode: thesisCode,
        },
        search: {
          historyId,
        },
      })
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({
      ...data,
      applicantCode: '71547331',
      advisors: data.advisors.map((advisor) => advisor.code),
      students: data.students.map((student) => student.code),
      areaId: +data.areaId,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-[700px]"
      >
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>Título de la Tesis</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Escribe el título de la tesis"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="areaId"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>Área</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Elija un área de su especialidad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      Área {index}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className="flex justify-between">
            <FormLabel>Asesores</FormLabel>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => appendAdvisor({ code: '' })}
            >
              <Plus />
            </Button>
          </div>
          <div className="flex flex-col gap-2 col-span-1 ">
            {advisorFields.map((advisor, index) => (
              <FormField
                key={advisor.id}
                name={`advisors.${index}.code`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input {...field} placeholder="Código del asesor" />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAdvisor(index)}
                      >
                        <X />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {form.formState.errors.advisors && (
              <FormMessage className="col-span-1 md:col-span-2 text-red-600">
                {form.formState.errors.advisors.message}
              </FormMessage>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 col-span-1 ">
          <div className="flex justify-between">
            <FormLabel>Estudiantes</FormLabel>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => appendStudent({ code: '' })}
            >
              <Plus />
            </Button>
          </div>
          {studentFields.map((student, index) => (
            <FormField
              key={student.id}
              name={`students.${index}.code`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input {...field} placeholder="Código del estudiante" />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeStudent(index)}
                    >
                      <X />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          name="justification"
          render={() => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>Justificación</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Sube un archivo con la justificación"
                  {...form.register('justification')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="col-span-1 md:col-span-2 w-full"
          type="submit"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : 'Enviar'}
        </Button>
      </form>
    </Form>
  )
}

const formSchema = z.object({
  title: z
    .string({ required_error: 'El título es requerido' })
    .min(1, 'El título es requerido'),
  areaId: z.string({ required_error: 'El área es requerida' }),
  advisors: z
    .array(
      z.object({
        code: z
          .string({ required_error: 'El código del asesor es requerido' })
          .min(1, 'El código del asesor es requerido'),
      })
    )
    .nonempty('Debes agregar al menos un asesor'),
  students: z.array(
    z.object({
      code: z
        .string({ required_error: 'El código del estudiante es requerido' })
        .min(1, 'El código del estudiante es requerido'),
    })
  ),
  justification:
    typeof window !== 'undefined'
      ? z.any()
      : z.instanceof(FileList, {
          message: 'La justificación es requerida',
        }),
})
