import { ModeToggle } from '../components/ModeToggle'
import ProfileSettings from '../components/ProfileSettings'
import SearchBar from '../components/SearchBar'
import TSRBreadCums from '@frontend/components/TSRBreadCums'

export default function NavbarDesktop() {
  return (
    <nav className="sticky top-0 w-full [grid-area:nav] py-2 px-4 flex justify-between items-center shadow-sm pe-16 backdrop-blur-md z-50">
      <TSRBreadCums />
      <SearchBar />
      <section className="flex items-center gap-4">
        <ModeToggle />
        <ProfileSettings />
      </section>
    </nav>
  )
}
