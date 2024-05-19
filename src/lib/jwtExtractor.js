const jwt = require('jsonwebtoken');
const { User } = require('../mongoDb/Schema');
require('dotenv').config()

const { jwt_secret_key } = process.env

//this function is validate to check weather the it user in valid or not 
const auth = async (req, res, next) => {
    try {
        const authorizationHeader = req.header('Authorization');
        if (!authorizationHeader) {
            throw new Error('Authorization header missing');
        }
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, jwt_secret_key);
        const customer = await User.findOne({ customerId: decoded.id });
        if (!customer) throw new Error();
        req.customerId = customer.customerId;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'You are not the valid user' });
    }
};

module.exports = auth;