import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { AuthHeader } from '../components/AuthHeader'
import { Shield, Loader2 } from 'lucide-react'
import { adminRegister } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import type { AdminRegisterDto } from '../services/types'

export function AdminRegister() {
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<AdminRegisterDto>({
    name: '',
    email: '',
    password: '',
    adminCode: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { token } = await adminRegister(formData)
      authLogin(token)
      navigate('/admin')
    } catch (err) {
      console.log(err);

      setError('Registration failed. Please verify your  Username and Password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout showNavigation={false}>
      <AuthHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
          <div className="hidden lg:block lg:w-1/2 relative">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
              alt="Admin registration"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
          <div className="w-full lg:w-1/2 p-8">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Shield className="h-8 w-8 text-yellow-500" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Registration</h1>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Admin Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              {/* <div>
                <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700">
                  Admin Registration Code
                </label>
                <input
                  type="text"
                  id="adminCode"
                  value={formData.adminCode}
                  onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div> */}

              <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Shield className="h-4 w-4 mr-2" />
                )}
                {loading ? 'Creating account...' : 'Create Admin Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an admin account?{' '}
                <Link to="/admin/login" className="font-medium text-yellow-500 hover:text-yellow-600">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}