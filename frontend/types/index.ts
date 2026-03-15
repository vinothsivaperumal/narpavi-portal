export interface User {
  id: string;
  email: string;
  role: 'admin' | 'student';
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  batchId: string | null;
  batchName?: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated';
  phone?: string;
}

export interface Batch {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  studentCount: number;
  status: 'upcoming' | 'active' | 'completed';
  createdAt: string;
}

export interface Lesson {
  id: string;
  batchId: string;
  batchName?: string;
  title: string;
  description: string;
  youtubeUrl: string;
  order: number;
  createdAt: string;
  completed?: boolean;
}

export interface IpRequest {
  id: string;
  studentId: string;
  studentName?: string;
  studentEmail?: string;
  ipAddress: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName?: string;
  studentEmail?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  paidAt?: string;
  description: string;
  invoiceNumber: string;
}

export interface Agreement {
  id: string;
  studentId: string;
  studentName?: string;
  studentEmail?: string;
  title: string;
  type: 'enrollment' | 'terms' | 'nda' | 'other';
  status: 'pending' | 'sent' | 'signed' | 'declined';
  boldSignDocumentId?: string;
  sentAt?: string;
  signedAt?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName?: string;
  recipientId: string;
  recipientName?: string;
  subject: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface DashboardStats {
  totalStudents?: number;
  activeBatches?: number;
  pendingIpRequests?: number;
  pendingPayments?: number;
  unsignedAgreements?: number;
  totalLessons?: number;
  completedLessons?: number;
  ipRequestStatus?: string;
}
