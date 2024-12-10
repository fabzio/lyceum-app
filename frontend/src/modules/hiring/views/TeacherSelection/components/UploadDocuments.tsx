import React, { useRef, useState } from 'react'
import { Input } from '@frontend/components/ui/input'
import { useToast } from '@frontend/hooks/use-toast'
import { Upload, CheckCircle2 } from 'lucide-react'

interface FileUploadProps {
  onChange: (file: File | null) => void
  value: File | null
}

export function FileUpload({ onChange }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB in bytes

  const isValidFile = (file: File) => {
    const validZipTypes = [
      'application/zip',
      'application/x-zip-compressed',
      'multipart/x-zip',
    ]
    const isZip =
      file.name.toLowerCase().endsWith('.zip') ||
      validZipTypes.includes(file.type)
    const isValidSize = file.size <= MAX_FILE_SIZE

    if (!isZip) {
      toast({
        title: 'Error',
        description: 'Por favor, sube un archivo ZIP válido.',
        variant: 'destructive',
      })
      return false
    }

    if (!isValidSize) {
      toast({
        title: 'Error',
        description: 'El archivo excede el límite de 15MB.',
        variant: 'destructive',
      })
      return false
    }

    return true
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    handleFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    handleFile(file)
  }

  const handleFile = (file: File | undefined) => {
    if (file && isValidFile(file)) {
      setFileUploaded(true)
      onChange(file)
    } else {
      setFileUploaded(false)
      onChange(null)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 ${
        dragActive ? 'border-primary' : 'border-gray-300'
      } ${fileUploaded ? 'bg-green-50' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Input
        ref={inputRef}
        id="dropzone-file"
        type="file"
        accept=".zip"
        onChange={handleChange}
        className="hidden"
      />
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
      >
        {fileUploaded ? (
          <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
        ) : (
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
        )}
        <p className="mb-2 text-sm text-gray-500">
          {fileUploaded
            ? 'Archivo ZIP válido subido'
            : 'Haz clic para subir o arrastra y suelta'}
        </p>
        <p className="text-xs text-gray-500">.ZIP (máx. 15MB)</p>
      </label>
      {dragActive && (
        <div className="absolute inset-0 bg-primary/10 rounded-lg pointer-events-none" />
      )}
    </div>
  )
}
