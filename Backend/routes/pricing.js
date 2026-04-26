const router = require('express').Router()
const { auth, authorize } = require('../middleware/auth')
const { getPricing, updatePricing, calculateFare } = require('../controllers/pricingController')

router.get('/', auth, getPricing)
router.put('/', auth, authorize('admin'), updatePricing)
router.post('/calculate', auth, calculateFare)

module.exports = router
