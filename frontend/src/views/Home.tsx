import AccountsService from '@frontend/service/Accounts.service'
import { useSessionStore } from '@frontend/store'
import { useSuspenseQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { RoleCard } from './components/RoleCard'
import ProfileCard from './components/ProfileCard'

export default function Home() {
  const { session } = useSessionStore()
  const { data } = useSuspenseQuery({
    queryKey: ['profile'],
    queryFn: () => AccountsService.fetchAccountProfile(session!.id),
  })
  return (
    <div>
      <motion.h2
        className="text-center text-xl flex flex-col"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Le damos la bienvenida a Lyceum
      </motion.h2>
      <div className="flex flex-col gap-2 px-4">
        <section>
          <ProfileCard baseRole={data.roles.find((role) => !role.editable)!} />
        </section>
        <section className="w-full md:w-[500px] grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {data.roles.map((role, i) => (
            <RoleCard key={i} {...role} />
          ))}
        </section>
      </div>
    </div>
  )
}
