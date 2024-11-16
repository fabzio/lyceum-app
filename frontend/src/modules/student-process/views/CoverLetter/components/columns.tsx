import { PresentationCard } from '@frontend/modules/student-process/interfaces/PresentationCard'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

export const CoverLetterColumns: ColumnDef<PresentationCard>[] = [
  {
    accessorKey: 'id',
    header: 'Nro. Solicitud',
  },
  {
    accessorKey: 'companyName',
    header: 'Nombre de la Empresa',
  },
  {
    accessorKey: 'submissionDate',
    header: 'Fecha de envío',
    cell: ({ row }) => moment(row.original.submissionDate).format('DD/MM/YYYY'),
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => mapCoverLetterStatus[row.original.status],
  },
  {
    accessorKey: 'name',
    header: 'Curso',
  },
  {
    accessorKey: 'code',
    header: 'Horario',
  },
]

export const mapCoverLetterStatus = {
  sent: 'Pendiente',
  accepted: 'Aprobado',
  rejected: 'Rechazado',
  succeeded: 'Exitoso',
}
