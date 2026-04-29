import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookTruck from './pages/BookTruck'
import MyBookings from './pages/MyBookings'
import Tracking from './pages/Tracking'
import DriverPanel from './pages/DriverPanel'
import AdminDashboard from './pages/AdminDashboard'

const PUBLIC_PATHS = ['/', '/login', '/register']

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const location = useLocation()
  const isPublic = PUBLIC_PATHS.includes(location.pathname)
  const showSidebar = user && !isPublic

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${showSidebar ? 'lg:ml-64' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/book" element={
              <ProtectedRoute roles={['customer']}><BookTruck /></ProtectedRoute>
            } />
            <Route path="/my-bookings" element={
              <ProtectedRoute roles={['customer']}><MyBookings /></ProtectedRoute>
            } />
            <Route path="/tracking/:id" element={
              <ProtectedRoute><Tracking /></ProtectedRoute>
            } />
            <Route path="/driver" element={
              <ProtectedRoute roles={['driver']}><DriverPanel /></ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
            } />

            <Route path="*" element={
              <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
                <div className="w-20 h-20 bg-navy-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-navy-800 mb-2">Page not found</h2>
                <p className="text-navy-600 mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn btn-primary btn-md">Go Home</a>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}
