import TransitionPage from '@frontend/components/anim/TransitionPage'
import { toastNotAutorized } from '@frontend/constants/errorMessages'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { FAQPermissionsDict } from '@frontend/interfaces/enums/permissions/FAQ'
import { haveSomePermission } from '@frontend/lib/utils'
import FAQ from '@frontend/modules/faq'
import FAQService from '@frontend/modules/faq/services/faq.service'

import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/preguntas-frecuentes')({
  beforeLoad: ({ context: { sessionStore, toaster } }) => {
    const { toast } = toaster
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        FAQPermissionsDict.READ_FAQ,
        FAQPermissionsDict.MAGANE_FAQ,
        FAQPermissionsDict.SUGGEST_FAQ,
      ])
    ) {
      toast(toastNotAutorized)
      throw redirect({
        to: '/',
      })
    }
  },
  loader: async ({ context: { queryClient, sessionStore } }) => {
    const { getRoleWithPermission } = sessionStore
    const unitId = getRoleWithPermission(FAQPermissionsDict.READ_FAQ)!.unitId
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.faq.FAQS],
      queryFn: () => FAQService.getFAQs({ unitId }),
    })
  },
  component: () => <FAQPage />,
})

function FAQPage() {
  return (
    <TransitionPage>
      <FAQ />
    </TransitionPage>
  )
}
