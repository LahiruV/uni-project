import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface LayoutProps {
  children: React.ReactNode
  showNavigation?: boolean
}

export function Layout({ children, showNavigation = true }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  const isAdminPage = location.pathname.startsWith('/admin')

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {isAdminPage ? (
        <div className="bg-white shadow-lg fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-bold text-yellow-500">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        (showNavigation || !isAuthPage) && <Navbar />
      )}
      <div className="pt-24 pb-16">
        {children}
      </div>
      {!isAdminPage && <Footer />}
    </div>
  )
}