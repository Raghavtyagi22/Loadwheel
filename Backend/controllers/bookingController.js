const Booking = require('../models/Booking')
const Truck = require('../models/Truck')
const User = require('../models/User')
const { calculatePrice } = require('../services/pricing')
const { sendStatusUpdate } = require('../services/email')

exports.createBooking = async (req, res) => {
  try {
    const { truckId, source, destination, goodsType, weight } = req.body
    const truck = await Truck.findById(truckId)
    if (!truck || !truck.availability)
      return res.status(400).json({ message: 'Truck not available' })

    const breakdown = await calculatePrice(source, destination, truck.truckType)

    const booking = await Booking.create({
      customerId: req.user.id,
      truckId,
      source,
      destination,
      goodsType,
      weight,
      distance: breakdown.distance,
      price: breakdown.total
    })

    await Truck.findByIdAndUpdate(truckId, { availability: false })

    res.status(201).json({ booking: await booking.populate('truckId', 'truckType capacity') })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user.id })
      .populate('truckId', 'truckType capacity')
      .sort({ createdAt: -1 })
    res.json({ bookings })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getDriverBookings = async (req, res) => {
  try {
    const truck = await Truck.findOne({ driverId: req.user.id })
    if (!truck) return res.json({ bookings: [] })
    const bookings = await Booking.find({ truckId: truck._id })
      .populate('customerId', 'name phone')
      .sort({ createdAt: -1 })
    res.json({ bookings })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customerId', 'name')
      .populate('truckId', 'truckType')
      .sort({ createdAt: -1 })
    res.json({ bookings })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('truckId', 'truckType capacity driverId')
      .populate('customerId', 'name phone')
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    res.json({ booking })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('customerId', 'name email')
    if (req.body.status === 'Delivered') {
      await Truck.findByIdAndUpdate(booking.truckId, { availability: true })
    }
    if (booking.customerId?.email) {
      sendStatusUpdate(booking.customerId, booking).catch(() => {})
    }
    res.json({ booking })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
