import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const location = useLocation()
  const { isAuthenticated, logout } = useAuth()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-yellow-500">
              Deakin University
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthPage && (
              <>
                <Link to="/" className={`${location.pathname === '/' ? 'text-yellow-500' : 'text-gray-700 hover:text-yellow-500'}`}>
                  Home
                </Link>
                <Link to="/feedback" className={`${location.pathname === '/feedback' ? 'text-yellow-500' : 'text-gray-700 hover:text-yellow-500'}`}>
                  Feedback
                </Link>
                <Link to="/chatbot" className={`${location.pathname === '/chatbot' ? 'text-yellow-500' : 'text-gray-700 hover:text-yellow-500'}`}>
                  Chat
                </Link>
                <Link to="/inquiry" className={`${location.pathname === '/inquiry' ? 'text-yellow-500' : 'text-gray-700 hover:text-yellow-500'}`}>
                  Inquiry
                </Link>
              </>
            )}
            {!isAuthenticated ? (
              <>
                <Link to="/login" className={`${location.pathname === '/login' ? 'text-yellow-500' : 'text-gray-700 hover:text-yellow-500'}`}>
                  Sign In
                </Link>
                <Link to="/register" className={`${location.pathname === '/register' ? 'text-yellow-500' : 'text-gray-700 hover:text-yellow-500'}`}>
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="text-gray-700 hover:text-yellow-500 flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {!isAuthPage && (
                <>
                  <Link
                    to="/"
                    className={`block px-3 py-2 ${isActive('/')}`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/feedback"
                    className={`block px-3 py-2 ${isActive('/feedback')}`}
                  >
                    Feedback
                  </Link>
                  <Link
                    to="/chatbot"
                    className={`block px-3 py-2 ${isActive('/chatbot')}`}
                  >
                    Chat
                  </Link>
                  <Link
                    to="/inquiry"
                    className={`block px-3 py-2 ${isActive('/inquiry')}`}
                  >
                    Inquiry
                  </Link>
                </>
              )}
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className={`block px-3 py-2 ${isActive('/login')}`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className={`block px-3 py-2 ${isActive('/register')}`}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600 w-full text-left flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}