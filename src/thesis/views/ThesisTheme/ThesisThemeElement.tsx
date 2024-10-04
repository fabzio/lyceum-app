import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "@tanstack/react-router"

interface ProjectCardProps {
  id: string
  title: string
  owner: string
  date: string
  status: string
}

export default function ThesisThemeElement({ id, title, owner, date, status }: ProjectCardProps) {
  const navigate = useNavigate({
    from: "/tesis"
  })
  const handleChooseCard = () => {
    navigate({
      to: "/tesis",

    })
  }
  return (
    <Card className="w-full my-6 p-2 cursor-pointer" onClick={handleChooseCard} >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          N°{id}
        </CardTitle>
        <Badge variant="secondary">{status}</Badge>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-semibold leading-none tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>{owner}</span>
          <span>{date}</span>
        </CardDescription>
      </CardContent>
    </Card>
  )
}

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion'
// import { Button } from '@/components/ui/button'
// import { ThesisJuryRequest } from '@/interfaces/ThesisJuryRequest'

// interface Props {
//   thesisjuryrequests: ThesisJuryRequest[]
// }

//   export default function AssigmentAccordion({ thesisjuryrequests }: Props) {
//     return (
//       <Accordion type="single" collapsible>
//         {thesisjuryrequests.map((thesisjuryrequest, idx) => (
//           <AccordionItem value={`item-${idx}`} key={assigment.user}>
//             <AccordionTrigger>
//               <div className="flex justify-between w-full px-2">
//                 <span>{assigment.user}</span>

//                 <span className="font-normal no-underline">{`${assigment.roles.length} rol${
//                   assigment.roles.length > 1 ? 'es' : ''
//                 }`}</span>
//               </div>
//             </AccordionTrigger>
//             <AccordionContent>
//               <AssigmentAccordionItem roles={assigment.roles} />
//             </AccordionContent>
//           </AccordionItem>
//         ))}

//       </Accordion>
//     )
//   }

//   export function AssigmentAccordionItem({ roles }: { roles: RoleAssigment[] }) {
//     return (
//       <ul className="flex flex-col gap-2">
//         {roles.map((role) => (
//           <li className="flex justify-between" key={role.key}>
//             <div>
//               <span className="font-">{role.key}</span> {role.value}
//             </div>
//             <div>
//               <Button variant="destructive">Revocar</Button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     )
//   }
