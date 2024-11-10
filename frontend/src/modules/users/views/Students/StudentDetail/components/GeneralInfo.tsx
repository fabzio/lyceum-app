import { Student } from '@frontend/modules/users/interfaces/Student'
import AcademicInformation from './AcademicInformation'
import ContacInformation from './ContactInformation'
import PersonalInformation from './PersonalInformation'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearch } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface Props {
  student: Student
  refSubmitButtom: React.RefObject<HTMLButtonElement>
}

export default function GeneralInfo({ student, refSubmitButtom }: Props) {
  const { mode } = useSearch({
    from: '/_auth/usuarios/estudiantes/$code',
  })
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: student,
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          disabled={mode === 'view'}
          className="px-2 flex flex-col gap-2"
        >
          <PersonalInformation />
          <AcademicInformation />
          <ContacInformation />
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
  speciality: z.string(),
  code: z.string().regex(/^\d{8}$/),
})
