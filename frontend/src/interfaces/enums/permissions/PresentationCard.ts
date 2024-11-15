export const PresentationCardPermissionsDict = {
  CREATE_PRESENTATION_CARD: 'CREATE_PRESENTATION_CARD',
  REVIEW_PRESENTATION_CARD: 'REVIEW_PRESENTATION_CARD',
  APPROVE_PRESENTATION_CARD: 'APPROVE_PRESENTATION_CARD',
  READ_PRESENTATION_CARD: 'READ_PRESENTATION_CARD',
} as const

export type PresentationCardPermissionsDict =
  keyof typeof PresentationCardPermissionsDict
