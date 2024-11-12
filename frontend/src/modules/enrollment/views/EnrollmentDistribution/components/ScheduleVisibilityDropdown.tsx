import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@frontend/components/ui/select'
import { Schedule } from '@frontend/interfaces/models/Schedule'
import EnrollmenDistributionService from '@frontend/modules/enrollment/services/EnrollmentDistribution.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { Loader2 } from 'lucide-react'
import { useToast } from '@frontend/hooks/use-toast'

interface Props {
  scheduleId: Schedule['id']
  defaultValue: Schedule['visibility']
}

export default function ScheduleVisibilityDropdown({
  scheduleId,
  defaultValue,
}: Props) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { mutate, isPending } = useMutation({
    mutationFn: EnrollmenDistributionService.updateScheduleVisibility,
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.enrollment.SCHEDULE_DISTRIBUTION],
      })
      toast({
        title: 'Visibilidad actualizada',
        description: 'La visibilidad del horario ha sido actualizada',
      })
    },
  })
  const onChange = (value: string) => {
    mutate({
      scheduleId,
      visibility: value === 'true',
    })
  }
  return (
    <Select
      defaultValue={defaultValue ? 'true' : 'false'}
      onValueChange={onChange}
      disabled={isPending}
    >
      <SelectTrigger>
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <SelectValue placeholder="Visibilidad" />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Visibilidad</SelectLabel>
          <SelectItem value="true">Visible</SelectItem>
          <SelectItem value="false">Oculto</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
