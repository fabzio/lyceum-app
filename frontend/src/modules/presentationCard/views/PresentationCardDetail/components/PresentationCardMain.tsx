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
import PresentationCardService from '@frontend/modules/presentationCard/services/presentationCard.service'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/components/ui/card'
import PDFPreview from './PDFPreview'

export default function PresentationCardMain() {
  const { requestCode } = useParams({
    from: '/_auth/carta-de-presentacion/carta/$requestCode',
  })
  const { data: presentationCardRequestDetail } = useSuspenseQuery({
    queryKey: [
      QueryKeys.presentationCards.PRESENTATION_LETTERS_REQUESTS,
      requestCode,
    ],
    queryFn: () =>
      PresentationCardService.getPresentationCardRequests({
        accountCode: requestCode,
      }),
  })

  const presentationCard = presentationCardRequestDetail[1]?.presentationCard

  return (
    <div className="flex h-full flex-col overflow-y-hidden">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">
          Solicitud Nro. {presentationCard.id}
        </h1>
        <Badge
          variant={
            presentationCardRequestDetail[0].status === 'approved'
              ? 'default'
              : 'secondary'
          }
        >
          {presentationCardRequestDetail[0].status === 'approved'
            ? 'Aprobado'
            : 'Pendiente'}
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
                <p>{presentationCard.entityName}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Descripcion</h3>
                <p>{presentationCard.description}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Curso y Horario</h3>
                <p>
                  {presentationCard.courseName} -{' '}
                  {presentationCard.scheduleCode}
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
                    {presentationCard.accountIds?.map((account) => (
                      <TableRow key={account}>
                        <TableCell>{account}</TableCell>
                        <TableCell>{account}</TableCell>
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
    </div>
  )
}
