const ResponseBody = require('../lib/ResponseBody');
const portfolioModel = require('../models/Portfolio')

const getPortfolio = async (req, res, next) => {
    const { body } = req;
    const result = await portfolioModel.getPortfolio(body)

    resBody = result.status ? new ResponseBody(200, 'success', result) : new ResponseBody(400, result?.message)
    res.status(resBody.statusCode).json(resBody);
    next()
}

const getHoldings = async (req, res, next) => {
    const { body } = req;
    const result = await portfolioModel.getHoldings(body)

    resBody = result.status ? new ResponseBody(200, 'success', result) : new ResponseBody(400, result?.message)
    res.status(resBody.statusCode).json(resBody);
    next()
}

const getReturns = async (req, res, next) => {
    const { body } = req;
    const result = await portfolioModel.getReturns(body)

    resBody = result.status ? new ResponseBody(200, 'success', result) : new ResponseBody(400, result?.message)
    res.status(resBody.statusCode).json(resBody);
    next()
}

const addTrade = async (req, res, next) => {
    const { body } = req;

    const result = await portfolioModel.addTrade(body)

    resBody = result.status ? new ResponseBody(200, 'success', result) : new ResponseBody(400, result?.message)
    res.status(resBody.statusCode).json(resBody);
    next()
}

const updateTrade = async (req, res, next) => {
    const { body } = req;

    const result = await portfolioModel.updateTrade(body)

    resBody = result.status ? new ResponseBody(200, 'success', result) : new ResponseBody(400, result?.message)
    res.status(resBody.statusCode).json(resBody);
    next()
}

const removeTrade = async (req, res, next) => {
    const { body } = req;

    const result = await portfolioModel.removeTrade(body)

    resBody = result.status ? new ResponseBody(200, 'success', result) : new ResponseBody(400, result?.message)
    res.status(resBody.statusCode).json(resBody);
    next()
}


module.exports = { getPortfolio, getHoldings, getReturns, addTrade, updateTrade, removeTrade } 