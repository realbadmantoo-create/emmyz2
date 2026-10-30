export type UserRole = 'employee' | 'admin';

export interface User {
  id: string;
  employeeId: string; // e.g. "QS-ENG-104"
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  title: string;
  createdAt: string;
}

export type SubmissionType = 'suggestion' | 'issue';

export type SubmissionStatus = 
  | 'pending'       // Bitegerejwe
  | 'in_progress'   // Biri gukorwaho
  | 'resolved'      // Byasubijwe / Byakemutse
  | 'implemented';  // Cyemejwe / Byashyizwe mu bikorwa

export type SubmissionUrgency = 'normal' | 'high' | 'urgent';

export type SubmissionCategory = 
  | 'safety'       // Umutekano n'Ubuzima ku kazi
  | 'operations'   // Imikorere n'Umusaruro
  | 'equipment'    // Ibikoresho n'Imashini
  | 'welfare'      // Imibereho y'Abakozi n'Imishahara
  | 'management'   // Imiyoborere n'Itumanaho
  | 'other';       // Ibindi

export interface ResponseMessage {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorTitle: string;
  message: string;
  createdAt: string;
  isOfficialResolution?: boolean;
}

export interface Submission {
  id: string;
  ticketNumber: string; // e.g. "QS-TKT-2026-001"
  type: SubmissionType; // 'suggestion' | 'issue'
  title: string;
  description: string;
  category: SubmissionCategory;
  urgency: SubmissionUrgency;
  isAnonymous: boolean;
  author: {
    id: string;
    name: string;
    employeeId: string;
    department: string;
  };
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  responses: ResponseMessage[];
  assignedTo?: string; // Department or Officer name
  internalNotes?: string; // Visible only to admin
}

export type Language = 'rw' | 'en';
