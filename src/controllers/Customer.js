const ResponseBody = require('../lib/ResponseBody');
const customerModel = require('../models/Customer');


const create = async (req, res, next) => {
    const { body } = req
    try {
        const result = await customerModel.create(body)
        resBody = result.status ? new ResponseBody(200, 'success', { message: result?.message, token: result?.token }) : new ResponseBody(400, result?.message)
        res.status(resBody.statusCode).json(resBody);
        next()
    } catch (err) {
        const errorResponse = new ResponseBody(500, 'Internal Server Error', err.message);
        res.status(500).json(errorResponse);
    }
}

const login = async (req, res, next) => {
    const { body } = req
    try {
        const result = await customerModel.login(body)
        resBody = result.status ? new ResponseBody(200, 'success', { token: result?.token }) : new ResponseBody(400, result?.message)
        res.status(resBody.statusCode).json(resBody);
        next()
    } catch (err) {
        const errorResponse = new ResponseBody(500, 'Internal Server Error', err.message);
        res.status(500).json(errorResponse);
    }
}

module.exports = { create, login } 