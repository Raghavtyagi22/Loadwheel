const router = require('express').Router()
const User = require('../models/User')
const { auth, authorize } = require('../middleware/auth')

router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json({ users })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
