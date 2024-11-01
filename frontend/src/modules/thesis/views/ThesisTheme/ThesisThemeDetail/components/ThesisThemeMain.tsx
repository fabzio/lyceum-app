import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { QueryKeys } from '@/constants/queryKeys'
import ThesisThemeRequestService from '@/modules/thesis/services/ThesisThemeRequest.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ThesisResponseSection from '../../components/ThesisResponseSection'

export default function ThesisThemeMain() {
  const { requestCode } = useParams({
    from: '/_auth/tesis/tema-tesis/$requestCode',
  })
  const { data: thesisThemeRequestDetail } = useSuspenseQuery({
    queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode],
    queryFn: () => ThesisThemeRequestService.getThemeRequestDetail(requestCode),
  })
  return (
    <div className="flex h-full flex-col overflow-y-hidden">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2 h-10 w-full p-2 justify-between">
          <h1 className="text-xl font-bold">
            Solicitud N°: {thesisThemeRequestDetail.code}
          </h1>
          {thesisThemeRequestDetail.aproved && <Badge>Aprobado</Badge>}
        </div>
      </div>
      <Separator />

      <div className="overflow-hidden">
        <ScrollArea className="h-full">
          <div className="mx-6 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {thesisThemeRequestDetail?.title}
              </h2>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Área</h3>
              <p>{thesisThemeRequestDetail?.area}</p>
            </div>
            <Button variant="secondary">
              <Download size={16} />
              Descargar tema de tesis
            </Button>
            <div>
              <h3 className="font-semibold mb-2">Alumnos</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Principal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {thesisThemeRequestDetail?.applicant.code}
                    </TableCell>
                    <TableCell>
                      {thesisThemeRequestDetail?.applicant.name}
                    </TableCell>
                    <TableCell>
                      <Checkbox checked disabled />
                    </TableCell>
                  </TableRow>
                  {thesisThemeRequestDetail?.students.map((student) => (
                    <TableRow key={student.code}>
                      <TableCell>{student.code}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Checkbox checked={student.principal} disabled />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Asesores</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Principal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {thesisThemeRequestDetail?.advisors.map((advisor) => (
                    <TableRow key={advisor.code}>
                      <TableCell>{advisor.code}</TableCell>
                      <TableCell>{`${advisor.name} ${advisor.firstSurname} ${advisor.secondSurname}`}</TableCell>
                      <TableCell>
                        <Checkbox checked={advisor.principal} disabled />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <ThesisResponseSection />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
