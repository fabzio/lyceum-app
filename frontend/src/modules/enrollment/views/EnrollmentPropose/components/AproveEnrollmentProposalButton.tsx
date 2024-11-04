import { Button } from '@frontend/components/ui/button' // Asegúrate de importar el botón correcto de ShadCN
import EnrollmentProposalService from '@frontend/modules/enrollment/services/EnrollmentProposal.service'

const AproveEnrollmentButton = () => {
  const handleButtonClick = async () => {
    try {
      await EnrollmentProposalService.updateScheduleProposalStatus(
        '1', // Reemplaza con el ID del horario // RECORDAR CAMBIAR ESTA HARCODEADA, FUE PA PROBAR NOMA
        'aproved' // Reemplaza con el nuevo estado //recuerden que existe un orden de aprobacion, no acepta que se saltee de uno a otro
      )
      console.log('El estado de la propuesta de horario se actualizó con éxito')
    } catch (error) {
      console.error(
        'Error al actualizar el estado de la propuesta de horario:',
        error
      )
    }
  }

  return <Button onClick={handleButtonClick}>Aprobar Propuesta</Button>
}

export default AproveEnrollmentButton
