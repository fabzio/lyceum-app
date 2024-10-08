import { useState } from 'react'
import { Download } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ThesisThemeRequest } from '@/thesis/Interfaces/ThesisThemeRequest'
import { thesisThemeRequestList } from '../data'
import { Form } from 'react-hook-form'

export default function ThesisthemeRequestForm() {
  const [selectedThesis, setSelectedThesis] =
    useState<ThesisThemeRequest | null>(thesisThemeRequestList[0])
  const [file, setFile] = useState<File | null>(null)

  const handleAdvisorChange = (code: string) => {
    if (selectedThesis) {
      setSelectedThesis({
        ...selectedThesis,
        thesis: {
          ...selectedThesis.thesis,
          advisors: selectedThesis.thesis.advisors.map((advisor) => ({
            ...advisor,
            isPrincipal: advisor.code === code,
          })),
        },
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  return (
    <Form>
      {selectedThesis && (
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {selectedThesis.thesis.title}
              </h2>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Área</h3>
              <p>{selectedThesis.thesis.area}</p>
            </div>
            <Button className="w-full flex items-center justify-center gap-2">
              <Download size={16} />
              Descargar tema de tesis
            </Button>
            <div>
              <h3 className="font-semibold mb-2">Alumnos</h3>
              {selectedThesis.thesis.students.map((student) => (
                <p key={student.code}>
                  {student.code} - {student.name}
                </p>
              ))}
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
                  {selectedThesis.thesis.advisors.map((advisor) => (
                    <TableRow key={advisor.code}>
                      <TableCell>{advisor.code}</TableCell>
                      <TableCell>{advisor.name}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={advisor.isPrincipal}
                          onCheckedChange={() =>
                            handleAdvisorChange(advisor.code)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Respuesta</h3>
              <div className="flex gap-2">
                <Button variant="outline">Aceptar</Button>
                <Button variant="outline">Observar</Button>
              </div>
              <div>
                <Label htmlFor="file-upload">Subir archivo</Label>
                <Input
                  id="file-upload"
                  type="file"
                  className="cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
              {file && (
                <p className="text-sm text-muted-foreground">
                  Archivo seleccionado: {file.name}
                </p>
              )}
              <Button className="w-full">Enviar respuesta</Button>
            </div>
          </div>
        </ScrollArea>
      )}
    </Form>
  )
}
