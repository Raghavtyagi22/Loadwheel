const Razorpay = require('razorpay')
const crypto = require('crypto')
const Booking = require('../models/Booking')
const Truck = require('../models/Truck')
const User = require('../models/User')
const { calculatePrice } = require('../services/pricing')
const { sendBookingConfirmed, sendDriverNewBooking } = require('../services/email')

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

exports.createOrder = async (req, res) => {
  try {
    const { source, destination, truckId, goodsType, weight } = req.body
    const truck = await Truck.findById(truckId)
    if (!truck || !truck.availability)
      return res.status(400).json({ message: 'Truck not available' })

    const breakdown = await calculatePrice(source, destination, truck.truckType)
    const order = await razorpay.orders.create({
      amount: breakdown.total * 100, // paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    })

    res.json({ order, breakdown, key: process.env.RAZORPAY_KEY_ID })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = req.body

    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(sign).digest('hex')

    if (expectedSign !== razorpay_signature)
      return res.status(400).json({ message: 'Payment verification failed' })

    const truckData = await Truck.findById(bookingData.truckId)
    const breakdown = await calculatePrice(bookingData.source, bookingData.destination, truckData.truckType)

    const booking = await Booking.create({
      customerId: req.user.id,
      truckId: bookingData.truckId,
      source: bookingData.source,
      destination: bookingData.destination,
      goodsType: bookingData.goodsType,
      weight: bookingData.weight,
      distance: breakdown.distance,
      price: breakdown.total,
      paymentId: razorpay_payment_id,
      paymentStatus: 'Paid'
    })

    await Truck.findByIdAndUpdate(bookingData.truckId, { availability: false })

    const customer = await User.findById(req.user.id)
    sendBookingConfirmed(customer, booking).catch(() => {})

    const truckWithDriver = await Truck.findById(bookingData.truckId).populate('driverId', 'name email')
    if (truckWithDriver?.driverId?.email) {
      sendDriverNewBooking(truckWithDriver.driverId, booking).catch(() => {})
    }

    res.status(201).json({ booking: await booking.populate('truckId', 'truckType capacity') })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
