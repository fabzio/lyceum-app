import { ModeToggle } from '../components/ModeToggle'
import ProfileSettings from '../components/ProfileSettings'
import Notifications from '../components/Notifications'
import SearchBar from '../components/SearchBar'

export default function NavbarDesktop() {
  return (
    <nav className="sticky top-0 w-full [grid-area:nav] p-2 flex justify-between shadow-sm pe-16 backdrop-blur-md z-50">
      <section/>
      <section>
        <SearchBar />
      </section>
      <section className="flex items-center gap-4">
        <Notifications />
        <ModeToggle />
        <ProfileSettings />
      </section>
    </nav>
  )
}
