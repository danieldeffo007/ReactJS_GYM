const Router = require('express')
const router = new Router()
const repairController = require('../controllers/repairController')


//router.post('/create', repairController.create)
router.post('/update', repairController.change)
router.post('/delete', repairController.delete)
router.get('/getAll', repairController.getAll)
router.get('/status', repairController.getStatus)

module.exports = router