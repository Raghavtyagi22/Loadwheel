export default function TruckCard({ truck, onSelect, selected }) {
  const typeIcon = { Mini: '🚐', Medium: '🚛', Heavy: '🚚' }

  return (
    <div
      onClick={() => onSelect(truck)}
      className={`card cursor-pointer border-2 transition-all hover:shadow-lg ${
        selected ? 'border-primary' : 'border-transparent'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{typeIcon[truck.truckType] || '🚚'}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
          truck.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {truck.availability ? 'Available' : 'Busy'}
        </span>
      </div>
      <h3 className="font-bold text-lg">{truck.truckType} Truck</h3>
      <p className="text-gray-500 text-sm">Capacity: {truck.capacity} tons</p>
      <p className="text-gray-500 text-sm">Driver: {truck.driverId?.name || 'N/A'}</p>
      {truck.estimatedPrice && (
        <p className="text-primary font-bold mt-2">₹{truck.estimatedPrice}</p>
      )}
    </div>
  )
}
