import { ReactNode } from '@tanstack/react-router'

interface Props {
  name: string
  children: ReactNode
}
export default function PageLayout({ name, children }: Props) {
  return (
    <div>
      <div className="p-6">
        <h2 className="text-4xl font-bold">{name}</h2>
      </div>
      <section>{children}</section>
    </div>
  )
}
