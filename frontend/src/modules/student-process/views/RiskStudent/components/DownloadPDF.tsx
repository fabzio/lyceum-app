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
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  tableHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
})

const MyDocument = ({ data }: { data: RiskStudentGeneral[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de Alumnos en Riesgo</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Código</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Nombres</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Curso</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Motivo</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Puntuación</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Estado</Text>
          </View>
        </View>
        {data.map((student) => (
          <View key={student.student.code} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.student.code}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {student.student.name} {student.student.surname}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.course.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.reason}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.score ?? 'N/A'}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {student.state
                  ? 'Solicitud de reporte actualizado'
                  : 'Reporte solicitado'}
              </Text>
            </View>
          </View>
        ))}
      </View>
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
