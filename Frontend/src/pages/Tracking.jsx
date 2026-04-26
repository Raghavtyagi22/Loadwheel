import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import api from '../services/api'
import MapView from '../components/MapView'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const steps = ['Booked', 'In Transit', 'Delivered']

export default function Tracking() {
  const { id } = useParams()
  const [booking, setBooking] = useState(null)
  const [driverLocation, setDriverLocation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMsg, setNewMsg] = useState('')
  const [socket, setSocket] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    api.get(`/bookings/${id}`).then(({ data }) => setBooking(data.booking))
    const s = io('http://localhost:5000', { auth: { token: localStorage.getItem('token') } })
    setSocket(s)
    s.emit('join-booking', id)
    s.on('driver-location', (loc) => setDriverLocation(loc))
    s.on('chat-message', (msg) => setMessages(prev => [...prev, msg]))
    return () => s.disconnect()
  }, [id])

  const sendMessage = () => {
    if (!newMsg.trim() || !socket) return
    socket.emit('chat-message', { bookingId: id, text: newMsg })
    setMessages(prev => [...prev, { text: newMsg, sender: 'You', time: new Date().toLocaleTimeString() }])
    setNewMsg('')
  }

  const currentStep = booking ? steps.indexOf(booking.status) : 0

  if (!booking) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-navy-600">Loading tracking info...</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Live Tracking</h1>
          <p className="text-navy-400 text-sm mt-0.5">Booking #{id.slice(-8).toUpperCase()}</p>
        </div>
        <Badge dot>{booking.status}</Badge>
      </div>

      {/* Progress bar */}
      <div className="card mb-6">
        <div className="flex items-center">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i <= currentStep ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' : 'bg-navy-100 text-navy-400'}`}>
                  {i < currentStep ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  ) : i + 1}
                </div>
                <p className={`text-xs mt-1.5 font-medium ${i <= currentStep ? 'text-primary-600' : 'text-navy-400'}`}>{step}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-5 transition-all ${i < currentStep ? 'bg-primary-600' : 'bg-navy-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Map */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-0 overflow-hidden">
            <MapView source={booking.source} destination={booking.destination} driverLocation={driverLocation} />
            {driverLocation && (
              <div className="px-4 py-3 bg-success-50 border-t border-success/20 flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <p className="text-sm text-success-600 font-medium">Driver location updating live</p>
              </div>
            )}
          </div>

          {/* Route info */}
          <div className="card">
            <h3 className="font-semibold text-navy-800 mb-4">Shipment Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'From', value: booking.source },
                { label: 'To', value: booking.destination },
                { label: 'Distance', value: `${booking.distance} km` },
                { label: 'Total Fare', value: `₹${booking.price}`, highlight: true }
              ].map(({ label, value, highlight }) => (
                <div key={label} className="p-3 bg-navy-100/60 rounded-xl">
                  <p className="text-xs text-navy-400 mb-1">{label}</p>
                  <p className={`font-semibold text-sm ${highlight ? 'text-primary-600' : 'text-navy-800'}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-5">
          {/* Driver card */}
          <div className="card">
            <h3 className="font-semibold text-navy-800 mb-4">Your Driver</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                {booking.truckId?.driverId?.name?.[0] || 'D'}
              </div>
              <div>
                <p className="font-semibold text-navy-800">{booking.truckId?.driverId?.name || 'Driver'}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-warning-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="text-xs text-navy-600">4.9 · 1,240 trips</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-navy-100/60 rounded-xl mb-4">
              <p className="text-xs text-navy-400">Truck</p>
              <p className="font-semibold text-sm">{booking.truckId?.truckType} Truck · {booking.truckId?.capacity} tons</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm" className="w-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call
              </Button>
              <Button variant="primary" size="sm" className="w-full" onClick={() => setChatOpen(true)}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Chat
              </Button>
            </div>
          </div>

          {/* Chat panel */}
          <div className={`card flex flex-col transition-all ${chatOpen ? 'h-80' : 'h-auto'}`}>
            <button onClick={() => setChatOpen(!chatOpen)} className="flex items-center justify-between w-full">
              <h3 className="font-semibold text-navy-800 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Driver Chat
                {messages.length > 0 && <span className="badge-blue">{messages.length}</span>}
              </h3>
              <svg className={`w-4 h-4 text-navy-400 transition-transform ${chatOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>

            {chatOpen && (
              <>
                <div className="flex-1 overflow-y-auto space-y-2 mt-4 scrollbar-hide">
                  {messages.length === 0 ? (
                    <p className="text-center text-xs text-navy-400 py-6">No messages yet</p>
                  ) : messages.map((m, i) => (
                    <div key={i} className={`flex ${m.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.sender === 'You' ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-navy-100 text-navy-800 rounded-bl-sm'}`}>
                        <p>{m.text}</p>
                        <p className={`text-xs mt-0.5 ${m.sender === 'You' ? 'text-primary-100' : 'text-navy-400'}`}>{m.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <input className="input flex-1 text-sm py-2" placeholder="Type a message..." value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
                  <Button variant="primary" size="icon" onClick={sendMessage}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
