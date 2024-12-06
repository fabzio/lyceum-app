import { Button } from '@frontend/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { Account } from '@frontend/interfaces/models/Account'
import { JobApplication } from '@frontend/interfaces/models/JobApplication'
import { ViewApplicationCell } from './ViewApplicationButton'
import { ViewEvaluationCell } from './ViewApplicationEvaluation'
import { HiringRequirement } from '@frontend/interfaces/models/HiringRequirement'
import { HiringPermissionsDict } from '@frontend/interfaces/enums/permissions/Hiring'
import { PermissionCode } from '@frontend/interfaces/enums/permissions'

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
  courseName: string | undefined,
  requirements: HiringRequirement[] | null,
  havePermission: (permission: PermissionCode) => boolean
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

  if (
    step === 'first' &&
    havePermission(HiringPermissionsDict.CHANGE_STATUS_ALL_CANDIDATES_PHASE_1)
  ) {
    baseColumns.push({
      accessorKey: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <ViewApplicationCell
          {...mapToSimplifiedData(row.original)}
          courseName={courseName}
          requirements={requirements}
        />
      ),
    })
  } else if (
    step === 'second' &&
    havePermission(HiringPermissionsDict.EVALUATE_ALL_CANDIDATES_PHASE_2)
  ) {
    baseColumns.push({
      accessorKey: 'evaluate',
      header: 'Evaluación',
      cell: ({ row }) => {
        const status = row.getValue('jobRequestStatus') as JobRequestStatus
        if (status == 'to_evaluate') {
          return (
            <ViewEvaluationCell
              {...mapToSimplifiedData(row.original)}
              courseName={courseName}
              requirements={requirements}
              edit={true}
            />
          )
        } else if (status == 'evaluated') {
          return (
            <ViewEvaluationCell
              {...mapToSimplifiedData(row.original)}
              courseName={courseName}
              requirements={requirements}
              edit={false}
              havePermission={havePermission}
            />
          )
        }
      },
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
