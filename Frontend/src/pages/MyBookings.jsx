import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { SkeletonTable } from '../components/ui/Skeleton'

export default function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    api.get('/bookings/my').then(({ data }) => {
      setBookings(data.bookings)
      setLoading(false)
    })
  }, [])

  const filters = ['All', 'Booked', 'In Transit', 'Delivered', 'Cancelled']
  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter)

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">My Bookings</h1>
          <p className="text-navy-600 text-sm mt-0.5">{bookings.length} total shipments</p>
        </div>
        <Link to="/book">
          <Button variant="primary" size="md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Booking
          </Button>
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto scrollbar-hide">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${filter === f ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-navy-600 border border-navy-200 hover:border-navy-300'}`}>
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="card"><SkeletonTable rows={5} /></div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-20">
          <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          </div>
          <p className="font-semibold text-navy-800 mb-1">No bookings found</p>
          <p className="text-sm text-navy-400 mb-5">
            {filter === 'All' ? "You haven't made any bookings yet." : `No ${filter} bookings.`}
          </p>
          <Link to="/book"><Button variant="primary" size="md">Book Your First Truck</Button></Link>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="card p-0 overflow-hidden hidden md:block">
            <table className="w-full">
              <thead className="bg-navy-100/60 border-b border-navy-200">
                <tr>
                  {['Route', 'Truck', 'Distance', 'Fare', 'Status', 'Date', ''].map(h => (
                    <th key={h} className="table-header text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b._id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <div className="space-y-0.5">
                          <p className="font-medium text-navy-800 text-sm">{b.source}</p>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            <p className="text-xs text-navy-400">{b.destination}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-navy-600">{b.truckId?.truckType}</td>
                    <td className="table-cell text-navy-600">{b.distance} km</td>
                    <td className="table-cell font-semibold text-primary-600">₹{b.price}</td>
                    <td className="table-cell"><Badge dot>{b.status}</Badge></td>
                    <td className="table-cell text-navy-400 text-xs">{new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="table-cell">
                      {b.status === 'In Transit' && (
                        <Link to={`/tracking/${b._id}`}>
                          <Button variant="primary" size="sm">Track Live</Button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filtered.map(b => (
              <div key={b._id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-navy-800">{b.source}</p>
                    <p className="text-sm text-navy-400">→ {b.destination}</p>
                  </div>
                  <Badge dot>{b.status}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  {[['Truck', b.truckId?.truckType], ['Distance', `${b.distance}km`], ['Fare', `₹${b.price}`]].map(([l, v]) => (
                    <div key={l} className="bg-navy-100/60 rounded-xl p-2">
                      <p className="text-xs text-navy-400">{l}</p>
                      <p className="text-sm font-semibold text-navy-800">{v}</p>
                    </div>
                  ))}
                </div>
                {b.status === 'In Transit' && (
                  <Link to={`/tracking/${b._id}`} className="block">
                    <Button variant="primary" size="sm" className="w-full">Track Live</Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
