import TransitionPage from '@frontend/components/anim/TransitionPage'
import FAQ from '@frontend/modules/faq'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/preguntas-frecuentes')({
  component: () => <FAQPage />,
})

function FAQPage() {
  return (
    <TransitionPage>
      <FAQ />
    </TransitionPage>
  )
}
