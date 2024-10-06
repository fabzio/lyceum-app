import { useState } from 'react'
import { Search, Download} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
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
import ThesisThemeStepper from '@/thesis/components/ThesisThemeStepper'
import {ThesisThemeRequest} from '@/interfaces/Thesis/ThesisThemeRequest'
import {thesisThemeRequestList}  from '../data'

export default function ThesisthemeRequestForm() {
    const [selectedThesis, setSelectedThesis] = useState<ThesisThemeRequest | null>(thesisThemeRequestList[0])
    const [file, setFile] = useState<File | null>(null)
  
    const handleThesisSelect = (thesis: ThesisThemeRequest) => {
      setSelectedThesis(thesis)
    }
  
    const handleAdvisorChange = (code: string) => {
      if (selectedThesis) {
        setSelectedThesis({
          ...selectedThesis,
            thesis: {
              ...selectedThesis.thesis,
              advisors: selectedThesis.thesis.advisors.map((advisor) => ({
            ...advisor,
            isPrincipal: advisor.code === code,
          }))},
        })
      }
    }
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0])
      }
    }
  
    return (
      <ResizablePanelGroup direction="horizontal" className="h-full max-h-[800px] items-stretch">
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-xl font-bold">Temas de tesis</h2>
            </div>
            <Separator />
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar" className="pl-8" />
              </div>
            </div>
            <ScrollArea className="flex-1">
              {thesisThemeRequestList.map((thesisThemeRequest) => (
                <div
                  key={thesisThemeRequest.id}
                  className="p-4 cursor-pointer hover:bg-muted"
                  onClick={() => handleThesisSelect(thesisThemeRequest)}
                >
                  <h3 className="font-semibold">{thesisThemeRequest.thesis.title}</h3>
                  <p className="text-sm text-muted-foreground">{thesisThemeRequest.thesis.area}</p>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {thesisThemeRequest.status}
                  </Badge>
                </div>
              ))}
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          {selectedThesis && (
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedThesis.thesis.title}</h2>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {selectedThesis.status}
                  </Badge>
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
                              onCheckedChange={() => handleAdvisorChange(advisor.code)}
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
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25} minSize={20}>
          {selectedThesis && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Información de Ficha</h3>
                <p>Solcitante: {selectedThesis.requester}</p>
                <p>Concentración: {selectedThesis.thesis.concentration}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Historial</h3>
                <ThesisThemeStepper history={selectedThesis.approvalHistory} />
              </div>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }