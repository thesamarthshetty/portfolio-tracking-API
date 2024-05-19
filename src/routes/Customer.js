const customerController = require('../controllers/Customer')
const Express = require('express')

const customerRoutes = Express.Router()

customerRoutes.post('/create',customerController.create)
customerRoutes.post('/login',customerController.login)

module.exports = customerRoutes
