import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { getCsvData } from '@/lib/utils'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Upload } from 'lucide-react'
import RiskStudentService from '@/modules/student-process/services/riskStudent.service'
import { QueryKeys } from '@/constants/queryKeys'

const csvSchema = z.object({
  alumno: z
    .string({})
    .trim()
    .regex(/^[0-9]{8}$/, 'El código del estudiante debe tener 8 dígitos'),
  curso: z.string().trim(),
  horario: z.string(),
  motivo: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  puntaje: z
    .preprocess((val) => parseFloat(val as string), z.number())
    .refine((val) => val >= 1 && val <= 5, {
      message: 'El puntaje debe ser un número entre 1 y 5',
    }),
})
type CSVRow = z.infer<typeof csvSchema>

export default function UploadCSVDialog() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [registers, setRegisters] = useState<CSVRow[]>([])
  const [error, setError] = useState<string | null>(null)

  const { mutate } = useMutation({
    mutationFn: RiskStudentService.insertRiskStudentReport,
    onSuccess: () => {
      setRegisters([])
      setError(null)
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.courses.RISK_STUDENTS],
      })
      setIsOpen(false)
    },
  })
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null)
    const file = event.target.files?.[0]
    if (file) {
      try {
        const listStudents = await getCsvData<CSVRow>(file)
        listStudents.forEach((student) => {
          const { data, error } = csvSchema.safeParse(student)
          if (error) {
            throw new Error(error.errors[0].message)
          }
          setRegisters((prev) => [...prev, data])
        })
      } catch (e) {
        setError((e as Error).message)
      }
    }
  }

  const onSubmit = () => {
    if (registers.length > 0) {
      mutate(
        registers.map((register) => ({
          courseCode: register.curso,
          studentCode: register.alumno,
          scheduleCode: register.horario,
          reasonId: register.motivo,
          score: register.puntaje,
        }))
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Carga masiva
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cargar listado de estudiantes en riesgo</DialogTitle>
          <DialogDescription>
            Selecciona un archivo CSV para cargar el listado de estudiantes en
            riesgo.
          </DialogDescription>
        </DialogHeader>
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
        <DialogDescription className="flex flex-col">
          <span>
            {registers.length > 0
              ? `Se cargaron correctamente ${registers.length} registros.`
              : null}
          </span>
          <span>
            {error ? <span className="text-red-500">{error}</span> : null}
          </span>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={onSubmit} disabled={!registers.length}>
            Subir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
