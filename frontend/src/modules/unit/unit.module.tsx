import Unit from '.'

export const unitModule = {
  route: 'unit',
  subroutes: [
    {
      route: 'subunits',
      description: 'Manage subunits',
    },
    {
      route: 'roles',
      description: 'Manage roles',
    },
    {
      route: 'users',
      description: 'Manage users',
    },
  ],
  module: Unit,
  description: 'Manage units',
}
