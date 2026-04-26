const variants = {
  blue: 'badge-blue', green: 'badge-green',
  yellow: 'badge-yellow', red: 'badge-red', gray: 'badge-gray'
}

const statusMap = {
  'Booked': 'blue', 'In Transit': 'yellow',
  'Delivered': 'green', 'Cancelled': 'red',
  'Available': 'green', 'Busy': 'red', 'Offline': 'gray'
}

export default function Badge({ children, variant, dot = false }) {
  const v = variant || statusMap[children] || 'gray'
  return (
    <span className={variants[v]}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${v === 'green' ? 'bg-success' : v === 'yellow' ? 'bg-warning' : v === 'red' ? 'bg-danger' : v === 'blue' ? 'bg-primary-600' : 'bg-navy-400'}`} />}
      {children}
    </span>
  )
}
