const router = require('express').Router()
const { auth, authorize } = require('../middleware/auth')
const { createOrder, verifyPayment } = require('../controllers/paymentController')

router.post('/create-order', auth, authorize('customer'), createOrder)
router.post('/verify', auth, authorize('customer'), verifyPayment)

module.exports = router
