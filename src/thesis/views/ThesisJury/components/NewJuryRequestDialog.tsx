import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import ThesisJuryRequestService from '@/thesis/services/thesisJuryRequest.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function NuewJuryDialog() {
  const { toast } = useToast()
  const {
    mutate,
    data: thesisDetail,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: ThesisJuryRequestService.getStudentThesis,
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data.studentCode)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nueva solicitud</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva solicitud de jurado de tesis</DialogTitle>
          <DialogDescription>
            Ingrese el código del aplicante con su tema de tesis aprobado para
            comenzar
          </DialogDescription>
        </DialogHeader>
        <section>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-end gap-2"
            >
              <FormField
                name="studentCode"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Código de estudiante</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isPending ? <Loader2 className="animate-spin" /> : 'Buscar'}
              </Button>
            </form>
          </Form>
          <div>
            {isSuccess && (
              <div>
                <Label>Tesis encontrada</Label>
                <Card>
                  <CardHeader>
                    {moment(thesisDetail?.date).format('DD/MM/YYYY')}
                    <CardTitle>{thesisDetail?.applicant?.name}</CardTitle>
                    <CardDescription>{thesisDetail?.title}</CardDescription>
                  </CardHeader>

                  <CardFooter className="flex justify-end">
                    <Link
                      to="/tesis/propuesta-jurados/$requestCode"
                      params={{
                        requestCode: thesisDetail?.code,
                      }}
                    >
                      <Button variant="outline">Continuar</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  studentCode: z
    .string({
      required_error: 'Ingrese un código de estudiante',
    })
    .regex(/^\d{8}$/, 'Ingrese un código de estudiante válido'),
})
