import { Download } from 'lucide-react'
import { Button } from './ui/button'

interface Props {
  headers: string[]
}

export default function DownloadTemplate({ headers }: Props) {
  const downloadTemplate = () => {
    const csvContent = `${headers.join(',')}\n` // Encabezados del CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'plantilla_cursos.csv'
    link.click()
  }

  return (
    <Button variant="outline" onClick={downloadTemplate}>
      <Download className="mr-2 h-4 w-4" /> Descargar plantilla
    </Button>
  )
}
