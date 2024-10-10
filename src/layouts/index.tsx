import { AnimatePresence } from 'framer-motion'
import AsideDesktop from './Aside/AsideDesktop'
import NavbarDesktop from './Navbar/NavbarDesktop'
import styles from './layout.module.css'
import { ScrollArea } from '@/components/ui/scroll-area'
interface Props {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <div className={styles.mainLayout}>
      <AsideDesktop />
      <NavbarDesktop />
      <ScrollArea>
        <main className="[grid-area:main]">
          <AnimatePresence>{children}</AnimatePresence>
        </main>
      </ScrollArea>
    </div>
  )
}
