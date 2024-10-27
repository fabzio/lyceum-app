import http from '@/lib/http'
import { useQuery } from '@tanstack/react-query'

export const useAuth = () => {
  const { data: isAuth, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const response = await http.get('/auth/verify')
        const res = response.data as ResponseAPI
        if (!res.success) {
          throw new Error(res.message)
        }
        return res.success
      } catch (error) {
        return false
      }
    },
    staleTime: Infinity,
    refetchOnMount: false,
  })
  return { isAuth, isLoading }
}

export type AuthContext = ReturnType<typeof useAuth>
