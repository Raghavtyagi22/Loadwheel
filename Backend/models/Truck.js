const mongoose = require('mongoose')

const truckSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  truckType: { type: String, enum: ['Mini', 'Medium', 'Heavy'], required: true },
  capacity: { type: Number, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  location: {
    lat: { type: Number, default: 20.5937 },
    lng: { type: Number, default: 78.9629 }
  },
  availability: { type: Boolean, default: true }
}, { timestamps: true })

module.exports = mongoose.model('Truck', truckSchema)
