import React, { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { Send, BookOpen, Loader2, Clock, CheckCircle, Edit, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import type { Inquiry, UpdateInquiryDto } from '../services/types'

const mockInquiries: Inquiry[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '0412345678',
    program: 'Computer Science',
    startDate: '2024-07-01',
    priority: 'high',
    message: 'Interested in AI specialization',
    status: 'pending',
    createdAt: new Date('2024-03-15'),
    userId: 'user123'
  }
]

export function Inquiry() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingInquiry, setEditingInquiry] = useState<string | null>(null)
  const [userInquiries, setUserInquiries] = useState<Inquiry[]>([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    startDate: '',
    priority: '',
    priority: '',
    message: ''
  })
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // In a real app, fetch user's inquiries from API
    setUserInquiries(mockInquiries)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (editingInquiry) {
      // Update existing inquiry
      const updatedInquiries = userInquiries.map(inquiry => 
        inquiry.id === editingInquiry 
          ? { ...inquiry, ...formData }
          : inquiry
      )
      setUserInquiries(updatedInquiries)
      setEditingInquiry(null)
    } else {
      // Create new inquiry
      const newInquiry: Inquiry = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending',
        createdAt: new Date(),
        userId: 'user123', // In real app, get from auth context
        email: 'user@example.com' // In real app, get from auth context
      }
      setUserInquiries([...userInquiries, newInquiry])
    }
    
    setSuccess(true)
    setLoading(false)
    setShowForm(false)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      program: '',
      startDate: '',
      message: ''
    })
  }

  const handleEdit = (inquiry: Inquiry) => {
    setFormData({
      firstName: inquiry.firstName,
      lastName: inquiry.lastName,
      email: inquiry.email,
      phone: inquiry.phone,
      program: inquiry.program,
      startDate: inquiry.startDate,
      priority: inquiry.priority,
      message: inquiry.message
    })
    setEditingInquiry(inquiry.id)
    setShowForm(true)
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="h-8 w-8 text-yellow-500" />
            <h1 className="text-2xl font-bold text-gray-900">My Inquiries</h1>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600"
            >
              <Send className="h-4 w-4 mr-2" />
              New Inquiry
            </button>
          )}
        </div>

        {/* List of user's inquiries */}
        {!showForm && (
          <div className="space-y-6">
            {userInquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {inquiry.program}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Submitted on {new Date(inquiry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {inquiry.status === 'pending' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="h-4 w-4 mr-1" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completed
                      </span>
                    )}
                    {inquiry.status === 'pending' && (
                      <button
                        onClick={() => handleEdit(inquiry)}
                        className="text-gray-400 hover:text-yellow-500"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="mt-1">{inquiry.firstName} {inquiry.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Contact</p>
                    <p className="mt-1">{inquiry.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Start Date</p>
                    <p className="mt-1">{inquiry.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Priority</p>
                    <p className="mt-1 capitalize">{inquiry.priority}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">Message</p>
                  <p className="mt-1 text-gray-600">{inquiry.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inquiry form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingInquiry ? 'Edit Inquiry' : 'New Inquiry'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingInquiry(null)
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">
                  {editingInquiry 
                    ? 'Inquiry updated successfully!'
                    : 'Thank you for your inquiry! We\'ll get back to you soon.'}
                </p>
              </div>
            )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="program" className="block text-sm font-medium text-gray-700">
                Program of Interest
              </label>
              <select
                id="program"
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                required
              >
                <option value="">Select a program</option>
                <option value="computer-science">Computer Science</option>
                <option value="business">Business Administration</option>
                <option value="engineering">Engineering</option>
                <option value="arts">Arts & Design</option>
                <option value="medicine">Medicine</option>
              </select>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Preferred Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority Level
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                required
              >
                <option value="">Select priority</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Additional Information
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                placeholder="Tell us about your academic background and goals..."
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {loading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>)}
      </div>
    </Layout>
  )
}