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

export interface CreateFeedbackDto {
  name: string
  email: string
  message: string
  type: 'feedback' | 'bug' | 'feature' | 'other'
}