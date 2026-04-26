import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const icons = {
  home:     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  truck:    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2zM13 8h4l3 5v3h-7V8z" /></svg>,
  bookmark: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  map:      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  chart:    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  users:    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  settings: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  nav:      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
}

const navByRole = {
  customer: [
    { label: 'Book a Truck', to: '/book', icon: 'truck' },
    { label: 'My Bookings', to: '/my-bookings', icon: 'bookmark' }
  ],
  driver: [
    { label: 'Dashboard', to: '/driver', icon: 'home' },
    { label: 'Navigation', to: '/driver', icon: 'nav' }
  ],
  admin: [
    { label: 'Dashboard', to: '/admin', icon: 'chart' },
    { label: 'Bookings', to: '/admin?tab=Bookings', icon: 'bookmark' },
    { label: 'Users', to: '/admin?tab=Users', icon: 'users' },
    { label: 'Trucks', to: '/admin?tab=Trucks', icon: 'truck' },
    { label: 'Pricing', to: '/admin?tab=Pricing', icon: 'settings' }
  ]
}

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth()
  const location = useLocation()
  const links = navByRole[user?.role] || []

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div className="fixed inset-0 z-30 bg-navy-800/30 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onClose} />
      )}

      {/* Sidebar panel */}
      <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-30 w-64 bg-white border-r border-navy-200/60
        flex flex-col transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-4">
          <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider px-3 mb-3">
            {user?.role === 'admin' ? 'Management' : user?.role === 'driver' ? 'Driver Tools' : 'Logistics'}
          </p>
          <nav className="space-y-0.5">
            {links.map(({ label, to, icon }) => {
              const active = location.pathname === to.split('?')[0]
              return (
                <Link key={label} to={to} onClick={onClose}
                  className={active ? 'sidebar-link-active' : 'sidebar-link'}>
                  {icons[icon]}
                  <span>{label}</span>
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600" />}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* User info at bottom */}
        <div className="p-3 border-t border-navy-100">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-navy-100/60">
            <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-navy-800 truncate">{user?.name}</p>
              <p className="text-xs text-navy-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
