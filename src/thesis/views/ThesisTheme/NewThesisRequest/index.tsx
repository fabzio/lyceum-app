import { Separator } from '@/components/ui/separator'
import NewThesisForm from '../components/NewThesisForm'

export default function NewThesisRequest() {
  return (
    <div>
      <section className="flex h-full flex-col overflow-y-hidden">
        <div className="flex items-center p-2">
          <div className="flex items-center gap-2 h-10 py-2">
            <h1 className="text-xl font-bold">Nueva solicitud</h1>
          </div>
        </div>
        <Separator />
      </section>
      <section className="mt-2 flex justify-center">
        <NewThesisForm />
      </section>
    </div>
  )
}
