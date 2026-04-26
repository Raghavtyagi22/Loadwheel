import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      if (user.role === 'admin') navigate('/admin')
      else if (user.role === 'driver') navigate('/driver')
      else navigate('/book')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between map-bg p-12">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2zM13 8h4l3 5v3h-7V8z" /></svg>
          </div>
          <span className="text-white font-bold text-lg">Load<span className="text-blue-300">Wheel</span></span>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Your logistics,<br />simplified.
          </h2>
          <p className="text-white/60 text-lg mb-8">Book trucks, track shipments, and manage deliveries — all from one dashboard.</p>
          <div className="space-y-3">
            {['Instant booking in under 60 seconds', 'Live GPS tracking on every delivery', 'AI-powered transparent pricing'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/30 text-sm">© 2024 LoadWheel Technologies</p>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center px-6 py-12 bg-surface">
        <div className="w-full max-w-md animate-slide-up">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy-800">Welcome back</h1>
            <p className="text-navy-600 mt-1">Sign in to your LoadWheel account</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-danger-50 border border-danger/20 text-danger rounded-xl px-4 py-3 mb-6 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>}
            />
            <div>
              <Input
                label="Password"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="text-xs text-primary-600 hover:underline mt-1.5 float-right">
                {showPass ? 'Hide' : 'Show'} password
              </button>
            </div>
            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">
              {!loading && 'Sign In'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-navy-200" /></div>
            <div className="relative flex justify-center"><span className="bg-surface px-3 text-xs text-navy-400">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Google', 'Microsoft'].map((p) => (
              <button key={p} className="btn btn-secondary btn-md w-full text-navy-600">
                {p}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-navy-600 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 font-semibold hover:underline">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
