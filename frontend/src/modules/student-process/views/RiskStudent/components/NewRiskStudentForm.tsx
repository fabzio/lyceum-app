import QuickSearchInput from '@frontend/components/QuickSearchInput.tsx/QuickSearchInput'
import { Button } from '@frontend/components/ui/button'
import { DialogClose, DialogFooter } from '@frontend/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@frontend/components/ui/select'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import { useFilters } from '@frontend/hooks/useFilters'

import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'

import RiskStudentService from '@frontend/modules/student-process/services/riskStudent.service'
import UnitService from '@frontend/modules/unit/services/Unit.service'
import ScheduleService from '@frontend/service/Schedules.service'
import { useSessionStore } from '@frontend/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  handleClose: () => void
}
export default function RiskStudentForm({ handleClose }: Props) {
  const { getRoleWithPermission } = useSessionStore()

  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { data: reasons, isLoading: loading } = useQuery({
    queryKey: ['reasons'],
    queryFn: () => RiskStudentService.getAllRiskReasons(),
  })

  const { filters } = useFilters(
    '/_auth/procesos-de-estudiantes/alumnos-riesgo'
  )
  const { mutate, isPending } = useMutation({
    mutationFn: RiskStudentService.insertRiskStudentReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.courses.RISK_STUDENTS, filters],
      })
      handleClose()
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: (data: z.infer<typeof formSchema>) => void = (data) => {
    // Convertir el único registro en un arreglo con la estructura esperada
    const preparedData = [
      {
        studentCode: data.userCode, // Código del estudiante
        scheduleCode: data.course.schedulecode, // Código del horario
        courseCode: data.course.courseCode, // Código del curso
        reasonId: data.reasonId, // ID del motivo
      },
    ]
    console.log('Datos enviados al servicio:', preparedData)

    // Enviar el arreglo al servicio
    mutate(preparedData)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="userCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alumno</FormLabel>
                <FormControl>
                  <QuickSearchInput
                    placeholder="Buscar usuario por código o nombre"
                    searchFn={(q) =>
                      UnitService.getStudentsFromUnit({
                        unitId: getRoleWithPermission(
                          StudentProcessPermissionsDict.LOAD_RISK_STUDENTS
                        )!.unitId, //jugadon para obtener el unitId
                        q,
                      })
                    }
                    handleSelect={(item) => {
                      field.onChange(item?.code)
                    }}
                    renderOption={(item) => (
                      <div className="hover:bg-muted">
                        {`${item.name} ${item.firstSurname} ${item.secondSurname} ${item.code}`}
                      </div>
                    )}
                    renderSelected={(item) => (
                      <article>
                        <h5 className="font-semibold">
                          {`${item.name} ${item.firstSurname} ${item.secondSurname}`}
                        </h5>
                        <p className="text-xs">{item.code}</p>
                      </article>
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="course" //scheduleId
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curso</FormLabel>
                <FormControl>
                  <QuickSearchInput
                    placeholder="Buscar Horario"
                    searchFn={
                      () =>
                        form.getValues('userCode')
                          ? ScheduleService.getAccounSchedule(
                              form.getValues('userCode')
                            )
                          : Promise.resolve([]) // Si no hay usuario seleccionado, no realizar búsqueda
                    }
                    handleSelect={(item) => {
                      field.onChange({
                        id: item?.id, //id del horario
                        schedulecode: item?.code, //codigo del horario ejem H101
                        courseId: item?.courseId, //id del curso
                        courseCode: item?.courseCode,
                      })
                    }}
                    renderOption={(item) => (
                      <div className="hover:bg-muted">
                        {' '}
                        {`${item.courseName} ${item.code}`}
                      </div>
                    )}
                    renderSelected={(item) => (
                      <article>{item.courseName}</article>
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="reasonId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motivo</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un motivo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {reasons
                      ? reasons.map((reason) => (
                          <SelectItem
                            key={reason.id}
                            value={reason.id.toString()}
                          >
                            {reason.id} - {reason.name}
                          </SelectItem>
                        ))
                      : []}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              disabled={isPending}
              onClick={() => {
                console.log(
                  'Datos del formulario antes de enviar:',
                  form.getValues()
                ) // Imprimir los valores actuales del formulario
                form.handleSubmit(onSubmit)()
              }}
            >
              {isPending ? <Loader2 className="animate-spin" /> : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}

const formSchema = z.object({
  userCode: z
    .string({ required_error: 'El usuario es requerido' })
    .min(1, 'El usuario es requerido'),
  course: z.object({
    id: z.number(),
    schedulecode: z.string(),
    courseId: z.number(),
    courseCode: z.string(),
  }),
  reasonId: z.number({ required_error: 'El motivo es requerido' }),
})
