import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { Inbox, MessageSquare, Trash2, RefreshCw, CheckCircle } from 'lucide-react'
import { deleteFeedback, deleteInquiry, getFeedbacks, getInquiries, completeInquiry } from '../services/api'

interface FeedbackItem {
  id: string
  name: string
  email: string
  message: string
  type: string
  createdAt: Date
}

interface InquiryItem {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  program: string
  startDate: string
  priority: string
  message: string
  createdAt: Date
  status: string
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'feedback' | 'inquiries'>('feedback')
  const [loading, setLoading] = useState(false)
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([])
  const [inquiries, setInquiries] = useState<InquiryItem[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchFeedback = async () => {
    try {
      const response = await getFeedbacks()
      setFeedbacks(response.feedbacks)
    } catch (error) {
      console.error('Error fetching feedback:', error)
      setError('Failed to fetch feedback')
    }
  }
  const fetchInquiries = async () => {
    try {
      const response = await getInquiries()
      setInquiries(response.inquiries)
    } catch (error) {
      console.error('Error fetching inquiries:', error)
      setError('Failed to fetch inquiries')
    }
  }
  useEffect(() => {
    fetchInquiries()
    fetchFeedback()
  }, [])

  const handleDelete = async (id: string, type: 'feedback' | 'inquiry') => {
    if (type === 'feedback') {
      try {
        await deleteFeedback(id)
        fetchFeedback()
      }
      catch (error) {
        console.error('Error deleting feedback:', error)
      }
    } else {
      try {
        await deleteInquiry(id)
        fetchInquiries()
      }
      catch (error) {
        console.error('Error deleting inquiry:', error)
      }
    }
  }

  const handleComplete = async (id: string) => {
    try {
      const completedInquiry = await completeInquiry(id)
      const updatedInquiries = inquiries.map(inquiry =>
        inquiry.id === id ? completedInquiry : inquiry
      )
      setInquiries(updatedInquiries)
    } catch (error) {
      console.error('Error completing inquiry:', error)
      setError('Failed to complete inquiry')
    }
  }

  const handleRefresh = async () => {
    setLoading(true)
    fetchInquiries()
    fetchFeedback()
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
    setError(null)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="mt-4 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`${activeTab === 'feedback'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Feedback ({feedbacks.length})
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`${activeTab === 'inquiries'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Inbox className="h-5 w-5 mr-2" />
                  Inquiries ({inquiries.length})
                </button>
              </nav>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'feedback' ? (
              <div className="space-y-6">
                {feedbacks.map((feedback) => (
                  <div key={feedback.id} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{feedback.name}</h3>
                        <p className="text-sm text-gray-500">{feedback.email}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(feedback.id, 'feedback')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-600">{feedback.message}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {feedback.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {inquiry.firstName} {inquiry.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{inquiry.email}</p>
                        <p className="text-sm text-gray-500">{inquiry.phone}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(inquiry.id, 'inquiry')}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Program</p>
                        <p className="mt-1 text-sm text-gray-900">{inquiry.program}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Start Date</p>
                        <p className="mt-1 text-sm text-gray-900">{inquiry.startDate}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-600">{inquiry.message}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inquiry.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : inquiry.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                        }`}>
                        {inquiry.priority} priority
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inquiry.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {inquiry.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                        {inquiry.status === 'pending' && (
                          <button
                            onClick={() => handleComplete(inquiry.id)}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </button>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}