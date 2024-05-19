const PortfolioController = require('../controllers/Portfolio')
const Express = require('express')
const auth = require('../lib/jwtExtractor')

const PortfolioRoutes = Express.Router()

PortfolioRoutes.get('/', auth, PortfolioController.getPortfolio)
PortfolioRoutes.get('/holdings', auth, PortfolioController.getHoldings)
PortfolioRoutes.get('/returns', auth, PortfolioController.getReturns)
PortfolioRoutes.post('/addTrade', auth, PortfolioController.addTrade),
PortfolioRoutes.post('/updateTrade', auth, PortfolioController.updateTrade),
PortfolioRoutes.post('/removeTrade', auth, PortfolioController.removeTrade),

module.exports = PortfolioRoutes
