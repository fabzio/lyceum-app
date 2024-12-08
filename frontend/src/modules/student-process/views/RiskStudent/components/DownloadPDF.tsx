import { RiskStudentGeneral } from '@frontend/modules/student-process/interfaces/RIskStudentGeneral'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer'
import { Button } from '@frontend/components/ui/button'
import RiskStudentService from '@frontend/modules/student-process/services/riskStudent.service'
import { useSessionStore } from '@frontend/store'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import { useFilters } from '@frontend/hooks/useFilters'

const MAX_PAGE_SIZE_FOR_PDF = 10000

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  studentContainer: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dfe6e9',
    borderBottomStyle: 'solid',
  },
  field: {
    fontSize: 12,
    color: '#34495e',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    color: '#2c3e50',
    marginBottom: 5,
  },
})

const MyDocument = ({ data }: { data: RiskStudentGeneral[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de Alumnos en Riesgo</Text>
      {data.map((student) => (
        <View key={student.student.code} style={styles.studentContainer}>
          <Text style={styles.field}>Código:</Text>
          <Text style={styles.value}>{student.student.code}</Text>

          <Text style={styles.field}>Nombres:</Text>
          <Text style={styles.value}>
            {student.student.name} {student.student.surname}
          </Text>

          <Text style={styles.field}>Curso:</Text>
          <Text style={styles.value}>{student.course.name}</Text>

          <Text style={styles.field}>Motivo:</Text>
          <Text style={styles.value}>{student.reason}</Text>

          <Text style={styles.field}>Puntuación:</Text>
          <Text style={styles.value}>{student.score ?? 'N/A'}</Text>

          <Text style={styles.field}>Estado:</Text>
          <Text style={styles.value}>
            {student.state
              ? 'Solicitud de reporte actualizado'
              : 'Reporte solicitado'}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
)

export default function DownloadPDF() {
  const { session, getRoleWithPermission } = useSessionStore()
  const { filters } = useFilters(
    '/_auth/procesos-de-estudiantes/alumnos-riesgo'
  )

  const role = getRoleWithPermission(
    StudentProcessPermissionsDict.LOAD_RISK_STUDENTS
  )

  const handleDownload = async () => {
    // Obtener los datos
    const exportFilters = {
      ...filters,
      pageIndex: 0,
      pageSize: MAX_PAGE_SIZE_FOR_PDF,
    }

    const data = role?.unitId
      ? await RiskStudentService.getRiskStudentsOfSpeciality({
          ...exportFilters,
          specialityId: role.unitId,
        })
      : await RiskStudentService.getRiskStudentsOfProfessor({
          ...exportFilters,
          professorId: session!.id,
        })

    // Generar el PDF
    const blob = await pdf(<MyDocument data={data.result || []} />).toBlob()

    // Descargar el archivo
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'reporte-alumnos-riesgo.pdf'
    link.click()

    // Limpiar el objeto URL
    URL.revokeObjectURL(url)
  }

  return <Button onClick={handleDownload}>Descargar Reporte PDF</Button>
}
