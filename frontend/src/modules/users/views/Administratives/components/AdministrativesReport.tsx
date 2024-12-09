import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer'
import { Button } from '@frontend/components/ui/button'
import { useFilters } from '@frontend/hooks/useFilters'
import AdministrativeService from '@frontend/modules/users/services/Administrative.service'
import { Administrative } from '@frontend/modules/users/interfaces/Administrative'

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
    flexWrap: 'wrap',
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
    flexGrow: 1,
  },
  tableHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    wordWrap: 'break-word',
    flexGrow: 1,
  },
})

const MyDocument = ({ data }: { data: Administrative[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de Administrativos</Text>
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
        </View>
        {data.map((admin) => (
          <View key={admin.code} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{admin.code}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{admin.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{admin.firstSurname}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{admin.secondSurname}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{admin.email}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
)

const DownloadAdministrativesReport = () => {
  const { filters } = useFilters('/_auth/usuarios/administrativos')

  const handleDownload = async () => {
    try {
      const response = await AdministrativeService.fetchAdministratives(filters)
      const data = response.result
      const blob = await pdf(<MyDocument data={data} />).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'reporte_administrativos.pdf'
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

export default DownloadAdministrativesReport
