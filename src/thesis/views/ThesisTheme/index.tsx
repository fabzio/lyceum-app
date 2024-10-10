import { Input } from '@/components/ui/input'
import ThesisThemeSelectFilter from './components/ThesisThemeRequestFilter'
import { useSuspenseQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/constants/queryKeys'

import ThesisThemeList from './components/ThesisThemeList'
import ThesisThemeRequestService from '@/thesis/services/ThesisThemeRequest.service'

export default function ThesisTheme() {
  const { data: thesisThemeRequests } = useSuspenseQuery({
    queryKey: [QueryKeys.thesis.THESIS_REQUESTS],
    queryFn: () => ThesisThemeRequestService.getThesisThemeRequest(),
  })
  console.log(thesisThemeRequests)
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar" />
        </div>
        <div className="flex gap-3">
          <ThesisThemeSelectFilter />
        </div>
      </div>
      <ThesisThemeList thesisThemeRequests={thesisThemeRequests} />
    </div>
  )
}
