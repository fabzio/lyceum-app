//import { Account } from '@frontend/interfaces/models/Account'

import { Account } from '@frontend/interfaces/models/Account'

export type Professor = Account & {
  unit: string
  unitType: 'section' | 'department'
  parent: string
}
