import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { QueryKeys } from '@/constants/queryKeys'
import { useToast } from '@/hooks/use-toast'
import { getCsvData } from '@/lib/utils'
import { Administrative } from '@/modules/users/interfaces/Administrative'
import AdministrativeService from '@/modules/users/services/Administrative.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2, Upload } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function MasiveAdminsitrativeDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { mutate, isPending } = useMutation({
    mutationFn: AdministrativeService.addAdministrative,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.users.ADMINISTRATIVES],
      })
      setIsOpen(false)
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: message,
      })
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const dataJson = await getCsvData<
      Pick<
        Administrative,
        'code' | 'name' | 'firstSurname' | 'secondSurname' | 'email'
      >
    >(data.file)
    const dataParsed = dataJson.map((administrative) => ({
      ...administrative,
      code: administrative.code.toString(),
    }))

    mutate(dataParsed)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Upload className="mr-2 h-4 w-4" /> Carga masiva
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Importar personal administrativo desde archivo
          </DialogTitle>
          <DialogDescription>
            Suba un archivo CSV con los datos del personal administrativo que
            desea importar
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="file"
              render={({ field: { value, onChange, ...filedProps } }) => (
                <FormItem>
                  <FormLabel>Archivo</FormLabel>
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
  file: z.instanceof(File, { message: 'Debe seleccionar un archivo' }),
})
