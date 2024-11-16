import PageLayout from '@frontend/layouts/PageLayout'
import NewPresentationCardForm from '../PresentationCardDetail/components/PresentationCardForm'

export default function NewCoverLetter() {
  return (
    <PageLayout name="Nueva carta de presentación">
      <div className="mx-5 ">
        <NewPresentationCardForm />
      </div>
    </PageLayout>
  )
}
