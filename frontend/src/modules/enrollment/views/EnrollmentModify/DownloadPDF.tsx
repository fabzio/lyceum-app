import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer'
import { Button } from '@frontend/components/ui/button'
import { useSessionStore } from '@frontend/store'
import { useFilters } from '@frontend/hooks/useFilters'
import EnrollmentService from '../../services/enrollment.service'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import { EnrollmentGeneral } from '../../interfaces/EnrollmentGeneral'

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

const MyDocument = ({ data }: { data: EnrollmentGeneral[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de Modificaciones de Matrícula</Text>
      <View style={styles.table}>
        {/* Cabecera de la tabla */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Nro. Solicitud</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Nombre</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Curso</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Motivo</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Tipo de Solicitud</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Estado</Text>
          </View>
        </View>

        {/* Filas con datos */}
        {data.map((enrollment) => (
          <View key={enrollment.student.code} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{enrollment.requestNumber}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{enrollment.student.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {enrollment.schedule.courseName}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{enrollment.reason}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {mapRequestType[enrollment.requestType]}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{mapState[enrollment.state]}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
)

const mapRequestType = {
  aditional: 'Matrícula adicional',
  withdrawal: 'Retiro de matrícula',
}

const mapState = {
  approved: 'Aprobado',
  denied: 'Denegado',
  requested: 'Solicitado',
}

export default function DownloadPDF() {
  const { getRoleWithPermission } = useSessionStore()
  const { filters } = useFilters('/_auth/matricula/modificacion-matricula')

  const handleDownload = async () => {
    // Obtener los datos
    const exportFilters = {
      ...filters,
      pageIndex: 0,
      pageSize: MAX_PAGE_SIZE_FOR_PDF,
    }

    const data = await EnrollmentService.getAllEnrollmentsOfSpeciality({
      filtersAndPagination: exportFilters,
      specialityId: getRoleWithPermission(
        EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT
      )!.unitId,
    })
    // Generar el PDF
    const blob = await pdf(<MyDocument data={data.result || []} />).toBlob()

    // Descargar el archivo
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'reporte-modificacion-matricula.pdf'
    link.click()

    // Limpiar el objeto URL
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="ghost" onClick={handleDownload}>
      Descargar Reporte PDF
    </Button>
  )
}
