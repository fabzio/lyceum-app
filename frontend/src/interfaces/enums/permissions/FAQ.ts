export const FAQPermissionsDict = {
  READ_FAQ: 'READ_FAQ',
  MAGANE_FAQ: 'MAGANE_FAQ',
  SUGGEST_FAQ: 'SUGGEST_FAQ',
  VIEW_FAQ_SUGGESTIONS: 'VIEW_FAQ_SUGGESTIONS',
} as const
export type FAQPermissionsDict = keyof typeof FAQPermissionsDict

const FAQPermissions = [
  {
    name: FAQPermissionsDict.READ_FAQ,
    description: 'Ver preguntas frecuentes',
  },
  {
    name: FAQPermissionsDict.MAGANE_FAQ,
    description: 'Administrar preguntas frecuentes',
  },
  {
    name: FAQPermissionsDict.SUGGEST_FAQ,
    description: 'Sugerir preguntas frecuentes',
  },
  {
    name: FAQPermissionsDict.VIEW_FAQ_SUGGESTIONS,
    description: 'Ver sugerencias de preguntas frecuentes',
  },
] as const

export default FAQPermissions
