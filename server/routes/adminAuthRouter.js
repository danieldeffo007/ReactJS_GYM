const Router = require('express')
const router = new Router()
const adminAuthController = require('../controllers/adminAuthController')
const authMiddleware = require('../middleware/authMiddleware')

//router.post('/reg', adminAuthController.reg)
router.post('/login', adminAuthController.login)
router.get('/check', authMiddleware, adminAuthController.check)

module.exports = router