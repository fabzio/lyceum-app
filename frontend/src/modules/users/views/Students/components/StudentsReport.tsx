import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer'
import { Button } from '@frontend/components/ui/button'
import { Student } from '@frontend/modules/users/interfaces/Student'
import StudentService from '@frontend/modules/users/services/Student.service'
import { useFilters } from '@frontend/hooks/useFilters'

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
    display: 'flex',
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
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
    margin: 1,
    wordWrap: 'break-word',
  },
  tableHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    wordWrap: 'break-word',
  },
})

const MyDocument = ({ data }: { data: Student[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de Estudiantes</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Código</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Nombre</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>1er Apellido</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>2do Apellido</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Correo</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Especialidad</Text>
          </View>
        </View>
        {data.map((student) => (
          <View key={student.code} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.code}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.firstSurname}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.secondSurname}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.email}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.speciality}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
)

const DownloadStudentsReport = () => {
  const { filters } = useFilters('/_auth/usuarios/estudiantes')

  const handleDownload = async () => {
    try {
      const response = await StudentService.fetchStudents(filters)
      const data = response.result
      const blob = await pdf(<MyDocument data={data} />).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'reporte_estudiantes.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al descargar el reporte:', error)
    }
  }

  return (
    <Button variant="secondary" onClick={handleDownload}>
      Descargar Reporte PDF
    </Button>
  )
}

export default DownloadStudentsReport
