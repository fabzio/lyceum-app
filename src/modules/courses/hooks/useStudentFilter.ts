import { useEffect, useState } from 'react'
import { RiskStudent } from '@/interfaces'

export function useStudentFilter(initialStudents: RiskStudent[]) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedScore, setSelectedScore] = useState<string | null>('Todos')
  const [selectedReason, setSelectedReason] = useState<string | null>('Todos')
  const [filteredStudents, setFilteredStudents] =
    useState<RiskStudent[]>(initialStudents)

  useEffect(() => {
    filterStudents(searchTerm, selectedScore, selectedReason)
  }, [searchTerm, selectedScore, selectedReason])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value.toLowerCase())
  }

  const handleScoreChange = (score: string) => {
    setSelectedScore(score)
  }

  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason)
  }

  const filterStudents = (
    searchTerm: string,
    score: string | null,
    reason: string | null
  ) => {
    let filtered = initialStudents

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.nombres.toLowerCase().includes(searchTerm) ||
          student.apellidos.toLowerCase().includes(searchTerm)
      )
    }

    if (score && score !== 'Todos') {
      filtered = filtered.filter(
        (student) => student.ultimaPuntuacion === score
      )
    }

    if (reason && reason !== 'Todos') {
      filtered = filtered.filter((student) => student.motivo === reason)
    }

    setFilteredStudents(filtered)
  }

  const handleRequestUpdates = () => {
    console.log('Solicitando actualizaciones para todos los alumnos...')
  }

  return {
    searchTerm,
    selectedScore,
    selectedReason,
    filteredStudents,
    handleSearchChange,
    handleScoreChange,
    handleReasonChange,
    handleRequestUpdates,
  }
}
