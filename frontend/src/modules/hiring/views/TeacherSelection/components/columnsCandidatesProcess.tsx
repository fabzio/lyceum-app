import { Button } from '@frontend/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Account } from '@frontend/interfaces/models/Account'
import { JobApplication } from '@frontend/interfaces/models/JobApplication'
import { ViewApplicationCell } from './ViewApplicationButton'

function mapToSimplifiedData(
  data: Pick<Account, 'id' | 'name' | 'email'> & {
    jobRequestStatus: JobApplication['state']
    jobRequestId: JobApplication['id']
  }
) {
  return {
    id: String(data.id),
    name: data.name,
    email: data.email,
    jobRequestStatus: String(data.jobRequestStatus),
    jobRequestId: Number(data.jobRequestId),
  }
}

export const CandidatesColumns = (
  step: 'first' | 'second' | 'selected',
  courseName: string | undefined
): ColumnDef<
  Pick<Account, 'id' | 'name' | 'email'> & {
    jobRequestStatus: JobApplication['state']
    jobRequestId: JobApplication['id']
  }
>[] => {
  const baseColumns: ColumnDef<
    Pick<Account, 'id' | 'name' | 'email'> & {
      jobRequestStatus: JobApplication['state']
      jobRequestId: JobApplication['id']
    }
  >[] = [
    {
      accessorKey: 'jobRequestId',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('jobRequestId')}</div>
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => String(row.getValue('name')),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Correo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'jobRequestStatus',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue('jobRequestStatus') as JobRequestStatus
        return (
          <div>{jobRequestStatusLabels[status] || 'Estado Desconocido'}</div>
        )
      },
    },
  ]

  if (step === 'first') {
    baseColumns.push({
      accessorKey: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <ViewApplicationCell
          {...mapToSimplifiedData(row.original)}
          courseName={courseName}
        />
      ),
    })
  }

  return baseColumns
}

type JobRequestStatus =
  | 'sent'
  | 'rejected'
  | 'to_evaluate'
  | 'evaluated'
  | 'selected'

const jobRequestStatusLabels: Record<JobRequestStatus, string> = {
  sent: 'Recibido',
  selected: 'Seleccionado',
  rejected: 'Rechazado',
  to_evaluate: 'Por evaluar',
  evaluated: 'Evaluado',
}
