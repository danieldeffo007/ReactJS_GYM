const Router = require('express')
const router = new Router()
const clientController = require('../controllers/clientController')


router.post('/create', clientController.create)
router.post('/update', clientController.update)
router.post('/delete', clientController.delete)
router.get('/getAll', clientController.getAll)

module.exports = router