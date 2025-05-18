import { CreateFeedbackDto, Feedback } from './types'
import type { LoginDto, RegisterDto } from './types'

const API_URL = '/api'

export async function createFeedback(feedback: CreateFeedbackDto): Promise<Feedback> {
  const response = await fetch(`${API_URL}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
  })

  if (!response.ok) {
    throw new Error('Failed to delete feedback')
  }
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