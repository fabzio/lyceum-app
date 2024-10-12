import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { QueryKeys } from '@/constants/queryKeys'
import ThesisJuryRequestService from '@/modules/thesis/services/thesisJuryRequest.service'
import ThesisThemeRequestService from '@/modules/thesis/services/ThesisThemeRequest.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import SearchJuryDialog from '../components/SearchJuryDialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Save, X } from 'lucide-react'

export default function ThesisJuryHistory() {
  const { requestCode } = useParams({
    from: '/tesis/propuesta-jurados/$requestCode',
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
          {thesisDetail?.juryState === 'requested' && <SearchJuryDialog />}
        </div>
      </div>
      <Separator />
      <div className="px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Acciones</TableHead>
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

function JuryRow({ code, name }: { code: string; name: string }) {
  return (
    <TableRow>
      <TableCell>{code}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
