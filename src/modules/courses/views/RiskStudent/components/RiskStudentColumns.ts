import { ColumnDef } from '@tanstack/react-table'

export const riskStudentColumns: ColumnDef<{
  course: {
    code: string
    name: string
  }
  schedule: {
    id: number
    code: string
    professor: string
  }
  student: {
    name: string
    firstSurname: string
    secondSurname: string
    code: string
  }
  score: number
  reason: string
  state: boolean
}>[] = [
  {
    header: 'Código',
    accessorFn: (data) => data.student.code,
    cell: ({}) => <span>{data.student.code}</span>,
  },
  {
    header: 'Nombres',
    accessorFn: (data) => data.student.name,
  },
  {
    header: 'Apellidos',
    accessorFn: (data) =>
      `${data.student.firstSurname} ${data.student.secondSurname}`,
  },
  {
    header: 'Curso',
    accessorFn: (data) => data.course.name,
  },
  {
    header: 'Motivo',
    accessorFn: (data) => data.reason,
  },
  {
    header: 'Última Puntuación',
    accessorFn: (data) => data.score ?? 'N/A',
  },
  {
    header: 'Estado',
    accessorFn: (data) =>
      data.state ? 'Reporte actualizdo' : 'Reporte solicitado',
  },
]
