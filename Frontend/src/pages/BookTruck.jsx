import { useState } from 'react'
import api from '../services/api'
import MapView from '../components/MapView'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { SkeletonCard } from '../components/ui/Skeleton'
import { useNavigate } from 'react-router-dom'

const truckMeta = {
  Mini:   { icon: '🚐', desc: 'Up to 1 ton · Small moves', tag: 'Fastest' },
  Medium: { icon: '🚛', desc: 'Up to 5 tons · Mid-size cargo', tag: 'Popular' },
  Heavy:  { icon: '🚚', desc: 'Up to 20 tons · Large freight', tag: 'Best Value' }
}

function TruckCard({ truck, selected, onSelect }) {
  const meta = truckMeta[truck.truckType] || {}
  return (
    <div onClick={() => truck.availability && onSelect(truck)}
      className={`relative p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer
        ${!truck.availability ? 'opacity-50 cursor-not-allowed border-navy-200 bg-navy-100/40' :
          selected ? 'border-primary-600 bg-primary-50 shadow-glow' :
          'border-navy-200 bg-white hover:border-primary-300 hover:shadow-elevated'}`}>
      {meta.tag && truck.availability && (
        <span className="absolute -top-2.5 left-4 badge-blue text-xs">{meta.tag}</span>
      )}
      <div className="flex items-start gap-3">
        <div className="text-3xl">{meta.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-navy-800">{truck.truckType} Truck</p>
            <Badge dot>{truck.availability ? 'Available' : 'Busy'}</Badge>
          </div>
          <p className="text-xs text-navy-400 mt-0.5">{meta.desc}</p>
          <p className="text-xs text-navy-400">Driver: {truck.driverId?.name || 'Assigned on booking'}</p>
        </div>
      </div>
      {truck.estimatedPrice && (
        <div className="mt-3 pt-3 border-t border-navy-100 flex items-center justify-between">
          <span className="text-xs text-navy-400">Estimated fare</span>
          <span className="text-lg font-bold text-primary-600">₹{truck.estimatedPrice}</span>
        </div>
      )}
    </div>
  )
}

function PriceRow({ label, value, bold }) {
  return (
    <div className={`flex justify-between items-center py-2 ${bold ? 'font-semibold text-navy-800' : 'text-sm text-navy-600'}`}>
      <span>{label}</span>
      <span className={bold ? 'text-primary-600 text-lg' : ''}>{value}</span>
    </div>
  )
}

export default function BookTruck() {
  const [form, setForm] = useState({ source: '', destination: '', goodsType: '', weight: '' })
  const [trucks, setTrucks] = useState([])
  const [selected, setSelected] = useState(null)
  const [breakdown, setBreakdown] = useState(null)
  const [searched, setSearched] = useState(false)
  const [loadingTrucks, setLoadingTrucks] = useState(false)
  const [loadingBook, setLoadingBook] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const searchTrucks = async (e) => {
    e.preventDefault()
    setError('')
    setLoadingTrucks(true)
    setSelected(null)
    setBreakdown(null)
    try {
      const { data } = await api.get('/trucks/available', { params: { source: form.source, destination: form.destination } })
      setTrucks(data.trucks)
      setSearched(true)
    } catch {
      setError('Could not fetch trucks. Please try again.')
    } finally {
      setLoadingTrucks(false)
    }
  }

  const handleSelect = async (truck) => {
    setSelected(truck)
    try {
      const { data } = await api.post('/pricing/calculate', { source: form.source, destination: form.destination, truckType: truck.truckType })
      setBreakdown(data)
    } catch {
      setError('Could not calculate price.')
    }
  }

  const confirmBooking = async () => {
    if (!selected) return
    setLoadingBook(true)
    try {
      const { data } = await api.post('/payment/create-order', {
        source: form.source,
        destination: form.destination,
        truckId: selected._id,
        goodsType: form.goodsType,
        weight: form.weight
      })

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: 'INR',
        name: 'LoadWheel',
        description: `${form.source} → ${form.destination}`,
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const { data: booking } = await api.post('/payment/verify', {
              ...response,
              bookingData: {
                truckId: selected._id,
                source: form.source,
                destination: form.destination,
                goodsType: form.goodsType,
                weight: form.weight
              }
            })
            navigate(`/tracking/${booking.booking._id}`)
          } catch {
            setError('Payment verification failed. Contact support.')
          }
        },
        prefill: { name: '', email: '', contact: '' },
        theme: { color: '#2563eb' }
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', () => setError('Payment failed. Please try again.'))
      rzp.open()
    } catch {
      setError('Could not initiate payment. Please try again.')
    } finally {
      setLoadingBook(false)
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Book a Truck</h1>
        <p className="text-navy-600 text-sm mt-1">Enter your route to see available trucks and pricing</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left column */}
        <div className="xl:col-span-1 space-y-5">

          {/* Route form */}
          <div className="card">
            <h2 className="font-semibold text-navy-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center text-xs font-bold">1</span>
              Enter Route
            </h2>
            <form onSubmit={searchTrucks} className="space-y-4">
              <div className="relative">
                <Input label="Pickup Location" placeholder="e.g. Mumbai, Maharashtra" value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })} required
                  icon={<span className="w-2.5 h-2.5 rounded-full bg-success block" />} />
                <div className="absolute left-[1.15rem] top-[3.2rem] w-0.5 h-4 bg-navy-200" />
              </div>
              <Input label="Delivery Location" placeholder="e.g. Pune, Maharashtra" value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })} required
                icon={<span className="w-2.5 h-2.5 rounded-full bg-danger block" />} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Goods Type</label>
                  <select className="input text-sm" value={form.goodsType} onChange={(e) => setForm({ ...form, goodsType: e.target.value })}>
                    <option value="">Select type</option>
                    {['Electronics', 'Furniture', 'Food & Beverages', 'Construction Material', 'Textiles', 'Other'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <Input label="Weight (tons)" type="number" placeholder="e.g. 2" value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })} />
              </div>
              {error && <p className="text-sm text-danger bg-danger-50 px-3 py-2 rounded-xl">{error}</p>}
              <Button type="submit" variant="primary" size="lg" loading={loadingTrucks} className="w-full">
                {!loadingTrucks && <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Search Available Trucks
                </>}
              </Button>
            </form>
          </div>

          {/* Price breakdown */}
          {breakdown && (
            <div className="card animate-slide-up">
              <h2 className="font-semibold text-navy-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-success-50 text-success-600 rounded-lg flex items-center justify-center text-xs font-bold">3</span>
                Price Breakdown
              </h2>
              <div className="divide-y divide-navy-100">
                <PriceRow label={`Base fare (${breakdown.distance} km × ₹${breakdown.baseFarePerKm})`} value={`₹${breakdown.baseCost}`} />
                <PriceRow label="Toll charges" value={`₹${breakdown.tollCost}`} />
                <PriceRow label="Driver allowance" value={`₹${breakdown.driverAllowance}`} />
                <PriceRow label={`GST (${breakdown.taxPercentage}%)`} value={`₹${breakdown.taxAmount}`} />
                <PriceRow label="Total Amount" value={`₹${breakdown.total}`} bold />
              </div>
              <Button onClick={confirmBooking} variant="primary" size="lg" loading={loadingBook} className="w-full mt-4">
                {!loadingBook && <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Confirm Booking — ₹{breakdown.total}
                </>}
              </Button>
              <p className="text-center text-xs text-navy-400 mt-2">✓ Free cancellation within 5 minutes</p>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="xl:col-span-2 space-y-5">
          {/* Map */}
          <div className="card p-0 overflow-hidden">
            <MapView source={form.source || null} destination={form.destination || null} />
          </div>

          {/* Truck list */}
          {(searched || loadingTrucks) && (
            <div className="card animate-fade-in">
              <h2 className="font-semibold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-warning-50 text-warning-500 rounded-lg flex items-center justify-center text-xs font-bold">2</span>
                Available Trucks
                {!loadingTrucks && <span className="ml-auto badge-gray">{trucks.length} found</span>}
              </h2>
              {loadingTrucks ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
                </div>
              ) : trucks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="font-semibold text-navy-800">No trucks available</p>
                  <p className="text-sm text-navy-400 mt-1">Try a different route or check back later</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trucks.map(t => (
                    <TruckCard key={t._id} truck={t} selected={selected?._id === t._id} onSelect={handleSelect} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
