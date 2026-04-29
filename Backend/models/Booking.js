const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  goodsType: { type: String },
  weight: { type: Number },
  distance: { type: Number },
  price: { type: Number },
  status: { type: String, enum: ['Booked', 'In Transit', 'Delivered', 'Cancelled'], default: 'Booked' },
  paymentId: { type: String },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)
