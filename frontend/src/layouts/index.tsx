import { AnimatePresence } from 'framer-motion'
import NavbarDesktop from './Navbar/NavbarDesktop'
import styles from './layout.module.css'
import { ScrollArea } from '@frontend/components/ui/scroll-area'
import Aside from './Aside/Aside'
interface Props {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <div className={styles.mainLayout}>
      <Aside />
      <NavbarDesktop />
      <ScrollArea>
        <main className="[grid-area:main]">
          <AnimatePresence>{children}</AnimatePresence>
        </main>
      </ScrollArea>
    </div>
  )
}
