import { z } from "zod";
export const createEnrollmentModificationDTO = z.object({
  studentId: z.string(),
  scheduleId: z.number(),
  state: z.enum(['requested', 'approved', 'denied']),
  requestType: z.enum(['aditional', 'withdrawal']),
  reason: z.string().optional(),
});