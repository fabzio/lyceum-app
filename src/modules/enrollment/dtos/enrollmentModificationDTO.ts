import { enrollmentModificationsSchema } from "@/database/schema/enrollmentModifications";

export const createEnrollmentModificationDTO = enrollmentModificationsSchema.omit(
  { requestNumber: true }
)
