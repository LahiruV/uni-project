import React from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
  showNavigation?: boolean
}

export function Layout({ children, showNavigation = true }: LayoutProps) {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className="min-h-screen bg-gray-100">
      {(showNavigation || !isAuthPage) && <Navbar />}
      <div className="pt-24 pb-16">
        {children}
      </div>
      <Footer />
    </div>
  )
}