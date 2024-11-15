import { Card, CardContent } from '@frontend/components/ui/card'
import { Document, Page, pdfjs } from 'react-pdf'

// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFPreviewProps {
  file: string
}

export default function PDFPreview({ file }: PDFPreviewProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-bold mb-2">Vista previa del documento</h3>
        <div className="border rounded-lg p-4">
          <Document
            file={file}
            error={
              <div>
                Error al cargar el PDF. Por favor, inténtelo de nuevo más tarde.
              </div>
            }
            loading={<div>Cargando PDF...</div>}
          >
            <Page pageNumber={1} />
          </Document>
        </div>
      </CardContent>
    </Card>
  )
}
