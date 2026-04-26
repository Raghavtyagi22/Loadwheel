export default function StatCard({ icon, label, value, change, color = 'blue', loading }) {
  const colors = {
    blue:   { bg: 'bg-primary-50',  text: 'text-primary-600' },
    green:  { bg: 'bg-success-50',  text: 'text-success-600' },
    yellow: { bg: 'bg-warning-50',  text: 'text-warning-500' },
    red:    { bg: 'bg-danger-50',   text: 'text-danger' },
    navy:   { bg: 'bg-navy-100',    text: 'text-navy-800' }
  }
  const c = colors[color]

  if (loading) {
    return (
      <div className="stat-card">
        <div className="skeleton w-12 h-12 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-7 w-28" />
        </div>
      </div>
    )
  }

  return (
    <div className="stat-card animate-fade-in">
      <div className={`stat-icon ${c.bg} ${c.text}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-navy-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-navy-800 truncate">{value}</p>
        {change !== undefined && (
          <p className={`text-xs font-medium mt-1 ${change >= 0 ? 'text-success-600' : 'text-danger'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% vs last week
          </p>
        )}
      </div>
    </div>
  )
}
