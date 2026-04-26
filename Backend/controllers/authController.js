const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Truck = require('../models/Truck')

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role, truckType, capacity, registrationNumber } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })

    const user = await User.create({ name, email, password, phone, role })

    if (role === 'driver' && truckType && capacity && registrationNumber) {
      await Truck.create({ driverId: user._id, truckType, capacity, registrationNumber })
    }

    res.status(201).json({ token: signToken(user), user: { _id: user._id, name, email, role, phone } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' })

    res.json({ token: signToken(user), user: { _id: user._id, name: user.name, email, role: user.role, phone: user.phone } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
