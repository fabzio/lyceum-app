import PresentationCardAside from './components/PresentationCardAside'

import { Outlet } from '@tanstack/react-router'

export default function PresentationCardDetail() {
  return (
    <div className="flex h-full">
      <PresentationCardAside />
      <Outlet />
    </div>
  )
}
