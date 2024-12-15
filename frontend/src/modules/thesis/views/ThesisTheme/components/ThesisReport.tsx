import { ThesisThemeRequest } from '@frontend/modules/thesis/interfaces/ThesisThemeRequest'
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
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import Need from '@frontend/components/Need'
import ThesisThemeRequestService from '@frontend/modules/thesis/services/ThesisThemeRequest.service'

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

const MyDocument = ({ data }: { data: ThesisThemeRequest[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de Temas de Tesis</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Código</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Título</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Autor</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Último Estado</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Última Actualización</Text>
          </View>
        </View>
        {data.map((thesis) => (
          <View key={thesis.code} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{thesis.code}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{thesis.title}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{thesis.applicant.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{thesis.lastAction.action}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{thesis.lastAction.role}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
)

export default function DownloadThesisReport({
  filter,
}: {
  filter: { filter: string | undefined }
}) {
  const { session, getRoleWithPermission, havePermission } = useSessionStore()

  const specialtiyId = getRoleWithPermission(
    ThesisPermissionsDict.APROVE_THESIS_PHASE_3
  )?.unitId
  const areaId = getRoleWithPermission(
    ThesisPermissionsDict.APROVE_THESIS_PHASE_2
  )?.unitId
  const accountCode = session!.code
  const HandleDownload = async () => {
    try {
      const data = await (specialtiyId
        ? ThesisThemeRequestService.getSpecialtyThesisThemeRequest({
            specialtiyId,
            ...filter,
          })
        : areaId
          ? ThesisThemeRequestService.getAreaThesisThemeRequest({
              areaId: areaId,
            })
          : havePermission(ThesisPermissionsDict.APROVE_THESIS_PHASE_1)
            ? ThesisThemeRequestService.getAdvisorThesisThemeRequest({
                advisorCode: accountCode,
              })
            : ThesisThemeRequestService.getStudentThesisThemeRequest({
                studentCode: accountCode,
              }))
      const blob = await pdf(<MyDocument data={data} />).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'reporte_temas_tesis.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al descargar el reporte:', error)
    }
  }

  return (
    <Need permissions={[ThesisPermissionsDict.DOWNLOAD_THESIS_REPORT]}>
      <Button variant="ghost" onClick={HandleDownload}>
        Descargar Reporte PDF
      </Button>
    </Need>
  )
}
