const Router = require('express')
const router = new Router()
const machineController = require('../controllers/machineController')

router.post('/create', machineController.create)
router.post('/update', machineController.update)
router.post('/delete', machineController.delete)
router.get('/getAll', machineController.getAll)

module.exports = router