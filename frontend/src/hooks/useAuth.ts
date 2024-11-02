import http from '@frontend/lib/http'
import { Session, useSessionStore } from '@frontend/store'
import { useQuery } from '@tanstack/react-query'

export const useAuth = () => {
  const { syncSession } = useSessionStore()
  const { data: isAuth, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const response = await http.get('/auth/verify')
        const res = response.data as ResponseAPI
        if (!res.success) {
          throw new Error(res.message)
        }
        syncSession(res.data as Session)
        return res.success
      } catch (error) {
        console.error('Error verifying auth:', error)
        return false
      }
    },
    staleTime: Infinity,
    refetchOnMount: false,
  })
  return { isAuth, isLoading }
}

export type AuthContext = ReturnType<typeof useAuth>
