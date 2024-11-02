import { Button } from '@frontend/components/ui/button'
import { Label } from '@frontend/components/ui/label'
import { Separator } from '@frontend/components/ui/separator'
import { Textarea } from '@frontend/components/ui/textarea'
import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@frontend/components/ui/select'
import { EnrollmentModification } from '@frontend/modules/enrollment/interfaces/EnrollmentModification'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import QuickSearchInput from '@frontend/components/QuickSearchInput.tsx/QuickSearchInput'
import CourseService from '@frontend/modules/study-plans/services/course.service'
import { Course } from '@frontend/interfaces/models/Course'
import { ScheduleByCourse } from '@frontend/interfaces/models/ScheduleByCourse'
import ScheduleService from '@frontend/service/Schedules.service'

const enrollmentRequestTypeOptions = [
    { value: 'aditional', label: 'Adicional' },
    { value: 'withdrawal', label: 'Retiro' },
]

export default function EnrollmentCreateMain() {
    // Local states for handling the new request data
    const navigate = useNavigate()
    const [course, setCourse] = useState<Course | null>(null)
    const [reason, setReason] = useState('')
    const [isSchedulesLoading, setIsSchedulesLoading] = useState(false)
    const [schedules, setSchedules] = useState<ScheduleByCourse[] | null>(null)
    const [requestType, setRequestType] = useState('')
    const [scheduleCode, setScheduleCode] = useState('')

    useEffect(() => {
        const fetchSchedules = async () => {
            if (course) {
                setIsSchedulesLoading(true)
                try {
                    const res = await ScheduleService.getSchedulesByCourse(course.id) // Recupera horarios para el curso seleccionado
                    setSchedules(res) // Asigna los horarios al estado
                } catch (error) {
                    console.error('Error fetching schedules:', error)
                } finally {
                    setIsSchedulesLoading(false)
                }
            } else {
                setSchedules([]) // Si no hay curso, limpiar horarios
            }
        }
        fetchSchedules()
    }, [course])

    const handleCreateRequest = async () => {
        const enrollmentData: EnrollmentModification = {
            studentId: '7a60626b-664a-437a-ad9c-f5d5b69e4b83',
            scheduleId: Number(scheduleCode),
            state: 'requested',
            requestType: requestType as 'aditional' | 'withdrawal',
            reason: reason || undefined,
        };

        try {
            await EnrollmentService.insertEnroll(enrollmentData);
            console.log('Solicitud creada con éxito');
            // Aquí puedes agregar lógica adicional, como redirigir o limpiar el formulario
            navigate({ to: '/matricula' })
        } catch (error) {
            console.error('Error al crear la solicitud:', error);
            // Manejo de errores (puedes mostrar un mensaje al usuario)
        }
    };

    return (
        <div className="flex h-full flex-col overflow-y-hidden">
            <div className="flex items-center p-2">
                <div className="flex items-center gap-2 h-10 w-full p-2 justify-between">
                    <h1 className="text-xl font-bold">Crear Nueva Solicitud</h1>
                </div>
            </div>
            <Separator />
            <section className="px-10">
                <div className="flex flex-col gap-2">
                    <div className="space-y-1.5">
                        <Label>Curso</Label>
                        <QuickSearchInput
                        placeholder="Buscar curso por código o nombre"
                        searchFn={async (query) => {
                            const res = await CourseService.fetchCourses({q: query, pageIndex: 0, pageSize: 10000});
                            return res.result;
                        }} // Fetches courses
                        handleSelect={(item) => setCourse(item)} // Sets selected course
                        renderOption={(item) => <div>{`${item.code} ${item.name}`}</div>} // Option render
                        renderSelected={(item) => <div>{`${item.code} ${item.name}`}</div>} // Selected render
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1 space-y-1.5">
                            <Label>Tipo de Solicitud</Label>
                            <Select onValueChange={setRequestType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccione un tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {enrollmentRequestTypeOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1 space-y-1.5">
                            <Label>Horario</Label>
                            <Select onValueChange={setScheduleCode} disabled={!course || isSchedulesLoading}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={isSchedulesLoading ? "Cargando horarios..." : "Seleccione un curso para obtener horarios"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {schedules && schedules.length > 0 ? ( // Si hay horarios, mostrarlos
                                        schedules.map((schedule) => (
                                            <SelectItem key={schedule.id} value={schedule.id.toString()}>
                                                {schedule.code}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem disabled value="no-schedule"> {/* Valor no vacío para evitar el error */}
                                            No se ha seleccionado
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label>Justificación</Label>
                        <Textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Escriba la justificación"
                        />
                    </div>
                </div>
                <div className="mt-2 flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => navigate({ to: '/matricula' })}>
                        Cancelar
                    </Button>
                    <Button onClick={handleCreateRequest}>
                        Crear Solicitud
                    </Button>
                </div>
            </section>
        </div>
    )
}
