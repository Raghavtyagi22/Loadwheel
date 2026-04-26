const router = require('express').Router()
const { auth, authorize } = require('../middleware/auth')
const { getStats } = require('../controllers/adminController')

router.get('/stats', auth, authorize('admin'), getStats)

module.exports = router
