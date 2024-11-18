import CoverLetterAside from './components/PresentationCardAside'

import { Outlet } from '@tanstack/react-router'

export default function CoverLetterDetail() {
  return (
    <div className="flex h-full">
      <CoverLetterAside />
      <Outlet />
    </div>
  )
}
