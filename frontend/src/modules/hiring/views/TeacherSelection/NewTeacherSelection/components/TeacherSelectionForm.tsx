import { Button } from '@frontend/components/ui/button'
import GeneralInfo from './GeneralInfo'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import HiringService from '@frontend/modules/hiring/Services/Hirings.service'
import { Loader2 } from 'lucide-react'
import { useToast } from '@frontend/hooks/use-toast'
import CoursesSelection from './CoursesSelection'
import { useSessionStore } from '@frontend/store'
import { HiringPermissionsDict } from '@frontend/interfaces/enums/permissions/Hiring'
import { useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@frontend/components/ui/dialog'
import { Input } from '@frontend/components/ui/input'
import { Label } from '@frontend/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@frontend/components/ui/table'
import { ScrollArea } from '@frontend/components/ui/scroll-area'
import { Checkbox } from '@frontend/components/ui/checkbox'
import ProfessorService from '@frontend/modules/users/services/Professor.service'
import { useFilters } from '@frontend/hooks/useFilters'
import { Professor } from '@frontend/modules/users/interfaces/Professor'

export default function TeacherSelectionForm() {
  const { getRoleWithPermission } = useSessionStore()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { filters } = useFilters(
    '/_auth/contrataciones/seleccion-docentes/nuevo'
  )

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [professors, setProfessors] = useState<Professor[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])

  console.log(setCurrentPage, totalPages)
  const professorList = async (params = {}) => {
    try {
      const response = await ProfessorService.fetchProfessors({
        ...filters,
        ...params,
      })
      return {
        data: response.result,
        totalPages: response.totalPages || 1,
      }
    } catch (error) {
      console.error('Error al cargar los profesores', error)
      return { data: [], totalPages: 1 }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await professorList({ page: currentPage })
      setProfessors(result.data)
      setTotalPages(result.totalPages)
    }
    fetchData()
  }, [currentPage, filters])

  const handleTeacherToggle = (teacherId: string, checked: boolean) => {
    setSelectedTeachers((prev) =>
      checked ? [...prev, teacherId] : prev.filter((id) => id !== teacherId)
    )
    if (checked) {
      setSelectedTeachers([...selectedTeachers, teacherId])
    } else {
      setSelectedTeachers(selectedTeachers.filter((id) => id !== teacherId))
    }
  }

  const handleSave = () => {
    toast({
      title: 'Comité seleccionado',
      description: `Se seleccionaron ${selectedTeachers.length} profesores.`,
    })
    setIsDialogOpen(false)
  }

  const { mutate, isPending } = useMutation({
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({
      ...data,
      unitId: getRoleWithPermission(
        HiringPermissionsDict.CREATE_HIRING_PROCESS
      )!.unitId,
    })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="w-1/2">
            <GeneralInfo />
            <div className="w-1/2 ml-4">
              <Button
                type="button"
                onClick={() => setIsDialogOpen(true)}
                className="w-full lg:w-auto px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Seleccionar Comité
              </Button>
            </div>
          </div>
          <CoursesSelection />
        </div>
        <div className="mt-2 w-full flex justify-center">
          <Button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 text-lg rounded-lg shadow-lg focus:outline-none focus:ring-2 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Crear convocatoria'
            )}
          </Button>
        </div>
      </form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seleccionar Comité</DialogTitle>
            <DialogDescription>
              Busca y selecciona a los profesores que formarán parte del comité.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Label htmlFor="search">Buscar Profesor</Label>
            <Input
              id="search"
              placeholder="Escribe el nombre del profesor"
              className="mt-2"
            />
          </div>

          <ScrollArea className="h-64 w-full border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell className="w-[48px]"></TableCell>
                  <TableCell className="w-[50%]">Nombre</TableCell>
                  <TableCell className="w-[50%]">Departamento</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {professors.map((teacher) => (
                  <TableRow key={teacher.code}>
                    <TableCell className="w-[48px]">
                      <div className="flex items-center justify-center h-full">
                        <Checkbox
                          id={`teacher-${teacher.code}`}
                          onCheckedChange={(checked) =>
                            handleTeacherToggle(
                              teacher.code,
                              checked as boolean
                            )
                          }
                          className="h-4 w-4"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="w-[50%]">
                      <Label htmlFor={`teacher-${teacher.code}`}>
                        {teacher.name}
                      </Label>
                    </TableCell>
                    <TableCell className="w-[50%]">{teacher.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
})

export type CreateTeacherSelectionForm = z.infer<typeof formSchema>
