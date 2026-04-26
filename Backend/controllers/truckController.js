const Truck = require('../models/Truck')

exports.getAvailableTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find({ availability: true }).populate('driverId', 'name phone')
    res.json({ trucks })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getAllTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find().populate('driverId', 'name phone')
    res.json({ trucks })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateAvailability = async (req, res) => {
  try {
    const truck = await Truck.findOneAndUpdate(
      { driverId: req.user.id },
      { availability: req.body.availability },
      { new: true }
    )
    res.json({ truck })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateLocation = async (req, res) => {
  try {
    const truck = await Truck.findOneAndUpdate(
      { driverId: req.user.id },
      { location: req.body.location },
      { new: true }
    )
    res.json({ truck })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
