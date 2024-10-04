import TransitionPage from '@/components/anim/TransitionPage'
import FAQ from '@/faq'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/preguntas-frecuentes')({
  component: () => <FAQPage />,
})

function FAQPage() {
  return (
    <TransitionPage>
      <FAQ />
    </TransitionPage>
  )
}
