import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Input } from '@frontend/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Download, Info, Loader2, Upload } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import UnitService from '../services/Unit.service'
import { getCsvData } from '@frontend/lib/utils'
import { UnitType } from '@frontend/interfaces/enums'
import { mapUnitType } from '@frontend/lib/mapUnitType'
import { useToast } from '@frontend/hooks/use-toast'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@frontend/components/ui/hover-card'
import { useState } from 'react'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useFilters } from '@frontend/hooks/useFilters'

interface Props {
  unitType: UnitType
}
export default function MasiveUnitsDialog({ unitType }: Props) {
  const { filters } = useFilters('/_auth/unidades')
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const { mutate, isPending } = useMutation({
    mutationFn: UnitService.createUnits,
    onError: ({ message }) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: message,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Carga correcta',
        description: 'Unidades importadas correctamente',
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.unit.UNITS, unitType, filters],
      })
      setIsOpen(false)
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  function downloadTemplate() {
    const csvContent = `Unidad,Unidad superior\n` // Encabezados del CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'plantilla_unidades.csv'
    link.click()
  }
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const jsonData = await getCsvData<CSVRow>(data.file)
      const parseData = jsonData.map((unit) => csvSchema.parse(unit))
      mutate(
        parseData.map((unit) => ({
          name: unit['Unidad'],
          unitType,
          parentName: unit['Unidad superior'],
        }))
      )
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: (error as Error).message,
      })
      return
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Upload className="mr-2 w-4" /> Cargar archivo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Cargar {mapUnitType[unitType].toLowerCase()} por archivo
          </DialogTitle>
          <DialogDescription>
            Cargue un archivo CSV con las unidades a registrar
          </DialogDescription>
        </DialogHeader>
        <Button onClick={downloadTemplate} variant="outline">
          <Download className="mr-2 h-4 w-4" /> Descargar plantilla
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="file"
              render={({ field: { value, onChange, ...filedProps } }) => (
                <FormItem>
                  <HoverCard openDelay={100}>
                    <HoverCardTrigger>
                      <FormLabel className="inline-block hover:underline w-auto">
                        <div className="flex">
                          Archivo <Info className="h-4" />
                        </div>
                      </FormLabel>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      Unidad | Unidad superior
                    </HoverCardContent>
                  </HoverCard>
                  <FormControl>
                    <Input
                      {...filedProps}
                      type="file"
                      accept=".csv"
                      onChange={(e) =>
                        onChange(e.target.files && e.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-2">
              <DialogClose>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Importar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  file: z.instanceof(File),
})

const csvSchema = z.object({
  ['Unidad']: z.string().min(1).max(100),
  ['Unidad superior']: z.string().min(1).max(100),
})

type CSVRow = z.infer<typeof csvSchema>
