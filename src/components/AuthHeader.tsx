import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export function AuthHeader() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-yellow-500" />
            <span className="text-xl font-bold text-gray-900">Deakin University</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to={isLogin ? '/register' : '/login'}
              className="text-sm font-medium text-yellow-500 hover:text-yellow-600"
            >
              {isLogin ? 'Create account' : 'Sign in'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}