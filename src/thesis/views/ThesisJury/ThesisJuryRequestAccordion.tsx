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
