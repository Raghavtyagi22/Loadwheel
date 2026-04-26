import { useEffect, useState } from 'react'
import api from '../services/api'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { SkeletonTable } from '../components/ui/Skeleton'

const TABS = [
  { id: 'overview', label: 'Overview', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { id: 'Bookings', label: 'Bookings', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
  { id: 'Users', label: 'Users', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  { id: 'Trucks', label: 'Trucks', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2zM13 8h4l3 5v3h-7V8z" /></svg> },
  { id: 'Pricing', label: 'Pricing', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> }
]

// Mini bar chart component
function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs text-navy-400 font-medium">₹{d.value >= 1000 ? `${(d.value/1000).toFixed(1)}k` : d.value}</span>
          <div className="w-full bg-navy-100 rounded-t-lg overflow-hidden" style={{ height: '80px' }}>
            <div className="w-full bg-primary-600 rounded-t-lg transition-all duration-700"
              style={{ height: `${(d.value / max) * 100}%`, marginTop: `${100 - (d.value / max) * 100}%` }} />
          </div>
          <span className="text-xs text-navy-400">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])
  const [trucks, setTrucks] = useState([])
  const [pricing, setPricing] = useState(null)
  const [loadingData, setLoadingData] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.get('/admin/stats').then(({ data }) => setStats(data))
  }, [])

  useEffect(() => {
    if (tab === 'overview') return
    setLoadingData(true)
    const calls = {
      Bookings: () => api.get('/bookings').then(({ data }) => setBookings(data.bookings)),
      Users:    () => api.get('/users').then(({ data }) => setUsers(data.users)),
      Trucks:   () => api.get('/trucks').then(({ data }) => setTrucks(data.trucks)),
      Pricing:  () => api.get('/pricing').then(({ data }) => setPricing(data))
    }
    calls[tab]?.().finally(() => setLoadingData(false))
  }, [tab])

  const updatePricing = async (e) => {
    e.preventDefault()
    await api.put('/pricing', pricing)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const weeklyData = [
    { label: 'Mon', value: 12400 }, { label: 'Tue', value: 18200 }, { label: 'Wed', value: 9800 },
    { label: 'Thu', value: 24100 }, { label: 'Fri', value: 31500 }, { label: 'Sat', value: 28700 }, { label: 'Sun', value: 15300 }
  ]

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Admin Dashboard</h1>
        <p className="text-navy-600 text-sm mt-0.5">Platform overview and management</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 overflow-x-auto scrollbar-hide bg-navy-100/60 p-1 rounded-2xl w-fit">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${tab === t.id ? 'bg-white text-navy-800 shadow-card' : 'text-navy-600 hover:text-navy-800'}`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon="💰" label="Total Revenue" value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`} change={12} color="green" loading={!stats} />
            <StatCard icon="📦" label="Total Bookings" value={stats?.totalBookings || 0} change={8} color="blue" loading={!stats} />
            <StatCard icon="🚚" label="Active Trucks" value={stats?.activeTrucks || 0} color="yellow" loading={!stats} />
            <StatCard icon="👥" label="Total Users" value={stats?.totalUsers || 0} change={5} color="navy" loading={!stats} />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-navy-800">Weekly Revenue</h3>
                  <p className="text-xs text-navy-400 mt-0.5">Last 7 days performance</p>
                </div>
                <span className="badge-green">↑ 12% this week</span>
              </div>
              <BarChart data={weeklyData} />
            </div>
            <div className="card">
              <h3 className="font-semibold text-navy-800 mb-4">Booking Status</h3>
              <div className="space-y-3">
                {[
                  { label: 'Delivered', pct: 68, color: 'bg-success' },
                  { label: 'In Transit', pct: 18, color: 'bg-warning-500' },
                  { label: 'Booked', pct: 10, color: 'bg-primary-600' },
                  { label: 'Cancelled', pct: 4, color: 'bg-danger' }
                ].map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-navy-600">{label}</span>
                      <span className="font-semibold text-navy-800">{pct}%</span>
                    </div>
                    <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent bookings preview */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-800">Recent Activity</h3>
              <button onClick={() => setTab('Bookings')} className="text-sm text-primary-600 hover:underline font-medium">View all</button>
            </div>
            <div className="space-y-3">
              {[
                { route: 'Mumbai → Pune', truck: 'Heavy', fare: '₹4,200', status: 'Delivered' },
                { route: 'Delhi → Agra', truck: 'Medium', fare: '₹2,800', status: 'In Transit' },
                { route: 'Bangalore → Chennai', truck: 'Mini', fare: '₹1,500', status: 'Booked' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-navy-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center text-lg">🚚</div>
                    <div>
                      <p className="text-sm font-medium text-navy-800">{item.route}</p>
                      <p className="text-xs text-navy-400">{item.truck} Truck</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm text-primary-600">{item.fare}</span>
                    <Badge dot>{item.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bookings table */}
      {tab === 'Bookings' && (
        <div className="card p-0 overflow-hidden animate-fade-in">
          <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
            <h3 className="font-semibold text-navy-800">All Bookings</h3>
            <span className="badge-gray">{bookings.length} total</span>
          </div>
          {loadingData ? <div className="p-6"><SkeletonTable rows={6} /></div> : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-100/60">
                  <tr>{['Customer', 'Route', 'Truck', 'Distance', 'Fare', 'Status', 'Date'].map(h => <th key={h} className="table-header">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b._id} className="table-row">
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">{b.customerId?.name?.[0]}</div>
                          <span className="font-medium">{b.customerId?.name}</span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <p className="font-medium">{b.source}</p>
                        <p className="text-xs text-navy-400">→ {b.destination}</p>
                      </td>
                      <td className="table-cell text-navy-600">{b.truckId?.truckType}</td>
                      <td className="table-cell text-navy-600">{b.distance} km</td>
                      <td className="table-cell font-semibold text-primary-600">₹{b.price}</td>
                      <td className="table-cell"><Badge dot>{b.status}</Badge></td>
                      <td className="table-cell text-navy-400 text-xs">{new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Users table */}
      {tab === 'Users' && (
        <div className="card p-0 overflow-hidden animate-fade-in">
          <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
            <h3 className="font-semibold text-navy-800">All Users</h3>
            <span className="badge-gray">{users.length} registered</span>
          </div>
          {loadingData ? <div className="p-6"><SkeletonTable rows={6} /></div> : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-100/60">
                  <tr>{['User', 'Email', 'Phone', 'Role', 'Joined'].map(h => <th key={h} className="table-header">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="table-row">
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">{u.name?.[0]}</div>
                          <span className="font-medium">{u.name}</span>
                        </div>
                      </td>
                      <td className="table-cell text-navy-600">{u.email}</td>
                      <td className="table-cell text-navy-600">{u.phone}</td>
                      <td className="table-cell">
                        <Badge variant={u.role === 'admin' ? 'red' : u.role === 'driver' ? 'yellow' : 'blue'}>{u.role}</Badge>
                      </td>
                      <td className="table-cell text-navy-400 text-xs">{new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Trucks grid */}
      {tab === 'Trucks' && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-800">Fleet Overview</h3>
            <span className="badge-gray">{trucks.length} trucks</span>
          </div>
          {loadingData ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1,2,3].map(i => <div key={i} className="card"><div className="skeleton h-24 rounded-xl" /></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trucks.map(t => (
                <div key={t._id} className="card hover:shadow-elevated transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{t.truckType === 'Mini' ? '🚐' : t.truckType === 'Medium' ? '🚛' : '🚚'}</div>
                      <div>
                        <p className="font-semibold text-navy-800">{t.truckType} Truck</p>
                        <p className="text-xs text-navy-400">{t.registrationNumber}</p>
                      </div>
                    </div>
                    <Badge dot>{t.availability ? 'Available' : 'Busy'}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-navy-100/60 rounded-xl p-2">
                      <p className="text-navy-400">Capacity</p>
                      <p className="font-semibold text-navy-800">{t.capacity} tons</p>
                    </div>
                    <div className="bg-navy-100/60 rounded-xl p-2">
                      <p className="text-navy-400">Driver</p>
                      <p className="font-semibold text-navy-800 truncate">{t.driverId?.name || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pricing */}
      {tab === 'Pricing' && pricing && (
        <div className="max-w-lg animate-fade-in">
          <div className="card">
            <h3 className="font-semibold text-navy-800 mb-1">Pricing Configuration</h3>
            <p className="text-sm text-navy-400 mb-6">Changes apply to all new bookings immediately</p>
            <form onSubmit={updatePricing} className="space-y-4">
              {[
                { label: 'Base Fare per KM (₹)', key: 'baseFarePerKm', icon: '📏' },
                { label: 'Driver Allowance (₹)', key: 'driverAllowance', icon: '👤' },
                { label: 'Tax / GST (%)', key: 'taxPercentage', icon: '🏛️' },
                { label: 'Default Toll Cost (₹)', key: 'defaultTollCost', icon: '🛣️' }
              ].map(({ label, key, icon }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">
                    {icon} {label}
                  </label>
                  <input type="number" className="input" value={pricing[key] || ''}
                    onChange={(e) => setPricing({ ...pricing, [key]: Number(e.target.value) })} />
                </div>
              ))}
              <Button type="submit" variant={saved ? 'success' : 'primary'} size="lg" className="w-full">
                {saved ? (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Saved!</>
                ) : 'Save Pricing Rules'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
