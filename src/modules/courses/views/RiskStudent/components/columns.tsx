import { RiskStudentGeneral } from '@/modules/courses/interfaces/RIskStudentGeneral'
import { ColumnDef } from '@tanstack/react-table'

export const riskStudentColumns: ColumnDef<RiskStudentGeneral>[] = [
  {
    header: 'Código',
    accessorKey: 'studentCode',
    accessorFn: (data) => data.student.code,
    cell: ({ row }) => <div>{row.getValue('studentCode')}</div>,
  },
  {
    header: 'Nombres',
    accessorKey: 'studentName',
    accessorFn: (data) => data.student.name,
    cell: ({ row }) => <div>{row.getValue('studentName')}</div>,
  },
  {
    header: 'Apellidos',
    accessorKey: 'studentSurname',
    accessorFn: (data) => data.student.surname,
    cell: ({ row }) => <div>{row.getValue('studentSurname')}</div>,
  },
  {
    header: 'Curso',
    accessorKey: 'courseCode',
    accessorFn: (data) => data.course.name,
    cell: ({ row }) => <div>{row.getValue('courseCode')}</div>,
  },
  {
    header: 'Motivo',
    accessorKey: 'reason',
    accessorFn: (data) => data.reason,
    cell: ({ row }) => <div>{row.getValue('reason')}</div>,
  },
  {
    header: 'Última Puntuación',
    accessorKey: 'score',
    cell: ({ row }) => <div>{row.getValue('score') ?? 'N/A'}</div>,
  },
  {
    header: 'Estado',
    accessorKey: 'state',
    cell: ({ row }) => (
      <div>
        {row.getValue('state')
          ? 'Solicitud de reporte actualizado'
          : 'Reporte solicitado'}
      </div>
    ),
  },
]
