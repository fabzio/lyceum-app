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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@frontend/components/ui/hover-card'
import { Input } from '@frontend/components/ui/input'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import { getCsvData } from '@frontend/lib/utils'
import { Student } from '@frontend/modules/users/interfaces/Student'
import StudentService from '@frontend/modules/users/services/Student.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Info, Loader2, Upload } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function MasiveStudentsDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { mutate, isPending } = useMutation({
    mutationFn: StudentService.addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.users.STUDENTS],
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
        Student,
        | 'code'
        | 'name'
        | 'firstSurname'
        | 'secondSurname'
        | 'email'
        | 'speciality'
      >
    >(data.file)
    const dataParsed = dataJson.map((student) => ({
      ...student,
      code: student.code.toString(),
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
          <DialogTitle>Importar estudiantes desde archivo</DialogTitle>
          <DialogDescription>
            Sube un archivo CSV con los estudiantes que desea importar
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="file"
              // eslint-disable-next-line
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
                      code | name | firstSurname | secondSurname | email |
                      speciality
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
  file: z.instanceof(File, { message: 'Debe seleccionar un archivo' }),
})
