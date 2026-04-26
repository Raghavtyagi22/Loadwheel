const Pricing = require('../models/Pricing')
const { calculatePrice } = require('../services/pricing')

exports.getPricing = async (req, res) => {
  try {
    let pricing = await Pricing.findOne()
    if (!pricing) pricing = await Pricing.create({})
    res.json(pricing)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updatePricing = async (req, res) => {
  try {
    let pricing = await Pricing.findOne()
    if (!pricing) pricing = new Pricing()
    Object.assign(pricing, req.body)
    await pricing.save()
    res.json(pricing)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.calculateFare = async (req, res) => {
  try {
    const { source, destination, truckType } = req.body
    const breakdown = await calculatePrice(source, destination, truckType || 'Mini')
    res.json(breakdown)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
