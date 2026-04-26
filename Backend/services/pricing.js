const axios = require('axios')
const Pricing = require('../models/Pricing')

async function getDistanceKm(origin, destination) {
  const key = process.env.GOOGLE_MAPS_KEY
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${key}`
  const { data } = await axios.get(url)
  const element = data.rows[0]?.elements[0]
  if (element?.status !== 'OK') throw new Error('Could not calculate distance')
  return Math.round(element.distance.value / 1000) // meters → km
}

async function calculatePrice(source, destination, truckType) {
  const rules = await Pricing.findOne() || await Pricing.create({})
  const distance = await getDistanceKm(source, destination)

  const multiplier = truckType === 'Heavy' ? 1.5 : truckType === 'Medium' ? 1.2 : 1
  const baseCost = Math.round(distance * rules.baseFarePerKm * multiplier)
  const tollCost = rules.defaultTollCost
  const driverAllowance = rules.driverAllowance
  const subtotal = baseCost + tollCost + driverAllowance
  const taxAmount = Math.round((rules.taxPercentage / 100) * subtotal)
  const total = subtotal + taxAmount

  return {
    distance,
    baseFarePerKm: rules.baseFarePerKm,
    baseCost,
    tollCost,
    driverAllowance,
    taxPercentage: rules.taxPercentage,
    taxAmount,
    total
  }
}

module.exports = { calculatePrice }
