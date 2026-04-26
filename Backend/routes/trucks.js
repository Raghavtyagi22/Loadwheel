const router = require('express').Router()
const { auth, authorize } = require('../middleware/auth')
const {
  getAvailableTrucks,
  getAllTrucks,
  updateAvailability,
  updateLocation
} = require('../controllers/truckController')

router.get('/available', auth, getAvailableTrucks)
router.get('/', auth, authorize('admin'), getAllTrucks)
router.patch('/availability', auth, authorize('driver'), updateAvailability)
router.patch('/location', auth, authorize('driver'), updateLocation)

module.exports = router
