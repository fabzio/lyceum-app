import { enrollmentModificationsSchema } from "@/database/schema/enrollmentModifications";

export const createEnrollmentModifications = enrollmentModificationsSchema.omit(
  { requestNumber: true }
)
