import ThesisThemeForm from '../ThesisThemeDetail/components/ThesisThemeForm'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import Need from '@frontend/components/Need'
import ThesisUploadCorrections from '../ThesisThemeDetail/components/ThesisUploadCorrections'

export default function ThesisResponseSection() {
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
