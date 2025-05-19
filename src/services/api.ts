import { CreateFeedbackDto, Feedback, GetFeedbacksResponse, GetInquiriesResponse, Inquiry, UpdateInquiryDto } from './types'
import type { LoginDto, RegisterDto, AdminLoginDto, AdminRegisterDto } from './types'

const API_URL = 'http://localhost:3000/api'

// Feedback API calls
export async function getFeedbacks(): Promise<GetFeedbacksResponse> {
  const response = await fetch(`${API_URL}/feedback`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch feedbacks')
  }

  return response.json()
}

export async function createFeedback(feedback: CreateFeedbackDto): Promise<Feedback> {
  const response = await fetch(`${API_URL}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(feedback),
  })

  if (!response.ok) {
    throw new Error('Failed to create feedback')
  }

  return response.json()
}

export async function updateFeedback(id: string, feedback: Partial<CreateFeedbackDto>): Promise<Feedback> {
  const response = await fetch(`${API_URL}/feedback/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(feedback),
  })

  if (!response.ok) {
    throw new Error('Failed to update feedback')
  }

  return response.json()
}

export async function deleteFeedback(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/feedback/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete feedback')
  }
}

// Inquiry API calls
export async function getInquiries(): Promise<GetInquiriesResponse> {
  const response = await fetch(`${API_URL}/inquiries`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch inquiries')
  }

  return response.json()
}

export async function getInquiry(id: string): Promise<Inquiry> {
  const response = await fetch(`${API_URL}/inquiries/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch inquiry')
  }

  return response.json()
}

export async function createInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> {
  const response = await fetch(`${API_URL}/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(inquiry),
  })

  if (!response.ok) {
    throw new Error('Failed to create inquiry')
  }

  return response.json()
}

export async function updateInquiry(id: string, inquiry: UpdateInquiryDto): Promise<Inquiry> {
  const response = await fetch(`${API_URL}/inquiries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(inquiry),
  })

  if (!response.ok) {
    throw new Error('Failed to update inquiry')
  }

  return response.json()
}

export async function deleteInquiry(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/inquiries/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete inquiry')
  }
}

export async function completeInquiry(id: string): Promise<Inquiry> {
  const response = await fetch(`${API_URL}/inquiries/${id}/complete`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to complete inquiry')
  }

  return response.json()
}

export async function login(credentials: LoginDto): Promise<{ token: string }> {
  // Default admin login
  if (credentials.email === 'admin@gmail.com' && credentials.password === 'admin') {
    return {
      token: 'admin-token'
    }
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Invalid credentials')
  }

  return response.json()
}

export async function register(data: RegisterDto): Promise<{ token: string }> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Registration failed')
  }

  return response.json()
}

export async function adminLogin(credentials: AdminLoginDto): Promise<{ token: string }> {
  // Default admin login for testing
  if (credentials.email === 'admin@deakin.edu.au' && credentials.password === 'admin123') {
    return {
      token: 'admin-token'
    }
  }

  const response = await fetch(`${API_URL}/auth/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Invalid admin credentials')
  }

  return response.json()
}

export async function adminRegister(data: AdminRegisterDto): Promise<{ token: string }> {
  const response = await fetch(`${API_URL}/auth/admin/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Admin registration failed')
  }

  return response.json()
}

export async function getUser(): Promise<{ token: string }> {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }

  return response.json()
}
