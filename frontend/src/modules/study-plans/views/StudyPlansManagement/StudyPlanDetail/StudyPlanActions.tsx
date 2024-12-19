//import { Input } from '@frontend/components/ui/input'
import { Label } from '@frontend/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@frontend/components/ui/select'
//import MassiveCoursesDialog from './components/MassiveCoursesDialog'
import { useParams } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import StudyPlanService from '@frontend/modules/study-plans/services/studyPlan.service'
import { toast } from '@frontend/hooks/use-toast'
import { Button } from '@frontend/components/ui/button'
import { useState } from 'react'
import MassiveCoursesDialog from './components/MassiveCoursesDialog'

export default function StudyPlanActions() {
  const { planId } = useParams({
    from: '/_auth/plan-de-estudios/gestionar/$planId',
  })

  const [active, setActive] = useState<string | undefined>(undefined)
  const [state, setState] = useState<string | undefined>(undefined)

  const { mutate: toggleActive } = useMutation({
    mutationFn: () =>
      StudyPlanService.updateStudyPlanState(parseInt(planId), {
        active: active === 'Sí',
      }),
    onSuccess: () => {
      toast({
        title: 'Éxito',
        description:
          'La vigencia del plan de estudio fue actualizada correctamente.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar la vigencia del plan de estudio.',
        variant: 'destructive',
      })
    },
  })

  const { mutate: updateState } = useMutation({
    mutationFn: () =>
      StudyPlanService.updateStudyPlanState(parseInt(planId), { state }),
    onSuccess: () => {
      toast({
        title: 'Éxito',
        description:
          'El estado del plan de estudio fue actualizado correctamente.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el estado del plan de estudio.',
        variant: 'destructive',
      })
    },
  })

  return (
    <div className="flex items-center gap-12 mb-8">
      {/* Select de "Activo" */}
      <div className="flex items-center gap-4">
        <Label>Vigente</Label>
        <Select value={active} onValueChange={(value) => setActive(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sí">Sí</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => toggleActive()} disabled={!active}>
          Guardar Vigencia
        </Button>
      </div>

      {/* Select de "Estado" */}
      <div className="flex items-center gap-4 ml-12">
        <Label>Estado</Label>
        <Select value={state} onValueChange={(value) => setState(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="editing">Editando</SelectItem>
            <SelectItem value="saved">Finalizado</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => updateState()} disabled={!state}>
          Guardar Estado
        </Button>
      </div>
      <div>
        <MassiveCoursesDialog />
      </div>
    </div>
  )
}
