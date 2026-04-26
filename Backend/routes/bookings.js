const router = require('express').Router()
const { auth, authorize } = require('../middleware/auth')
const {
  createBooking,
  getMyBookings,
  getDriverBookings,
  getAllBookings,
  getBookingById,
  updateStatus
} = require('../controllers/bookingController')

router.post('/', auth, authorize('customer'), createBooking)
router.get('/my', auth, authorize('customer'), getMyBookings)
router.get('/driver', auth, authorize('driver'), getDriverBookings)
router.get('/', auth, authorize('admin'), getAllBookings)
router.get('/:id', auth, getBookingById)
router.patch('/:id/status', auth, authorize('driver', 'admin'), updateStatus)

module.exports = router
