import ThesisThemeForm from '../ThesisThemeDetail/components/ThesisThemeForm'
import { ThesisPermissionsDict } from '@/interfaces/enums/permissions/Thesis'
import Need from '@/components/Need'
import ThesisUploadCorrections from '../ThesisThemeDetail/components/ThesisUploadCorrections'
import { useSessionStore } from '@/store'

export default function ThesisResponseSection() {
  const { havePermission } = useSessionStore()
  console.log(
    'havePermission',
    havePermission(ThesisPermissionsDict.APROVE_THESIS_PHASE_1)
  )
  return (
    <>
      <Need
        some
        permissions={[
          ThesisPermissionsDict.APROVE_THESIS_PHASE_1,
          ThesisPermissionsDict.APROVE_THESIS_PHASE_2,
          ThesisPermissionsDict.APROVE_THESIS_PHASE_3,
        ]}
      >
        <ThesisThemeForm />
      </Need>
      <Need permissions={ThesisPermissionsDict.CREATE_THESIS}>
        <ThesisUploadCorrections />
      </Need>
    </>
  )
}
