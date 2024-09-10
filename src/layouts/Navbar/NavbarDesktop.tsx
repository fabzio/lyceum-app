import { ModeToggle } from '../components/ModeToggle'
import ProfileSettings from '../components/ProfileSettings'
import Notifications from '../components/Notifications'
import SearchBar from '../components/SearchBar'

export default function NavbarDesktop() {
  return (
    <nav className="[grid-area:nav] p-2 flex justify-between shadow-sm">
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
