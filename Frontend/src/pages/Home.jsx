import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const features = [
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: 'Instant Booking', desc: 'Book a truck in under 60 seconds. No calls, no waiting.', color: 'bg-primary-50 text-primary-600'
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    title: 'Live GPS Tracking', desc: 'Watch your shipment move in real-time on an interactive map.', color: 'bg-success-50 text-success-600'
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: 'Verified Drivers', desc: 'Every driver is background-checked, licensed, and rated.', color: 'bg-warning-50 text-warning-500'
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Transparent Pricing', desc: 'AI-powered fare with full breakdown. Zero hidden charges.', color: 'bg-primary-50 text-primary-600'
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    title: 'In-App Chat', desc: 'Message your driver directly. No need to share phone numbers.', color: 'bg-success-50 text-success-600'
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    title: 'AI Route Optimization', desc: 'Smart routing saves time and fuel on every delivery.', color: 'bg-warning-50 text-warning-500'
  }
]

const steps = [
  { num: '01', title: 'Enter your route', desc: 'Type pickup and delivery locations. We auto-detect your city.' },
  { num: '02', title: 'Choose your truck', desc: 'Pick from Mini, Medium, or Heavy trucks. See price instantly.' },
  { num: '03', title: 'Track & deliver', desc: 'Confirm booking, track live, and get delivery confirmation.' }
]

const testimonials = [
  { name: 'Rahul Sharma', role: 'E-commerce Seller', text: 'LoadWheel cut our logistics cost by 30%. The live tracking gives our customers confidence.', avatar: 'RS' },
  { name: 'Priya Mehta', role: 'Furniture Business Owner', text: 'Booking a truck used to take hours of calls. Now it takes 2 minutes. Absolutely love it.', avatar: 'PM' },
  { name: 'Arjun Patel', role: 'Construction Manager', text: 'The heavy truck fleet is reliable and the drivers are professional. Best logistics platform.', avatar: 'AP' }
]

const stats = [['50K+', 'Deliveries'], ['10K+', 'Trucks'], ['500+', 'Cities'], ['4.9★', 'Rating']]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Map-style background */}
        <div className="absolute inset-0 map-bg" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-3xl" />

        <div className="relative max-w-screen-xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Text */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Now live in 500+ cities across India</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Move anything,<br />
              <span className="text-gradient bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                anywhere.
              </span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
              India's most trusted truck booking platform. Instant booking, live tracking, AI-powered pricing — all in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              {user ? (
                <Link to="/book" className="btn btn-primary btn-xl shadow-lg shadow-primary-600/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2zM13 8h4l3 5v3h-7V8z" /></svg>
                  Book a Truck Now
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-xl shadow-lg shadow-primary-600/30">
                    Get Started Free
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                  <Link to="/login" className="btn btn-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20">
                    Sign In
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center gap-6 mt-8">
              <div className="flex -space-x-2">
                {['RS', 'PM', 'AK', 'VJ'].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">{i[0]}</div>
                ))}
              </div>
              <p className="text-white/70 text-sm"><span className="text-white font-semibold">2,400+</span> businesses trust us</p>
            </div>
          </div>

          {/* Floating booking card */}
          <div className="hidden lg:block animate-fade-in">
            <div className="card-glass max-w-sm ml-auto">
              <p className="text-sm font-semibold text-navy-800 mb-4">Quick Book</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-navy-100/60 rounded-xl">
                  <div className="w-2.5 h-2.5 rounded-full bg-success flex-shrink-0" />
                  <div>
                    <p className="text-xs text-navy-400">Pickup</p>
                    <p className="text-sm font-medium">Mumbai, Maharashtra</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-navy-100/60 rounded-xl">
                  <div className="w-2.5 h-2.5 rounded-full bg-danger flex-shrink-0" />
                  <div>
                    <p className="text-xs text-navy-400">Delivery</p>
                    <p className="text-sm font-medium">Pune, Maharashtra</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[['Mini', '₹1,200', '🚐'], ['Medium', '₹2,100', '🚛'], ['Heavy', '₹3,800', '🚚']].map(([type, price, icon]) => (
                  <div key={type} className={`p-2.5 rounded-xl text-center cursor-pointer transition-all border-2 ${type === 'Medium' ? 'border-primary-600 bg-primary-50' : 'border-transparent bg-navy-100/60 hover:border-navy-200'}`}>
                    <p className="text-lg">{icon}</p>
                    <p className="text-xs font-semibold mt-1">{type}</p>
                    <p className="text-xs text-primary-600 font-bold">{price}</p>
                  </div>
                ))}
              </div>
              <Link to={user ? '/book' : '/register'} className="btn btn-primary btn-md w-full mt-4">
                Book Now — ₹2,100
              </Link>
              <p className="text-center text-xs text-navy-400 mt-2">✓ Free cancellation · ✓ No hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-primary-600 py-12">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-extrabold text-white">{val}</p>
              <p className="text-primary-100 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6 max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge-blue mb-3">Why LoadWheel</span>
          <h2 className="text-4xl font-bold text-navy-800 mt-3">Built for modern logistics</h2>
          <p className="text-navy-600 mt-4 max-w-xl mx-auto">Everything you need to move goods efficiently, safely, and affordably.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card-hover group">
              <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-navy-800 mb-2">{f.title}</h3>
              <p className="text-sm text-navy-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="py-24 bg-navy-100/40">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="badge-green mb-3">Simple Process</span>
            <h2 className="text-4xl font-bold text-navy-800 mt-3">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />
            {steps.map((s, i) => (
              <div key={s.num} className="text-center animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold mx-auto mb-5 shadow-lg shadow-primary-600/30">
                  {s.num}
                </div>
                <h3 className="font-semibold text-navy-800 text-lg mb-2">{s.title}</h3>
                <p className="text-navy-600 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge-yellow mb-3">Testimonials</span>
          <h2 className="text-4xl font-bold text-navy-800 mt-3">Loved by businesses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-hover">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-warning-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-800">{t.name}</p>
                  <p className="text-xs text-navy-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-navy-800 to-navy-800 rounded-3xl p-16 shadow-modal">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to ship smarter?</h2>
          <p className="text-navy-300 mb-8 text-lg">Join 50,000+ businesses already using LoadWheel.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/register" className="btn btn-primary btn-xl shadow-lg shadow-primary-600/40">
              Start for Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link to="/login" className="btn btn-xl bg-white/10 text-white border border-white/20 hover:bg-white/20">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-navy-200 py-8 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2zM13 8h4l3 5v3h-7V8z" /></svg>
            </div>
            <span className="font-bold text-navy-800">Load<span className="text-primary-600">Wheel</span></span>
          </div>
          <p className="text-sm text-navy-400">© 2024 LoadWheel Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
