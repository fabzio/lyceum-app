import { Button } from '@frontend/components/ui/button'
import GeneralInfo from './GeneralInfo'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import HiringService from '@frontend/modules/hiring/Services/Hirings.service'
import { useToast } from '@frontend/hooks/use-toast'
import CoursesSelection from './CoursesSelection'
import { useSessionStore } from '@frontend/store'
import { HiringPermissionsDict } from '@frontend/interfaces/enums/permissions/Hiring'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import AssignProfessorsDialog from './AssignProfessorsDialog'

interface Professor {
  accountId: string
  name?: string
  code?: string
}

export default function TeacherSelectionForm() {
  const { getRoleWithPermission } = useSessionStore()
  const navigate = useNavigate()
  const { toast } = useToast()

  const unitId = getRoleWithPermission(
    HiringPermissionsDict.CREATE_HIRING_PROCESS
  )!.unitId

  const [professors, setProfessors] = useState<Professor[]>([])

  const createProcess = useMutation({
    mutationFn: HiringService.createTeacherSelection,
    onSuccess: () => {
      navigate({
        to: '..',
      })
      toast({
        title: 'Convocatoria creada',
        description: 'La convocatoria ha sido creada exitosamente',
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleCreate = () => {
    const data: z.infer<typeof formSchema> = {
      description: form.getValues('description'),
      startDate: form.getValues('startDate'),
      endDate: form.getValues('endDate'), // Ensure you get the current form value
      endReceivingDate: form.getValues('endReceivingDate'),
      resultsPublicationDate: form.getValues('resultsPublicationDate'),
      professors: professors,
      courses: form.getValues('courses'),
    }
    createProcess.mutate({ ...data, unitId: unitId })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)}>
        <div className="flex">
          <div className="w-1/2">
            <GeneralInfo />
            <div className="w-1/2 ml-4">
              <AssignProfessorsDialog
                professors={professors}
                setProfessors={setProfessors}
              />
            </div>
          </div>
          <CoursesSelection />
        </div>
        <div className="mt-2 w-full flex justify-center">
          <Button
            type="submit"
            disabled={professors.length === 0}
            onClick={handleCreate}
            className="px-6 py-3 text-lg rounded-lg shadow-lg focus:outline-none focus:ring-2 disabled:opacity-50"
          >
            Crear convocatoria
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export const formSchema = z.object({
  description: z
    .string({
      required_error: 'Campo requerido',
    })
    .min(1, 'Campo requerido'),
  startDate: z.date({
    required_error: 'Campo requerido',
  }),
  endReceivingDate: z.date({
    required_error: 'Campo requerido',
  }),
  resultsPublicationDate: z.date({
    required_error: 'Campo requerido',
  }),
  endDate: z.date({
    required_error: 'Campo requerido',
  }),
  courses: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        code: z.string(),
        requirements: z
          .array(
            z.object({
              detail: z
                .string({ required_error: 'Campo requerido' })
                .min(1, 'Campo requerido'),
            })
          )
          .nonempty('Debe agregar al menos un requerimiento'),
      })
    )
    .nonempty('Debe agregar al menos un curso'),
  professors: z.array(
    z.object({
      accountId: z
        .string({
          required_error: 'Debes seleccionar un profesor',
        })
        .min(1, 'Debes seleccionar un profesor'),
    })
  ),
})

export type CreateTeacherSelectionForm = z.infer<typeof formSchema>
