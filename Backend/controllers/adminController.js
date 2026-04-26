const User = require('../models/User')
const Truck = require('../models/Truck')
const Booking = require('../models/Booking')

exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalBookings, activeTrucks, revenueResult] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Truck.countDocuments({ availability: true }),
      Booking.aggregate([
        { $match: { status: 'Delivered' } },
        { $group: { _id: null, total: { $sum: '$price' } } }
      ])
    ])
    res.json({
      totalUsers,
      totalBookings,
      activeTrucks,
      totalRevenue: revenueResult[0]?.total || 0
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
