const mongoose = require('mongoose')

const pricingSchema = new mongoose.Schema({
  baseFarePerKm: { type: Number, default: 25 },
  driverAllowance: { type: Number, default: 500 },
  taxPercentage: { type: Number, default: 5 },
  defaultTollCost: { type: Number, default: 200 }
})

module.exports = mongoose.model('Pricing', pricingSchema)
