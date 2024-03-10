const Router = require('express')
const router = new Router()
const trainerController = require('../controllers/trainerController')

router.post('/create', trainerController.create)
router.post('/update', trainerController.update)
router.post('/delete', trainerController.delete)
router.get('/getAll', trainerController.getAll)

module.exports = router