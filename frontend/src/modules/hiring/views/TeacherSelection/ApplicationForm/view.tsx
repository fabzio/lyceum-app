import PageLayout from '@frontend/layouts/PageLayout'
import { useSearch } from '@tanstack/react-router'
import { Loader2, FileText, Download } from 'lucide-react'
import { QueryKeys } from '@frontend/constants/queryKeys'
import HiringService from '@frontend/modules/hiring/Services/Hirings.service'
import { useSessionStore } from '@frontend/store'
import { Button } from '@frontend/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/components/ui/card'
import { useToast } from '@frontend/hooks/use-toast'
import { useQuery, useMutation } from '@tanstack/react-query'
import { RequirementEvaluationList } from './RequirementEvaluationList'

export default function ApplicationView() {
  const { courseName, courseId, jobRequestId, hiringId, hiringProcessId } =
    useSearch({
      from: '/_auth/contrataciones/seleccion-docentes/revision',
    })

  const { session } = useSessionStore()
  const { toast } = useToast()

  const { data: application, isLoading: isLoadingApplication } = useQuery({
    queryKey: [QueryKeys.hiring.HIRINGS, hiringProcessId, session?.id],
    queryFn: () =>
      HiringService.getJobRequest(
        jobRequestId,
        hiringProcessId,
        String(session?.id)
      ),
  })

  const { data: requirements, isLoading: isLoadingRequirements } = useQuery({
    queryKey: [QueryKeys.hiring.HIRINGS, courseName],
    queryFn: () => HiringService.getRequirements(+hiringId, courseId),
  })

  const downloadMutation = useMutation({
    mutationFn: () => {
      return HiringService.getRequieredDocuments(String(application?.jrUrl))
    },
    onSuccess: ({ file, type }) => {
      const extension = type.split('/')[1]
      const url = window.URL.createObjectURL(new Blob([file]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `${application?.candidateName}-${application?.candidateLastname}.${extension}`
      )
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const onDownload = () => {
    downloadMutation.mutate()
  }

  if (isLoadingApplication || isLoadingRequirements) {
    return (
      <PageLayout name="Postulación">
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout name="Postulación">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">
          Aplicación para {courseName}
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Información del Candidato</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Nombre:</strong> {application?.candidateName}{' '}
              {application?.candidateLastname}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Requisitos del Puesto</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {requirements?.map((req, index) => (
                <li key={index}>{req.detail}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tu Motivación</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">
              {application?.jrMotivation || 'No se proporcionó motivación.'}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Documentos Subidos</CardTitle>
          </CardHeader>
          <CardContent>
            {application?.jrUrl ? (
              <div className="flex items-center">
                <FileText className="mr-2" />
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4"
                  onClick={onDownload}
                >
                  <Download className="mr-2 h-4 w-4" /> Descargar
                </Button>
              </div>
            ) : (
              <p>No se han subido documentos.</p>
            )}
          </CardContent>
        </Card>

        {application?.requirementAndHisEvaluationList && (
          <RequirementEvaluationList
            evaluations={application.requirementAndHisEvaluationList}
          />
        )}
      </div>
    </PageLayout>
  )
}
