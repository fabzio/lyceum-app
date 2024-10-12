import ThesisJuryAside from './components/ThesisJuryAside'
import { Outlet } from '@tanstack/react-router'

export default function ThesisJuryDetail() {
  return (
    <div className="flex h-full">
      <ThesisJuryAside />
      <Outlet />
    </div>
  )
}
