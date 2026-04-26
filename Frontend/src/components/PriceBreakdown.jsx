export default function PriceBreakdown({ breakdown }) {
  if (!breakdown) return null

  return (
    <div className="card mt-4 border border-orange-100">
      <h3 className="font-bold text-lg mb-3 text-dark">Price Breakdown</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Base Fare ({breakdown.distance} km × ₹{breakdown.baseFarePerKm}/km)</span>
          <span>₹{breakdown.baseCost}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Toll Charges</span>
          <span>₹{breakdown.tollCost}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Driver Allowance</span>
          <span>₹{breakdown.driverAllowance}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax ({breakdown.taxPercentage}%)</span>
          <span>₹{breakdown.taxAmount}</span>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between font-bold text-base text-primary">
          <span>Total</span>
          <span>₹{breakdown.total}</span>
        </div>
      </div>
    </div>
  )
}
