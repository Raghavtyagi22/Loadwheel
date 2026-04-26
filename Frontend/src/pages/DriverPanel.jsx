import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import StatCard from '../components/ui/StatCard'
import MapView from '../components/MapView'

export default function DriverPanel() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [available, setAvailable] = useState(true)
  const [tracking, setTracking] = useState(null)
  const [loading, setLoading] = useState(true)
  const socketRef = useRef(null)
  const watchRef = useRef(null)

  useEffect(() => {
    api.get('/bookings/driver').then(({ data }) => {
      setBookings(data.bookings)
      setLoading(false)
    })
    socketRef.current = io('http://localhost:5000', { auth: { token: localStorage.getItem('token') } })
    return () => {
      socketRef.current?.disconnect()
      if (watchRef.current) navigator.geolocation.clearWatch(watchRef.current)
    }
  }, [])

  const toggleAvailability = async () => {
    await api.patch('/trucks/availability', { availability: !available })
    setAvailable(!available)
  }

  const startTracking = (bookingId) => {
    setTracking(bookingId)
    watchRef.current = navigator.geolocation.watchPosition(
      (pos) => socketRef.current?.emit('driver-location', { bookingId, lat: pos.coords.latitude, lng: pos.coords.longitude }),
      null, { enableHighAccuracy: true, maximumAge: 5000 }
    )
  }

  const updateStatus = async (bookingId, status) => {
    await api.patch(`/bookings/${bookingId}/status`, { status })
    setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status } : b))
    if (status === 'Delivered' && watchRef.current) {
      navigator.geolocation.clearWatch(watchRef.current)
      setTracking(null)
    }
  }

  const activeBooking = bookings.find(b => b.status === 'In Transit')
  const earnings = bookings.filter(b => b.status === 'Delivered').reduce((s, b) => s + (b.price * 0.8), 0)

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Driver Dashboard</h1>
          <p className="text-navy-600 text-sm mt-0.5">Welcome back, {user?.name}</p>
        </div>
        <button onClick={toggleAvailability}
          className={`flex items-center gap-3 px-5 py-3 rounded-2xl border-2 font-semibold text-sm transition-all ${available ? 'border-success/30 bg-success-50 text-success-600 hover:bg-success/10' : 'border-navy-200 bg-navy-100 text-navy-600 hover:bg-navy-200'}`}>
          <span className={`w-3 h-3 rounded-full ${available ? 'bg-success animate-pulse' : 'bg-navy-400'}`} />
          {available ? 'Online — Accepting Rides' : 'Offline — Not Available'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="💰" label="Today's Earnings" value={`₹${Math.round(earnings)}`} color="green" loading={loading} />
        <StatCard icon="📦" label="Total Trips" value={bookings.filter(b => b.status === 'Delivered').length} color="blue" loading={loading} />
        <StatCard icon="⏳" label="Pending" value={bookings.filter(b => b.status === 'Booked').length} color="yellow" loading={loading} />
        <StatCard icon="⭐" label="Rating" value="4.9" color="navy" loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Active trip map */}
        <div className="lg:col-span-2 space-y-5">
          {activeBooking ? (
            <div className="card p-0 overflow-hidden">
              <div className="px-5 py-4 border-b border-navy-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-navy-800">Active Trip</p>
                  <p className="text-sm text-navy-400">{activeBooking.source} → {activeBooking.destination}</p>
                </div>
                <Badge dot>In Transit</Badge>
              </div>
              <MapView source={activeBooking.source} destination={activeBooking.destination} />
              <div className="p-4 flex gap-3">
                {tracking !== activeBooking._id && (
                  <Button variant="secondary" size="md" className="flex-1" onClick={() => startTracking(activeBooking._id)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                    Share Location
                  </Button>
                )}
                {tracking === activeBooking._id && (
                  <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-success-50 rounded-xl">
                    <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-sm text-success-600 font-medium">Broadcasting location live</span>
                  </div>
                )}
                <Button variant="success" size="md" className="flex-1" onClick={() => updateStatus(activeBooking._id, 'Delivered')}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Mark Delivered
                </Button>
              </div>
            </div>
          ) : (
            <div className="card text-center py-16">
              <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              </div>
              <p className="font-semibold text-navy-800">No active trip</p>
              <p className="text-sm text-navy-400 mt-1">Stay online to receive booking requests</p>
            </div>
          )}
        </div>

        {/* Bookings list */}
        <div className="space-y-4">
          <h2 className="font-semibold text-navy-800">Assigned Bookings</h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="card"><div className="skeleton h-20 rounded-xl" /></div>)}
            </div>
          ) : bookings.length === 0 ? (
            <div className="card text-center py-10 text-navy-400 text-sm">No bookings assigned yet</div>
          ) : (
            <div className="space-y-3">
              {bookings.map(b => (
                <div key={b._id} className="card hover:shadow-elevated transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm text-navy-800 truncate">{b.source}</p>
                      <p className="text-xs text-navy-400 truncate">→ {b.destination}</p>
                    </div>
                    <Badge dot>{b.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-navy-400 mb-3">
                    <span>{b.distance} km</span>
                    <span className="font-semibold text-primary-600 text-sm">₹{Math.round(b.price * 0.8)} earned</span>
                  </div>
                  {b.status === 'Booked' && (
                    <Button variant="primary" size="sm" className="w-full"
                      onClick={() => { updateStatus(b._id, 'In Transit'); startTracking(b._id) }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Start Trip
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
