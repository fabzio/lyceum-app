//import Need from "@/components/Need";

import QuickSearchInput from "@frontend/components/QuickSearchInput.tsx/QuickSearchInput";
import CourseService from "@frontend/modules/study-plans/services/course.service";
import { Label } from '@frontend/components/ui/label'
import { useEffect, useState } from "react";
import { Course } from "@frontend/interfaces/models/Course";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@frontend/components/ui/select'
import { ScheduleByCourse } from "@frontend/interfaces/models/ScheduleByCourse";
import ScheduleService from "@frontend/service/Schedules.service";
import { Button } from "@frontend/components/ui/button";
import AccountTable from "./components/AccountByScheduleTable";

export default function ScheduleManagement() {
  const [course, setCourse] = useState<Course | null>(null)
  const [isSchedulesLoading, setIsSchedulesLoading] = useState(false)
  const [schedules, setSchedules] = useState<ScheduleByCourse[] | null>(null)
  const [scheduleCode, setScheduleCode] = useState('')
  const [scheduleId, setScheduleId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
        if (course) {
            setIsSchedulesLoading(true)
            try {
                const res = await ScheduleService.getSchedulesByCourse(course.id)
                setSchedules(res)
            } catch (error) {
                console.error('Error fetching schedules:', error)
            } finally {
                setIsSchedulesLoading(false)
            }
        } else {
            setSchedules([])
        }
    }
    fetchSchedules()
}, [course])

const handleGetAccounts = async () => {
  if (!scheduleCode) return;

  const selectedSchedule = schedules?.find(schedule => schedule.id.toString() === scheduleCode);
    if (selectedSchedule) {
      setScheduleId(selectedSchedule.id.toString());
    }
};

return (
  <div className="flex flex-col my-6 p-6 rounded-lg shadow-md">
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

      <div className="w-full md:w-1/2 space-y-1.5">
        <Label>Curso</Label>
        <QuickSearchInput
          placeholder="Buscar curso por código o nombre"
          searchFn={async (query) => {
              const res = await CourseService.fetchCourses({ q: query, pageIndex: 0, pageSize: 10000 });
              return res.result;
          }}
          handleSelect={(item) => setCourse(item)}
          renderOption={(item) => <div>{`${item.code} ${item.name}`}</div>}
          renderSelected={(item) => <div>{`${item.code} ${item.name}`}</div>}
        />
      </div>

      <div className="w-full md:w-1/2 space-y-1.5">
        <Label>Horario</Label>
        <div className="flex gap-2">
          <Select onValueChange={setScheduleCode} disabled={!course || isSchedulesLoading}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={isSchedulesLoading ? "Cargando horarios..." : "Seleccione un curso para obtener horarios"} />
            </SelectTrigger>
            <SelectContent>
              {schedules && schedules.length > 0 ? (
                schedules.map((schedule) => (
                  <SelectItem key={schedule.id} value={schedule.id.toString()}>
                    {schedule.code}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="no-schedule">
                  No se ha seleccionado
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <Button onClick={handleGetAccounts} disabled={!scheduleCode}>
            Obtener
          </Button>
        </div>
      </div>

    </div>
    {scheduleId && <AccountTable scheduleId={parseInt(scheduleId)} />}
  </div>
)
  }