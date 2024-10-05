import { Mail } from './components/mail'
import { mails } from './data'

export default function MailPage() {
  const defaultLayout = undefined

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <img
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <Mail mails={mails} defaultLayout={defaultLayout} />
      </div>
    </>
  )
}
