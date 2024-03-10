const Router = require('express')
const router = new Router()
const subscribeController = require('../controllers/subscribeController')

//router.post('/create', subscribeController.create)
router.post('/delete', subscribeController.delete)
router.get('/getAll', subscribeController.getAll)

module.exports = router