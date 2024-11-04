import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@frontend/components/ui/card'
import NewEnrollmentPropose from './components/NewEnrollmentPropose'
//import AproveEnrollmentButton from './components/AproveEnrollmentProposalButton'
export default function EnrollmentPropose() {
  return (
    <div className="flex justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="m-auto w-1/2 text-center">
            Todavía no se ha iniciado el proceso de evaluación de horarios para
            el ciclo 2025-1
          </CardTitle>
        </CardHeader>
        <CardFooter className="justify-center">
          <NewEnrollmentPropose />
        </CardFooter>
      </Card>

      <div>{/*<AproveEnrollmentButton></AproveEnrollmentButton>*/}</div>
    </div>
  )
}
