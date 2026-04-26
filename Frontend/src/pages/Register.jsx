import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const roles = [
  { value: 'customer', label: 'Ship Goods', desc: 'I need to transport goods', icon: '📦' },
  { value: 'driver', label: 'Drive & Earn', desc: 'I own a truck and want to earn', icon: '🚚' }
]

const truckTypes = ['Mini', 'Medium', 'Heavy']

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'customer', truckType: 'Mini', capacity: '', registrationNumber: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await register(form)
      navigate(user.role === 'driver' ? '/driver' : '/book')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left */}
      <div className="hidden lg:flex flex-col justify-between map-bg p-12">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2zM13 8h4l3 5v3h-7V8z" /></svg>
          </div>
          <span className="text-white font-bold text-lg">Load<span className="text-blue-300">Wheel</span></span>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Join 50,000+<br />businesses today.</h2>
          <p className="text-white/60 mb-8">Free to sign up. No credit card required.</p>
          <div className="grid grid-cols-2 gap-4">
            {[['₹0', 'Sign-up fee'], ['2 min', 'To book'], ['24/7', 'Support'], ['500+', 'Cities']].map(([v, l]) => (
              <div key={l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <p className="text-2xl font-extrabold text-white">{v}</p>
                <p className="text-white/60 text-sm">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/30 text-sm">© 2024 LoadWheel Technologies</p>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center px-6 py-12 bg-surface overflow-y-auto">
        <div className="w-full max-w-md animate-slide-up">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy-800">Create your account</h1>
            <p className="text-navy-600 mt-1">Start shipping smarter today</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-danger-50 border border-danger/20 text-danger rounded-xl px-4 py-3 mb-6 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {roles.map((r) => (
              <button key={r.value} type="button" onClick={() => setForm({ ...form, role: r.value })}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${form.role === r.value ? 'border-primary-600 bg-primary-50' : 'border-navy-200 hover:border-navy-300 bg-white'}`}>
                <p className="text-2xl mb-2">{r.icon}</p>
                <p className="font-semibold text-sm text-navy-800">{r.label}</p>
                <p className="text-xs text-navy-400 mt-0.5">{r.desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" type="text" placeholder="John Doe" value={form.name} onChange={set('name')} required
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
            <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>} />
            <Input label="Phone Number" type="tel" placeholder="+91 9876543210" value={form.phone} onChange={set('phone')} required
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>} />
            <Input label="Password" type="password" placeholder="Min 6 characters" value={form.password} onChange={set('password')} required minLength={6}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} />

            {/* Driver-specific fields */}
            {form.role === 'driver' && (
              <div className="space-y-4 p-4 bg-navy-100/60 rounded-2xl border border-navy-200">
                <p className="text-sm font-semibold text-navy-800">Truck Details</p>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-1.5">Truck Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {truckTypes.map((t) => (
                      <button key={t} type="button" onClick={() => setForm({ ...form, truckType: t })}
                        className={`py-2 rounded-xl text-sm font-medium border-2 transition-all ${form.truckType === t ? 'border-primary-600 bg-primary-50 text-primary-600' : 'border-navy-200 text-navy-600 hover:border-navy-300'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <Input label="Capacity (tons)" type="number" placeholder="e.g. 5" value={form.capacity} onChange={set('capacity')} />
                <Input label="Registration Number" type="text" placeholder="MH-01-AB-1234" value={form.registrationNumber} onChange={set('registrationNumber')} />
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
              {!loading && `Create ${form.role === 'driver' ? 'Driver' : ''} Account`}
            </Button>
          </form>

          <p className="text-center text-sm text-navy-600 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">Sign in</Link>
          </p>
          <p className="text-center text-xs text-navy-400 mt-3">
            By registering, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
