import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, BookOpen, Users, Globe, Heart, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">About Deakin</h3>
            </div>
            <p className="text-gray-600">
              A leading Australian university committed to excellence in education, research, and innovation.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Academics</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <a href="/programs" className="text-gray-600 hover:text-yellow-500">Programs</a>
              </li>
              <li>
                <a href="/faculties" className="text-gray-600 hover:text-yellow-500">Faculties</a>
              </li>
              <li>
                <a href="/research" className="text-gray-600 hover:text-yellow-500">Research</a>
              </li>
              <li>
                <a href="/library" className="text-gray-600 hover:text-yellow-500">Library</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Student Life</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <a href="/campus-life" className="text-gray-600 hover:text-yellow-500">Campus Life</a>
              </li>
              <li>
                <a href="/clubs" className="text-gray-600 hover:text-yellow-500">Clubs & Societies</a>
              </li>
              <li>
                <a href="/support" className="text-gray-600 hover:text-yellow-500">Student Support</a>
              </li>
              <li>
                <a href="/housing" className="text-gray-600 hover:text-yellow-500">Housing</a>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-600 hover:text-yellow-500">Admin Portal</Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span>admissions@deakin.edu.au</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span>1800 DEAKIN (1800 332 546)</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span>221 Burwood Highway<br />Burwood, VIC 3125</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">
              © {currentYear} Deakin University. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-gray-600">Inspiring the next generation with</span>
              <Heart className="h-4 w-4 text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}