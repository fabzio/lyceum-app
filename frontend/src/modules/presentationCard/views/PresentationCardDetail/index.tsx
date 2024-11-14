import ThesisThemeAside from './components/ThesisThemeAside'

import { Outlet } from '@tanstack/react-router'

export default function ThesisThemeDetail() {
  return (
    <div className="flex h-full">
      <ThesisThemeAside />
      <Outlet />
    </div>
  )
}
