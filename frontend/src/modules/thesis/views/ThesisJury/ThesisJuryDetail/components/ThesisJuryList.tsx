import { Separator } from '@frontend/components/ui/separator'
import { Skeleton } from '@frontend/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@frontend/components/ui/table'
import { QueryKeys } from '@frontend/constants/queryKeys'
import ThesisJuryRequestService from '@frontend/modules/thesis/services/thesisJuryRequest.service'
import ThesisThemeRequestService from '@frontend/modules/thesis/services/ThesisThemeRequest.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import SearchJuryDialog from './SearchJuryDialog'
import Need from '@frontend/components/Need'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'

export default function ThesisJuryList() {
  const { requestCode } = useParams({
    from: '/_auth/tesis/propuesta-jurados/$requestCode',
  })
  const { data: thesisDetail } = useQuery({
    queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode],
    queryFn: () => ThesisThemeRequestService.getThemeRequestDetail(requestCode),
  })
  const {
    data: thesisJuries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QueryKeys.thesis.THESIS_JURIES, requestCode],
    queryFn: () => ThesisJuryRequestService.getThesisJuries(requestCode),
  })
  if (isLoading) return <Skeleton className="h-96 w-full" />
  if (isError) return <div>ThesisJuryHistory</div>
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="w-full flex justify-between items-center h-10 py-2">
          <h2 className="text-xl font-bold">Jurados</h2>
          <Need permissions={ThesisPermissionsDict.ASSIGN_THESIS_JURY}>
            {thesisDetail?.juryState === 'requested' && <SearchJuryDialog />}
          </Need>
        </div>
      </div>
      <Separator />
      <div className="px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {thesisJuries?.length ? (
              thesisJuries.map((jury) => <JuryRow key={jury.code} {...jury} />)
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No se han asignado jurados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function JuryRow({
  code,
  name,
}: {
  code: string
  name: string
  firstSurname: string
  secondSurname: string
}) {
  return (
    <TableRow>
      <TableCell>{code}</TableCell>
      <TableCell>{name}</TableCell>
    </TableRow>
  )
}
