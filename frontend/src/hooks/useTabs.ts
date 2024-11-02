import { ValidRoutes } from '@frontend/constants/paths'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const useTabs = (initalPath: ValidRoutes) => {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState(initalPath)

  const handleChangeTab = (value: string, params: string) => {
    const route = value as ValidRoutes
    setActiveTab(route)
    navigate({
      to: route,
      params,
    })
  }

  return {
    activeTab,
    handleChangeTab,
  }
}
