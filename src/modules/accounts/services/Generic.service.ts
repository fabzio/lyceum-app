import db from '@/database'
import {
  accountRoles,
  accounts,
  contactsInfo,
  modules,
  permissions,
  rolePermissions,
  roles,
  scheduleAccounts,
  terms,
} from '@/database/schema'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import { PaginatedData } from '@/interfaces/PaginatedData'
import { and, asc, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm'

class GenericService {
  public async getProfile(accountId: string) {
    const response = await db.query.accounts.findFirst({
      where: (account, { eq }) => eq(account.id, accountId),
      columns: {
        code: true,
      },
      with: {
        accountRoles: {
          columns: {
            accountId: false,
            roleId: false,
            unitId: false,
          },
          with: {
            roles: {
              columns: {
                name: true,
                editable: true,
              },
            },
            units: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    })
    if (!response) throw new Error('Account not found')
    return {
      code: response.code,
      roles: response.accountRoles.map((role) => ({
        role: role.roles.name,
        unit: role.units.name,
        editable: role.roles.editable,
      })),
    }
  }

  public async getAccount({
    q,
    userType,
  }: {
    q: string
    userType?: BaseRoles
  }) {
    if (!userType) {
      return await db
        .select({
          id: accounts.id,
          name: accounts.name,
          firstSurname: accounts.firstSurname,
          secondSurname: accounts.secondSurname,
          code: accounts.code,
        })
        .from(accounts)
        .where(
          or(
            sql`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${
              accounts.secondSurname
            }) ilike ${`%${q}%`}`,
            ilike(accounts.code, `%${q}%`)
          )
        )
        .limit(5)
    } else {
      return await db
        .select({
          id: accounts.id,
          name: accounts.name,
          firstSurname: accounts.firstSurname,
          secondSurname: accounts.secondSurname,
          code: accounts.code,
        })
        .from(accounts)
        .innerJoin(
          accountRoles,
          and(
            eq(accountRoles.accountId, accounts.id),
            eq(accountRoles.roleId, userType)
          )
        )
        .where(
          or(
            sql`concat(${accounts.name}, ' ', ${accounts.firstSurname}, ' ', ${
              accounts.secondSurname
            }) ilike ${`%${q}%`}`,
            ilike(accounts.code, `%${q}%`)
          )
        )
        .limit(5)
    }
  }

  public async getAccountsBySchedule(params: {
    q?: string
    page: number
    limit: number
    sortBy?: string
    scheduleId?: string // Parámetro `scheduleId`
  }): Promise<
    PaginatedData<{
      id: string
      code: string
      name: string
      firstSurname: string
      secondSurname: string
      email: string
      role: number | null // Rol específico de scheduleAccounts
      lead: boolean // Campo `lead` de scheduleAccounts
    }>
  > {
    const [field, order] = params.sortBy?.split('.') || ['name', 'asc']

    // Obtener el total de registros con el filtro `scheduleId`
    const [{ total }] = await db
      .select({
        total: sql<string>`count(*)`,
      })
      .from(accounts)
      .leftJoin(scheduleAccounts, eq(scheduleAccounts.accountId, accounts.id)) // Cambiamos el JOIN a `scheduleAccounts`
      .where(
        and(
          or(
            ilike(accounts.name, `%${params.q}%`),
            ilike(accounts.code, `%${params.q}%`)
          ),
          eq(accounts.state, 'active'),
          params.scheduleId
            ? eq(scheduleAccounts.scheduleId, Number(params.scheduleId))
            : sql`1=1` // Filtro opcional `scheduleId`
        )
      )

    const mappedFields = {
      ['name']: accounts.name,
      ['code']: accounts.code,
      ['firstSurname']: accounts.firstSurname,
      ['secondSurname']: accounts.secondSurname,
      ['email']: accounts.email,
      ['role']: scheduleAccounts.roleId, // Usamos `scheduleAccounts.roleId`
      ['lead']: scheduleAccounts.lead, // Campo `lead` en el mapeo
    }
    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }

    // Obtener los datos con la misma estructura de filtros
    const AccountsResponse = await db
      .select({
        id: accounts.id,
        code: accounts.code,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        email: accounts.email,
        role: scheduleAccounts.roleId, // Seleccionamos un único valor de `roleId`
        lead: sql<boolean>`coalesce(${scheduleAccounts.lead}, false)`, // Incluimos el campo `lead` y aseguramos que no sea null
      })
      .from(accounts)
      .leftJoin(scheduleAccounts, eq(scheduleAccounts.accountId, accounts.id)) // Cambiamos el JOIN a `scheduleAccounts`
      .where(
        and(
          or(
            ilike(accounts.name, `%${params.q}%`),
            ilike(accounts.code, `%${params.q}%`)
          ),
          eq(accounts.state, 'active'),
          params.scheduleId
            ? eq(scheduleAccounts.scheduleId, Number(params.scheduleId))
            : sql`1=1` // Filtro opcional `scheduleId`
        )
      )
      .offset(params.page * params.limit)
      .limit(params.limit)
      .orderBy(
        mappedSortBy[order as keyof typeof mappedSortBy](
          mappedFields[field as keyof typeof mappedFields]
        )
      )

    return {
      result: AccountsResponse,
      rowCount: +total,
      currentPage: params.page,
      totalPages: Math.ceil(+total / params.limit),
      hasNext: +total > (params.page + 1) * params.limit,
    }
  }

  public static async googleLogin({
    email,
    googleId,
  }: {
    email: string
    googleId: string
  }) {
    const accountResponse = await db
      .select({
        id: accounts.id,
        name: accounts.name,
        surname: sql<string>`concat(${accounts.firstSurname} || ' ' || ${accounts.secondSurname})`,
        code: accounts.code,
        email: accounts.email,
        googleId: accounts.googleId,
      })
      .from(accounts)
      .where(or(eq(accounts.email, email), eq(accounts.googleId, googleId)))
    if (accountResponse.length === 0) {
      throw new Error('Su cuenta no está registrada en el sistema')
    }

    const [account] = accountResponse
    const allowedRoles = await db
      .select({
        roleId: accountRoles.roleId,
        unitId: accountRoles.unitId,
      })
      .from(accountRoles)
      .where(eq(accountRoles.accountId, account.id))
    const allowedRolePemissions = await db
      .select({
        roleId: rolePermissions.roleId,
        permission: permissions.name,
        module: modules.code,
      })
      .from(rolePermissions)
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .innerJoin(modules, eq(permissions.moduleId, modules.id))
      .where(
        inArray(
          rolePermissions.roleId,
          allowedRoles.map((role) => role.roleId)
        )
      )
    const rolesWithPermissions = allowedRoles.map((role) => ({
      ...role,
      permissions: allowedRolePemissions
        .filter((permission) => permission.roleId === role.roleId)
        .map((permission) => ({
          permission: permission.permission,
          module: permission.module,
        })),
    }))

    const allowedModules = Array.from(
      new Set(allowedRolePemissions.map((permissions) => permissions.module))
    )
    const [currentTerm] = await db
      .select({
        id: terms.id,
        name: terms.name,
      })
      .from(terms)
      .where(eq(terms.current, true))
    if (!account.googleId) {
      await db
        .update(accounts)
        .set({ googleId })
        .where(eq(accounts.code, account.code))
    }
    return {
      ...account,
      allowedModules,
      roles: rolesWithPermissions,
      term: currentTerm,
    }
  }

  public static async setAccountPassword({
    code,
    password,
  }: {
    code: string
    password: string
  }) {
    await db
      .update(accounts)
      .set({ password: await Bun.password.hash(password) })
      .where(eq(accounts.code, code))
  }

  public static async lyceumLogin({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    const accountResponse = await db
      .select({
        id: accounts.id,
        name: accounts.name,
        surname: sql<string>`concat(${accounts.firstSurname} || ' ' || ${accounts.secondSurname})`,
        code: accounts.code,
        email: accounts.email,
        password: accounts.password,
      })
      .from(accounts)
      .where(or(eq(accounts.email, email), eq(accounts.code, email)))
    if (accountResponse.length === 0) {
      throw new Error('Su cuenta no está registrada en el sistema')
    }
    const [account] = accountResponse
    if (account.password === null) {
      throw new Error('Su cuenta no tiene contraseña')
    }
    try {
      if (!(await Bun.password.verify(password, account.password)))
        throw new Error('Contraseña incorrecta')
    } catch (error) {
      throw error
    }
    const allowedRoles = await db
      .select({
        roleId: accountRoles.roleId,
        unitId: accountRoles.unitId,
      })
      .from(accountRoles)
      .where(eq(accountRoles.accountId, account.id))
    const allowedRolePemissions = await db
      .select({
        roleId: rolePermissions.roleId,
        permission: permissions.name,
        module: modules.code,
      })
      .from(rolePermissions)
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .innerJoin(modules, eq(permissions.moduleId, modules.id))
      .where(
        inArray(
          rolePermissions.roleId,
          allowedRoles.map((role) => role.roleId)
        )
      )
    const rolesWithPermissions = allowedRoles.map((role) => ({
      ...role,
      permissions: allowedRolePemissions
        .filter((permission) => permission.roleId === role.roleId)
        .map((permission) => ({
          permission: permission.permission,
          module: permission.module,
        })),
    }))

    const allowedModules = Array.from(
      new Set(allowedRolePemissions.map((permissions) => permissions.module))
    )
    const currentTerm = await db
      .select({
        id: terms.id,
        name: terms.name,
      })
      .from(terms)
      .where(eq(terms.current, true))
    return {
      ...account,
      password: null,
      allowedModules,
      roles: rolesWithPermissions,
      term: currentTerm[0],
    }
  }
  public static generateUniqueCode(): string {
    return 'E' + (Math.floor(Math.random() * 1000000) % 10000000).toString()
  }

  public static async registerNewAccount({
    email,
    googleId,
    name,
    firstSurname,
  }: {
    email: string
    googleId: string
    name: string
    firstSurname: string
  }) {
    // Verificar si el usuario ya existe (para evitar duplicados)
    const existingAccount = await db
      .select({
        id: accounts.id,
      })
      .from(accounts)
      .where(eq(accounts.email, email))

    if (existingAccount.length > 0) {
      throw new Error('El usuario ya existe en el sistema')
    }

    // Iniciar una transacción para insertar el usuario y su rol asociado
    const newAccount = await db.transaction(async (tx) => {
      // Insertar la cuenta en la tabla `accounts`
      const [account] = await tx
        .insert(accounts)
        .values({
          name,
          firstSurname,
          secondSurname: ' ',
          code: this.generateUniqueCode(),
          googleId,
          email,
          state: 'inactive',
          unitId: -1, // ID de la unidad de la cual no es parte (puede ser -1 para usuarios externos)
        })
        .returning({
          id: accounts.id,
          email: accounts.email,
          name: accounts.name,
          firstSurname: accounts.firstSurname,
          googleId: accounts.googleId,
        })

      // Definir el rol de "Externo" y agregarlo a `accountRoles`
      await tx.insert(accountRoles).values({
        accountId: account.id,
        roleId: BaseRoles.EXTERNAL, // ID del rol de "Externo"
        unitId: -1,
      })

      return account
    })

    // Roles y módulos permitidos (puede ajustarse según los permisos de un "Externo")
    const allowedModules: string[] = [] // Especificar módulos permitidos para usuarios externos
    const rolesWithPermissions: {
      roleId: number
      permissions: { permission: string; module: string }[]
    }[] = [
      {
        roleId: BaseRoles.EXTERNAL,
        permissions: [], // Definir permisos por defecto para el rol de "Externo"
      },
    ]

    return {
      ...newAccount, // Información del nuevo usuario
      allowedModules,
      roles: rolesWithPermissions,
    }
  }

  public static async saveContactInfo({
    accountId,
    phone,
    secondaryPhone,
    identityType,
    CUI,
  }: {
    accountId: string
    phone: string
    secondaryPhone?: string
    identityType: 'passport' | 'national_id'
    CUI: string
  }) {
    try {
      await db.insert(contactsInfo).values({
        accountId,
        phone,
        secondaryPhone,
        identityType: identityType as 'national' | 'foreign',
        CUI,
      })

      return {
        success: true,
        message: 'Contact information saved successfully',
      }
    } catch (error) {
      console.error('Error saving contact information:', error)
      throw new Error('Error saving contact information')
    }
  }
  public static async updateContactInfo({
    accountId,
    phone,
    secondaryPhone,
    identityType,
    CUI,
  }: {
    accountId: string
    phone?: string
    secondaryPhone?: string
    identityType?: 'passport' | 'national_id'
    CUI?: string
  }) {
    try {
      // Construir el objeto de actualización dinámicamente, incluyendo solo los campos provistos
      const updateData: Record<string, any> = {}
      if (phone) updateData.phone = phone
      if (secondaryPhone) updateData.secondaryPhone = secondaryPhone
      if (identityType) updateData.identityType = identityType
      if (CUI) updateData.CUI = CUI

      if (Object.keys(updateData).length === 0) {
        throw new Error('No fields provided for update')
      }

      await db
        .update(contactsInfo)
        .set(updateData)
        .where(eq(contactsInfo.accountId, accountId))

      return {
        success: true,
        message: 'Contact information updated successfully',
      }
    } catch (error) {
      console.error('Error updating contact information:', error)
      throw new Error('Error updating contact information')
    }
  }

  public async updateAccount(
    accountId: string,
    updateData: Record<string, any>
  ) {
    try {
      // Construir el objeto de actualización dinámicamente, incluyendo solo los campos proporcionados
      const dataToUpdate: Partial<{
        name: string
        firstSurname: string
        secondSurname: string
        email: string
        state: 'active' | 'inactive' | 'deleted'
        unitId: number
        code: string
      }> = {}

      if (updateData.name) dataToUpdate.name = updateData.name
      if (updateData.firstSurname)
        dataToUpdate.firstSurname = updateData.firstSurname
      if (updateData.secondSurname)
        dataToUpdate.secondSurname = updateData.secondSurname
      if (updateData.email) dataToUpdate.email = updateData.email
      if (updateData.state) dataToUpdate.state = updateData.state
      if (updateData.unitId !== undefined)
        dataToUpdate.unitId = updateData.unitId
      if (updateData.code) dataToUpdate.code = updateData.code

      // Verificar si se proporciona al menos un campo para actualizar
      if (Object.keys(dataToUpdate).length === 0) {
        throw new Error('No fields provided for update')
      }

      // Realizar la actualización en la base de datos
      await db
        .update(accounts)
        .set(dataToUpdate)
        .where(eq(accounts.id, accountId))

      return {
        success: true,
        message: 'Account information updated successfully',
      }
    } catch (error) {
      console.error('Error updating account information:', error)
      throw new Error('Error updating account information')
    }
  }
}

export default GenericService
