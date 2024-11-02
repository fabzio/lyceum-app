export interface EnrollmentModification {
    studentId: string; 
    scheduleId: number;
    state: 'requested' | 'approved' | 'denied';
    requestType: 'aditional' | 'withdrawal'; 
    reason?: string;
}
