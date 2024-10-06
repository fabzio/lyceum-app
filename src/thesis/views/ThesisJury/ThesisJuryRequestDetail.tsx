import { Mail } from './components/mail'
import { mails } from './data'

export default function ThesisJuryRequestDetail() {
  const defaultLayout = [35, 40, 25]
  return (
    <div className="hidden flex-col md:flex h-full">
      <Mail mails={mails} defaultLayout={defaultLayout} />
    </div>
  )
}
