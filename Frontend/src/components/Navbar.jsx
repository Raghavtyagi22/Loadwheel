import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const TruckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2zM13 8h4l3 5v3h-7V8z" />
  </svg>
)

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
)

const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const isPublic = ['/', '/login', '/register'].includes(location.pathname)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setDropdownOpen(false)
  }

  const roleColor = { admin: 'badge-red', driver: 'badge-yellow', customer: 'badge-blue' }

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-navy-200/60 shadow-card">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Left: Logo + hamburger */}
        <div className="flex items-center gap-3">
          {user && !isPublic && (
            <button onClick={onMenuClick} className="btn-ghost btn-icon lg:hidden">
              <MenuIcon />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:bg-primary-700 transition-colors">
              <TruckIcon />
            </div>
            <span className="text-lg font-bold text-navy-800 tracking-tight hidden sm:block">
              Load<span className="text-primary-600">Wheel</span>
            </span>
          </Link>
        </div>

        {/* Center: Nav links (public) */}
        {isPublic && (
          <nav className="hidden md:flex items-center gap-1">
            {[['Features', '#features'], ['How it works', '#how'], ['Pricing', '#pricing']].map(([label, href]) => (
              <a key={label} href={href}
                className="px-3 py-2 text-sm font-medium text-navy-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                {label}
              </a>
            ))}
          </nav>
        )}

        {/* Right */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Notification bell */}
              <button className="btn-ghost btn-icon relative">
                <BellIcon />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
              </button>

              {/* Avatar dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-navy-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-navy-800 leading-tight">{user.name}</p>
                    <p className="text-xs text-navy-400 capitalize">{user.role}</p>
                  </div>
                  <svg className={`w-4 h-4 text-navy-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-modal border border-navy-200/60 py-1.5 animate-fade-in z-50">
                    <div className="px-4 py-2.5 border-b border-navy-100">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-navy-400">{user.email}</p>
                    </div>
                    {[
                      user.role === 'customer' && { label: 'My Bookings', to: '/my-bookings' },
                      user.role === 'driver'   && { label: 'Driver Panel', to: '/driver' },
                      user.role === 'admin'    && { label: 'Admin Dashboard', to: '/admin' }
                    ].filter(Boolean).map(({ label, to }) => (
                      <Link key={to} to={to} onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-600 hover:bg-navy-100 hover:text-navy-800 transition-colors">
                        {label}
                      </Link>
                    ))}
                    <div className="border-t border-navy-100 mt-1 pt-1">
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-danger hover:bg-danger-50 transition-colors">
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-md hidden sm:inline-flex">Sign in</Link>
              <Link to="/register" className="btn btn-primary btn-md">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
