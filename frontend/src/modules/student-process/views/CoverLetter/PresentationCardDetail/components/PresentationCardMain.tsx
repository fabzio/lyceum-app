import { ScrollArea } from '@frontend/components/ui/scroll-area'
import { Separator } from '@frontend/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@frontend/components/ui/table'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Badge } from '@frontend/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/components/ui/card'
import PDFPreview from './PDFPreview'
import PresentationCardService from '@frontend/modules/student-process/services/presentationCard.service'
import { mapCoverLetterStatus } from '../../components/columns'
import { Button } from '@frontend/components/ui/button'

export default function CoverLetterDetailMain() {
  const { requestCode } = useParams({
    from: '/_auth/procesos-de-estudiantes/cartas-de-presentacion/$requestCode',
  })
  const { data: presentationCardRequestDetail } = useSuspenseQuery({
    queryKey: [
      QueryKeys.presentationCards.PRESENTATION_LETTERS_REQUESTS,
      requestCode,
    ],
    queryFn: () =>
      PresentationCardService.getPresentationCardDetail(+requestCode),
  })

  const presentationCard = presentationCardRequestDetail

  const handleUpdateCardState = async (cardId: number, state: string) => {
    try {
      await PresentationCardService.AproveOrDenegateCard(cardId, state)
    } catch (error) {
      console.error('Error Updating Card:', error)
    }
  }

  return (
    <div className="flex h-full flex-col overflow-y-hidden">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">
          Solicitud Nro. {presentationCard.id}
        </h1>
        <Badge
          variant={
            presentationCard.status === 'accepted'
              ? 'default'
              : presentationCard.status === 'rejected'
                ? 'destructive'
                : 'secondary'
          }
        >
          {mapCoverLetterStatus[presentationCard.status]}
        </Badge>
      </div>
      <Separator />
      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la solicitud</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Nombre de la Empresa</h3>
                <p>{presentationCard.companyName}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Descripcion</h3>
                <p>{presentationCard.detail}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Curso y Horario</h3>
                <p>
                  {presentationCard.scheduleCode} -{' '}
                  {presentationCard.courseName}
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Solicitante(s)</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nombre</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {presentationCard.accounts?.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>{account.code}</TableCell>
                        <TableCell>{`${account.name} ${account.firstSurname} ${account.secondSurname}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {presentationCard.file && (
                <PDFPreview file={URL.createObjectURL(presentationCard.file)} />
              )}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() =>
            handleUpdateCardState(Number(presentationCard.id), 'rejected')
          }
        >
          Rechazar
        </Button>
        <Button
          onClick={() =>
            handleUpdateCardState(Number(presentationCard.id), 'accepted')
          }
        >
          Aprobar
        </Button>
      </div>
    </div>
  )
}
