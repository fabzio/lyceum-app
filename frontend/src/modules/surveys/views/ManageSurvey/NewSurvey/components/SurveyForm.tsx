import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@frontend/components/ui/button'
import { Input } from '@frontend/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { CalendarIcon, Loader2, Plus, Trash } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@frontend/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@frontend/components/ui/popover'
import { cn } from '@frontend/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '@frontend/components/ui/calendar'
import { Link, useNavigate } from '@tanstack/react-router'
import { useToast } from '@frontend/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import SurveyManagementService from '@frontend/modules/surveys/services/ManageSurvey.service'
import { useSessionStore } from '@frontend/store'
import { SurveyPermissionsDict } from '@frontend/interfaces/enums/permissions/Survey'

export default function SurveyForm() {
  const { toast } = useToast()
  const navigate = useNavigate({
    from: '/encuestas/gestionar/nuevo',
  })
  const { session, getRoleWithPermission } = useSessionStore()
  const { mutate, isPending } = useMutation({
    mutationFn: SurveyManagementService.createSurvey,
    onSuccess: () => {
      toast({
        title: 'Encuesta creada',
        description: 'La encuesta se ha creado correctamente',
      })
      navigate({
        to: '/encuestas/gestionar',
      })
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
  })
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      endDate: undefined,
      surveyType: undefined,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  })
  const onSubmit = (data: FormData) => {
    mutate({
      ...data,
      creatorId: session!.id,
      unitId: getRoleWithPermission(SurveyPermissionsDict.CREATE_SURVEY)!
        .unitId,
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la encuesta</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese el nombre de la encuesta"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.questions?.message && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de Cierre</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type="button"
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Elija un fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surveyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de encuesta</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="midterm">Parcial</SelectItem>
                  <SelectItem value="annual">Anual</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questions"
          render={() => (
            <FormItem className="flex items-center gap-1">
              <div>
                <FormLabel>Preguntas</FormLabel>
                <FormMessage />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => append({ text: '', type: 'boolean' })}
                className="mt-2"
              >
                <Plus className="mr-2 h-4 w-4" />
              </Button>
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <FormField
              control={form.control}
              name={`questions.${index}.text`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Texto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el texto de la pregunta"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`questions.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de pregunta</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="text">Texto</SelectItem>
                      <SelectItem value="multiple">Opción multiple</SelectItem>
                      <SelectItem value="boolean">Sí/No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => remove(index)}
              className="mt-7"
            >
              <Trash className="w-5 h-5" />
            </Button>
          </div>
        ))}

        <div className="mt-6 flex justify-end gap-4">
          <Link to="..">
            <Button type="button" variant="secondary" disabled={isPending}>
              Volver
            </Button>
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 /> : 'Crear encuesta'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

const schema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  endDate: z.date({
    required_error: 'Campo requerido',
  }),
  surveyType: z.enum(['midterm', 'annual'], {
    required_error: 'Campo requerido',
  }),
  questions: z
    .array(
      z.object({
        text: z.string().min(1, 'La pregunta es obligatoria'),
        type: z.enum(['boolean', 'multiple', 'text']),
      })
    )
    .nonempty('Debe agregar al menos una pregunta'),
})

// Definimos el tipo inferido del formulario a partir del esquema
type FormData = z.infer<typeof schema>
