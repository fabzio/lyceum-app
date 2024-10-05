import { Input } from '@/components/ui/input'
import { IRiskStudent } from '@/interfaces'
import SelectFilter from './SelectFilter'
import TableRiskStudents from './TableRiskStudents'
import { useState } from 'react';
import { Button } from '@/components/ui/button'
//import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export default function RiskStudents() {
  //ANOTACION 1: FALTA FILTRAR POR NOTAS : "Listo Filtrar por Puntacion"
  //ANOTACION 2: REVISANDO TAMBIÉN SERÍA BUENO UN BOTÓN PARA SOLICITAR TODAS LAS ACTUALIZACIONES, EL FIGMA SOLO SOPORTA UNO POR UNO (LUEGO FLORES NOS FUNA)
  const [searchTerm, setSearchTerm] = useState<string>('');         // Estado para el término de búsqueda
  const [selectedScore, setSelectedScore] = useState<string | null>('Todos'); // Estado para la puntuación seleccionada
  const [selectedReason, setSelectedReason] = useState<string | null>('Todos'); // Estado para el motivo seleccionado
  const [filteredStudents, setFilteredStudents] = useState<IRiskStudent[]>(riskStudents); // Estado de estudiantes filtrados

  // Función para manejar la búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    filterStudents(value, selectedScore, selectedReason);
  }

  // Función para manejar el filtro por puntuación
  const handleScoreChange = (score: string) => {
    setSelectedScore(score);
    filterStudents(searchTerm, score , selectedReason);
  }

  // Función para manejar el filtro por motivo
  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason);
    filterStudents(searchTerm, selectedScore, reason);
  }

  // Función para filtrar estudiantes según búsqueda y puntuación
  const filterStudents = (searchTerm: string, score: string | null , reason: string | null) => {
    let filtered = riskStudents;

    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.nombres.toLowerCase().includes(searchTerm) || 
        student.apellidos.toLowerCase().includes(searchTerm)
      );
    }

    if (score && score !== 'Todos') {
      filtered = filtered.filter(student => student.ultimaPuntuacion === score);
    }

    if (reason && reason !== 'Todos') {
      filtered = filtered.filter(student => student.motivo === reason);
    }
    setFilteredStudents(filtered);
  }

  // Función para solicitar actualizaciones
  const handleRequestUpdates = () => {
    console.log('Solicitando actualizaciones para todos los alumnos...');
  };

    return (
      <div className="flex flex-col my-6 p-4  rounded-lg shadow-md">
        <div className="w-full flex flex-col md:flex-row justify-between gap-4">
          {/* Input para búsqueda */}
          <Input 
            type="search" 
            placeholder="🔎 Buscar alumno" 
            value={searchTerm} 
            onChange={handleSearchChange}
            className="w-full md:w-2/4"
          />
          
          {/* Select para filtrar por puntuación */}
          <SelectFilter onFilterChange={handleReasonChange} selectedValue={selectedReason} filterType="ReasonFilter" />
          
          {/* Select para filtrar por motivo */}
          <SelectFilter onFilterChange={handleScoreChange} selectedValue={selectedScore} filterType="ScoreFilter" />
        </div>

        {/* Botón para solicitar actualizaciones */}
        <div className="my-4">
          <Button onClick={handleRequestUpdates} className="w-full md:w-auto">
            Solicitar todas las actualizaciones
          </Button>
        </div>

        {/* Tabla de estudiantes */}
        <TableRiskStudents tableRiskStudents={filteredStudents} />
      </div>
    )
  }
  const riskStudents: IRiskStudent[] = [
    {
      codigo: 1,
      nombres: "Juan",
      apellidos: "Pérez",
      curso: "Programación 2",
      motivo: "Tercera",
      ultimaPuntuacion: "2"
    },
    {
      codigo: 2,
      nombres: "María",
      apellidos: "López",
      curso: "Programación 2",
      motivo: "Tercera",
      ultimaPuntuacion: "3"
    },
    {
      codigo: 3,
      nombres: "Carlos",
      apellidos: "Gómez",
      curso: "Programación 2",
      motivo: "Cuarta",
      ultimaPuntuacion: "2"
    },
    {
      codigo: 4,
      nombres: "Ana",
      apellidos: "Martínez",
      curso: "Programación 2",
      motivo: "Tercera",
      ultimaPuntuacion: "4"
    },
    {
      codigo: 5,
      nombres: "Martin",
      apellidos: "Mendoza",
      curso: "Programación 3",
      motivo: "Salud Mental", 
      ultimaPuntuacion: "5"
    },
    {
      codigo: 6,
      nombres: "Jose",
      apellidos: "Quispe",
      curso: "Sistemas Operativos",
      motivo: "Cuarta", 
      ultimaPuntuacion: "3"
    },
    {
      codigo: 7,
      nombres: "Fabricio",
      apellidos: "Castillo",
      curso: "Ingenieria de Software",
      motivo: "Salud Mental", 
      ultimaPuntuacion: "3"
    },
    {
      codigo: 8,
      nombres: "Daniel",
      apellidos: "Vega",
      curso: "Tecnologias de informacion para los negocios",
      motivo: "Cuarta", 
      ultimaPuntuacion: "3"
    }
  ]