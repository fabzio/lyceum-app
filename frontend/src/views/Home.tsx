import AccountsService from '@frontend/service/Accounts.service'
import { useSessionStore } from '@frontend/store'
import { useSuspenseQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { RoleCard } from './components/RoleCard'
import ProfileCard from './components/ProfileCard'
import moment from 'moment'
import { useEffect, useState } from 'react'

export default function Home() {
  const { session } = useSessionStore()
  const [time, setTime] = useState(moment())
  const { data } = useSuspenseQuery({
    queryKey: ['profile'],
    queryFn: () => AccountsService.fetchAccountProfile(session!.id),
  })
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <motion.h2
        className="text-center text-xl flex flex-col mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full flex flex-col justify-center">
          <time className="text-6xl text-center font-bold">
            {time.format('HH:mm')}
          </time>
          <time className="text-2xl text-center font-semibold">
            {time.format('dddd, D [de] MMMM [de] YYYY')}
          </time>
        </div>
      </motion.h2>
      <div className="flex flex-col gap-4 px-4 items-center mt-4">
        <p>
          Le damos la bienvenida a <b>Lyceum</b>
        </p>
        <section>
          <ProfileCard baseRole={data.roles.find((role) => !role.editable)!} />
        </section>
        <section>
          {data.roles.length > 1 && (
            <h3 className="text-lg font-semibold text-center text-muted-foreground">
              Roles
            </h3>
          )}
          <div className="flex flex-wrap gap-2">
            {data.roles.map((role, i) => (
              <RoleCard key={i} {...role} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
