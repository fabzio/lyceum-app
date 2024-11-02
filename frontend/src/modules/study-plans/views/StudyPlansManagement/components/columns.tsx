import { StudyPlan } from '@frontend/interfaces/models/StudyPlan'
import { ColumnDef } from '@tanstack/react-table'
import {
  mapStudyPlanStatus,
  StudyPlanStatus,
} from '../../CoursesManagment/utils/mapStudyPlanStatus'

export const studyPlanTableColumns: ColumnDef<StudyPlan>[] = [
  {
    accessorKey: 'initTerm',
    header: 'Inicio de vigencia',
    cell: ({ row }) => <div>{row.getValue('initTerm') ?? 'No asignado'}</div>,
  },
  {
    accessorKey: 'endTerm',
    header: 'Fin de vigencia',
    cell: ({ row }) => <div>{row.getValue('endTerm') ?? 'No asignado'}</div>,
  },
  {
    accessorKey: 'current',
    header: 'Vigente',
    cell: ({ row }) => <div>{row.getValue('current') ? 'Sí' : 'No'}</div>,
  },
  {
    accessorKey: 'state',
    header: 'Estado',
    cell: ({ row }) => (
      <div>{mapStudyPlanStatus[row.getValue('state') as StudyPlanStatus]}</div>
    ),
  },
]
