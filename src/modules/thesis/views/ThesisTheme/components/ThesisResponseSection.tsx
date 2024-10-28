import ThesisThemeForm from './ThesisThemeForm'
import { ThesisPermissionsDict } from '@/interfaces/enums/permissions/Thesis'
import Need from '@/components/Need'

export default function ThesisResponseSection() {
  return (
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
  )
}
