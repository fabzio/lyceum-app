import PageLayout from '@frontend/layouts/PageLayout'
import SurveyForm from './components/SurveyForm'

export default function NewSurvey() {
  return (
    <PageLayout name="Nueva encuesta">
      <div className="w-4/5 mx-auto">
        <SurveyForm />
      </div>
    </PageLayout>
  )
}
