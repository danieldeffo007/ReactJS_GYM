const Router = require('express')
const router = new Router()
const suggestionController = require('../controllers/suggestionController')

router.post('/create', suggestionController.create)
router.post('/delete', suggestionController.delete)
router.get('/getAll',suggestionController.getAll )

module.exports = router