import { Input } from '@frontend/components/ui/input'
import { Label } from '@frontend/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@frontend/components/ui/select'
import MassiveCoursesDialog from './components/MassiveCoursesDialog'

export default function StudyPlanActions() {
  return (
    <div className="flex items-end justify-between mb-6 gap-4">
      <div className="flex items-end gap-4 flex-grow">
        <div className="flex-grow">
          <Label>Vigencia</Label>
          <div className="flex gap-2">
            <Input placeholder="Ciclo de Inicio" className="w-48" />
            <Input placeholder="Ciclo de Fin / Ahora" className="w-48" />
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Vigente">Vigente</SelectItem>
            <SelectItem value="No Vigente">No Vigente</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <MassiveCoursesDialog />
    </div>
  )
}
