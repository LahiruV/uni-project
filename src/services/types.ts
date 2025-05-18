export interface Feedback {
  id: string
  name: string
  email: string
  message: string
  type: 'feedback' | 'bug' | 'feature' | 'other'
  createdAt: Date
  updatedAt: Date
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  name: string
  email: string
  password: string
}

export interface AdminLoginDto {
  email: string
  password: string
}

export interface AdminRegisterDto {
  name: string
  email: string
  password: string
  adminCode: string
}

export interface CreateFeedbackDto {
  name: string
  email: string
  message: string
  type: 'feedback' | 'bug' | 'feature' | 'other'
}

export interface GetFeedbacksResponse {
  feedbacks: Feedback[]
  total: number
}

export interface GetInquiriesResponse {
  inquiries: Inquiry[]
  total: number
}

export interface InquiryStatus {
  id: string
  status: 'pending' | 'completed'
  completedAt?: Date
  completedBy?: string
}

export interface Inquiry {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  program: string
  startDate: string
  priority: string
  message: string
  status: 'pending' | 'completed'
  createdAt: Date
  completedAt?: Date
  completedBy?: string
  userId: string
}

export interface UpdateInquiryDto {
  firstName?: string
  lastName?: string
  phone?: string
  program?: string
  startDate?: string
  priority?: string
  message?: string
}