const axios = require('axios')
const Pricing = require('../models/Pricing')

const CITIES = {
  'mumbai': { lat: 19.0760, lng: 72.8777 },
  'pune': { lat: 18.5204, lng: 73.8567 },
  'delhi': { lat: 28.6139, lng: 77.2090 },
  'new delhi': { lat: 28.6139, lng: 77.2090 },
  'bangalore': { lat: 12.9716, lng: 77.5946 },
  'bengaluru': { lat: 12.9716, lng: 77.5946 },
  'chennai': { lat: 13.0827, lng: 80.2707 },
  'hyderabad': { lat: 17.3850, lng: 78.4867 },
  'kolkata': { lat: 22.5726, lng: 88.3639 },
  'ahmedabad': { lat: 23.0225, lng: 72.5714 },
  'surat': { lat: 21.1702, lng: 72.8311 },
  'jaipur': { lat: 26.9124, lng: 75.7873 },
  'lucknow': { lat: 26.8467, lng: 80.9462 },
  'agra': { lat: 27.1767, lng: 78.0081 },
  'nagpur': { lat: 21.1458, lng: 79.0882 },
  'indore': { lat: 22.7196, lng: 75.8577 },
  'bhopal': { lat: 23.2599, lng: 77.4126 },
  'patna': { lat: 25.5941, lng: 85.1376 },
  'vadodara': { lat: 22.3072, lng: 73.1812 },
  'coimbatore': { lat: 11.0168, lng: 76.9558 },
  'kochi': { lat: 9.9312, lng: 76.2673 },
  'chandigarh': { lat: 30.7333, lng: 76.7794 },
  'gurgaon': { lat: 28.4595, lng: 77.0266 },
  'noida': { lat: 28.5355, lng: 77.3910 },
  'visakhapatnam': { lat: 17.6868, lng: 83.2185 },
}

function haversineKm(from, to) {
  const R = 6371
  const dLat = (to.lat - from.lat) * Math.PI / 180
  const dLng = (to.lng - from.lng) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1.3)
}

async function getDistanceKm(origin, destination) {
  const key = process.env.GOOGLE_MAPS_KEY
  if (key && key !== 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    try {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${key}`
      const { data } = await axios.get(url)
      const element = data.rows[0]?.elements[0]
      if (element?.status === 'OK') return Math.round(element.distance.value / 1000)
    } catch {}
  }
  const from = CITIES[origin.toLowerCase().trim()] || { lat: 20.5937, lng: 78.9629 }
  const to = CITIES[destination.toLowerCase().trim()] || { lat: 22.5937, lng: 80.9629 }
  return haversineKm(from, to)
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

  return { distance, baseFarePerKm: rules.baseFarePerKm, baseCost, tollCost, driverAllowance, taxPercentage: rules.taxPercentage, taxAmount, total }
}

module.exports = { calculatePrice }
