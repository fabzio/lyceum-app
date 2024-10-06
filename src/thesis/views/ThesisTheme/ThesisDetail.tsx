import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Download, ChevronDown, ChevronUp } from 'lucide-react'
import ThesisThemeStepper from '@/thesis/components/ThesisThemeStepper'

interface Thesis {
  id: string
  title: string
  area: string
  students: { code: string; name: string }[]
  advisors: { code: string; name: string; isPrincipal: boolean }[]
  status: 'approved' | 'pending'
  fileInfo: {
    requestNumber: string
    name: string
    concentration: string
  }
  approvalHistory: {
    step: string
    status: 'completed' | 'current' | 'pending'
    name: string
    canDownload?: boolean
  }[]
}

const mockThesis: Thesis = {
  id: '39457392',
  title:
    'Desarrollo de un Sistema de Gestión de Proyectos Basado en Metodologías Ágiles para Mejorar la Productividad en Equipos de Trabajo Remotos',
  area: 'Sistemas de Información',
  students: [
    { code: '00089434', name: 'Rony Tupia' },
    { code: '19872992', name: 'Víctor Bello' },
  ],
  advisors: [
    { code: '00089434', name: 'Rony Tupia', isPrincipal: true },
    { code: '19872992', name: 'Víctor Bello', isPrincipal: false },
  ],
  status: 'approved',
  fileInfo: {
    requestNumber: '39457392',
    name: 'Piero Montoya',
    concentration: 'Ingeniería de Software',
  },
  approvalHistory: [
    { step: 'Enviado por alumno', status: 'completed', name: 'Piero Montoya' },
    {
      step: 'Aprobado por Asesor',
      status: 'completed',
      name: 'Rony Tupia',
      canDownload: true,
    },
    {
      step: 'Aprobado por Coordinador de Área',
      status: 'completed',
      name: 'Jheyfer Ramírez',
      canDownload: true,
    },
    {
      step: 'Aprobado por Director de Carrera',
      status: 'current',
      name: 'Ricardo Bartra',
    },
  ],
}

export default function ThesisManagement() {
  const [thesis, setThesis] = useState<Thesis>(mockThesis)
  const [file, setFile] = useState<File | null>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const handleAdvisorChange = (code: string) => {
    setThesis((prevThesis) => ({
      ...prevThesis,
      advisors: prevThesis.advisors.map((advisor) => ({
        ...advisor,
        isPrincipal: advisor.code === code,
      })),
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  const renderCard = (
    index: number,
    title: string,
    content: React.ReactNode
  ) => (
    <Card className="mb-4 lg:mb-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => toggleCard(index)}
        >
          {expandedCard === index ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </Button>
      </CardHeader>
      <CardContent
        className={`lg:block ${expandedCard === index ? 'block' : 'hidden'}`}
      >
        {content}
      </CardContent>
    </Card>
  )

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Tesis</h1>
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        {renderCard(
          0,
          'Estado de tesis',
          <>
            <div className="flex items-center justify-between mb-2">
              <span>Estado de tesis</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                Aprobado por coordinador de área
              </Badge>
            </div>
            <h2 className="font-semibold mb-2">{thesis.title}</h2>
            <p className="text-sm text-gray-500 mb-4">
              Análisis de vulnerabilidades comunes en contratos inteligentes y
              estrategias para mejorar la seguridad en su implementación y
              ejecución.
            </p>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              Aprobado por coordinador de área
            </Badge>
          </>
        )}

        {renderCard(
          1,
          'Información básica',
          <ScrollArea className="h-[60vh] lg:h-[calc(100vh-200px)]">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Título</h3>
                <p className="text-sm">{thesis.title}</p>
              </div>
              <div>
                <h3 className="font-semibold">Área</h3>
                <p className="text-sm">{thesis.area}</p>
              </div>
              <Button className="w-full flex items-center justify-center gap-2">
                <Download size={16} />
                Descargar tema de tesis
              </Button>
              <div>
                <h3 className="font-semibold">Alumnos</h3>
                {thesis.students.map((student) => (
                  <p key={student.code} className="text-sm">
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
                    {thesis.advisors.map((advisor) => (
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
              <div className="space-y-2">
                <p className="font-semibold">Respuesta</p>
                <div className="flex gap-2">
                  <Button variant="outline">Aceptar</Button>
                  <Button variant="outline">Observar</Button>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="file-upload">Subir archivo</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    className="cursor-pointer"
                    onChange={handleFileChange}
                  />
                </div>
                {file && (
                  <p className="text-sm text-gray-500">
                    Archivo seleccionado: {file.name}
                  </p>
                )}
                <Button className="w-full">Enviar respuesta</Button>
              </div>
            </div>
          </ScrollArea>
        )}

        {renderCard(
          2,
          'Información de Ficha',
          <div className="space-y-4">
            <div>
              <p className="text-sm">
                <span className="font-semibold">N° Solicitud:</span>{' '}
                {thesis.fileInfo.requestNumber}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Nombre:</span>{' '}
                {thesis.fileInfo.name}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Concentración:</span>{' '}
                {thesis.fileInfo.concentration}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Historial</h3>
              <div className="space-y-4 ">
                <ThesisThemeStepper history={thesis.approvalHistory} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
