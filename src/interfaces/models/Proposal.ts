

export interface Proposal{
    id: number;
    specialityId: number;
    accountId: string;
    termId: number;
    state: 'requested' | 'sended' | 'aproved' | 'assigned';
    createdAt: Date | null;
  };