import { Thesis } from "./Thesis";

export interface ThesisJuryRequest {
    id: string
    thesis: Thesis
    jury: { code: string; name: string }[]
    status: 'approved' | 'pending'
    approvalHistory: {
      step: string
      status: 'completed' | 'current' | 'pending'
      name: string
      canDownload?: boolean
    }[]
  }