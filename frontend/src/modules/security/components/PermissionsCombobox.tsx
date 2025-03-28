import { Combobox } from '@frontend/components/Combobox'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useQuery } from '@tanstack/react-query'
import ModuleService from '../services/module.service'
import { useState } from 'react'

import PermissionService from '../services/permission.service'
import PermissionAccordion from './AcoordionPermissions'
import { useFormContext } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

interface Props {
  index: number
}
export default function PermissionsCombobox({ index }: Props) {
  const [moduleSelected, setModuleSelected] = useState<number | null>(null)
  const { setValue } = useFormContext()
  const { data: modules } = useQuery({
    queryKey: [QueryKeys.security.MODULES],
    queryFn: ModuleService.getModules,
  })

  const { data: permissions, isLoading: permissionsLoading } = useQuery({
    queryKey: [QueryKeys.security.PERMISSIONS, moduleSelected],
    queryFn: () =>
      PermissionService.getPermissions(moduleSelected ?? undefined),
    enabled: !!moduleSelected,
  })

  const optionModules = modules?.map((module) => ({
    value: module.id.toString(),
    label: module.name,
  }))
  const handleComboboxChange = (value: string) => {
    setModuleSelected(Number(value))
    setValue(`permissions[${index}].moduleId`, Number(value))
  }

  if (!optionModules) return <Loader2 className="animate-spin" />
  return (
    <div className="flex-grow">
      {moduleSelected ? (
        permissionsLoading ? (
          <div>Cargando...</div>
        ) : (
          <PermissionAccordion permissions={permissions} index={index} />
        )
      ) : (
        <Combobox
          onChange={handleComboboxChange}
          value={moduleSelected?.toString()}
          className="w-full"
          options={optionModules}
          placeholder="Elija un módulo"
        />
      )}
    </div>
  )
}
