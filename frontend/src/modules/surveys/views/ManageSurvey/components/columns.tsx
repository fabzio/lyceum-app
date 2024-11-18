import { Survey } from '@frontend/modules/surveys/interfaces/Survey'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

export const surveyTableColums: ColumnDef<Survey>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'active',
    header: 'Activo',
    cell: ({ row }) => (row.original.active ? 'Sí' : 'No'),
  },
  {
    accessorKey: 'surveyType',
    header: 'Tipo de encuesta',
    cell: ({ row }) =>
      row.original.surveyType === 'midterm' ? 'Intermedia' : 'Anual',
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'endDate',
    header: 'Fecha de finalización',
    cell: ({ row }) => moment(row.original.endDate).format('DD/MM/YYYY'),
  },
  {
    accessorKey: 'creationDate',
    header: 'Fecha de creación',
    cell: ({ row }) => moment(row.original.creationDate).format('DD/MM/YYYY'),
  },
]
