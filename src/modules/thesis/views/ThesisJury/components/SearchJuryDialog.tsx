import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { QueryKeys } from '@/constants/queryKeys'
import ThesisJuryRequestService from '@/modules/thesis/services/thesisJuryRequest.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Loader2, PlusIcon, X } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function SearchJuryDialog() {
  const queryClient = useQueryClient()
  const { requestCode } = useParams({
    from: '/tesis/propuesta-jurados/$requestCode',
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const [isOpen, setIsOpen] = useState(false)
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'jurors',
    rules: {
      maxLength: {
        value: 3,
        message: 'Máximo 3 jurados',
      },
    },
  })
  const { mutate, isPending } = useMutation({
    mutationFn: ThesisJuryRequestService.insertThesisJuries,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.thesis.THESIS_JURIES],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.thesis.THESIS_REQUESTS],
      })
      setIsOpen(false)
    },
  })

  const onSubmit = ({ jurors }: z.infer<typeof formSchema>) => {
    const codes = jurors.map((juror) => juror.code)
    mutate({
      codeList: codes,
      thesisCode: requestCode,
    })
  }

  const getJuryName = (code: string) => {
    const juror = mockProfessors.find((prof) => prof.code === code)
    return juror ? juror.name : 'Jurado no encontrado'
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Asignar Jurados</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar Jurados</DialogTitle>
          <DialogDescription>
            Ingresa los códigos de los jurados que participarán en la
            sustentación de la tesis
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              name="jurors"
              render={() => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Lista de jurados</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        append({
                          code: '',
                        })
                      }
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {fields.map((field, index) => (
                      <li key={field.id} className="flex gap-1 items-center">
                        <Input
                          {...form.register(`jurors.${index}.code`)}
                          placeholder="Código"
                          className="w-1/3"
                        />
                        <Input
                          value={getJuryName(
                            form.watch(`jurors.${index}.code`)
                          )}
                          readOnly
                          placeholder="Nombre del jurado"
                          className="w-2/3"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => remove(index)}
                        >
                          <X />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : 'Asignar'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  jurors: z
    .array(
      z.object({
        code: z.string().regex(/^[0-9]{8}$/, 'Código de jurado inválido'),
      })
    )
    .nonempty('Debes ingresar al menos un jurado'),
})

const mockProfessors = [
  {
    id: '19211f01-4d69-4d99-a424-a5134e63138f',
    code: '43831099',
    name: 'Deion Bosque Nolan',
  },
  {
    id: '798e4ad4-7543-4dbc-aaee-68f647f182e8',
    code: '05602940',
    name: 'Karen Dare Robel',
  },
  {
    id: '4d333558-179d-4c5a-b072-93b3194d79c4',
    code: '82602285',
    name: 'Sallie Crona Oberbrunner',
  },
]
