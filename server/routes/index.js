const Router = require('express')
const router = new Router()
const adminAuthRouter = require('./adminAuthRouter')
const clientRouter = require('./clientRouter')
const machineRouter = require('./machineRouter')
const repairRouter = require('./repairRouter')
const subscribeRouter = require('./subscribeRouter')
const suggestionRouter = require('./suggestionRouter')
const trainerRouter = require('./trainerRouter')

router.use('/adminAuth', adminAuthRouter)
router.use('/client', clientRouter)
router.use('/machine', machineRouter)
router.use('/repair', repairRouter)
router.use('/subscribe', subscribeRouter)
router.use('/suggestion', suggestionRouter)
router.use('/trainer', trainerRouter)

module.exports = router