import AcademicInformation from './AcademicInformation'
import Personalnformation from './Personalnformation'
import ContactInfomation from './ContactInfomation'
import { FormProvider, useForm } from 'react-hook-form'
import { Professor } from '@frontend/modules/users/interfaces/Professor'
import { useSearch } from '@tanstack/react-router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ProfessorService from '@frontend/modules/users/services/Professor.service'

interface Props {
  refSubmitButtom: React.RefObject<HTMLButtonElement>
  professor: Professor
}
export default function GeneralInfo({ refSubmitButtom, professor }: Props) {
  const { mode } = useSearch({
    from: '/_auth/usuarios/docentes/$code',
  })
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: professor,
    resolver: zodResolver(formSchema),
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (mode === 'edit') {
      // Enviar los datos editados a la API para actualizar el administrativo.
      ProfessorService.updateProfessor(professor.id, data).catch((error) => {
        alert(`Error al actualizar: ${error.message}`)
      })
    }
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={mode === 'view'}
          className="px-2 flex flex-col gap-2"
        >
          <Personalnformation />
          <AcademicInformation />
          <ContactInfomation />
        </fieldset>
        <button hidden={true} type={'submit'} ref={refSubmitButtom} />
      </form>
    </FormProvider>
  )
}

const formSchema = z.object({
  name: z.string(),
  firstSurname: z.string(),
  secondSurname: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  department: z.string().optional(),
  code: z.string().regex(/^\d{8}$/),
})
