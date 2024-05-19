const { authSequenceIncrementer } = require('../lib/Common');
const { User } = require('../mongoDb/Schema');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const { jwt_secret_key } = process.env


const create = async body => {
    try {
        //destructuring 
        const { name, email, password } = body

        if (!password && !name && !email) return { status: false, message: 'Please fill mandatory details' }
        //getting the sequence from the data base
        const getCustomerId = await authSequenceIncrementer('customerSeq')
        //creating the new customer and storing it in the databse
        const customer = new User({ customerId: getCustomerId, name, email, password });
        await customer.save();
        const token = jwt.sign({ id: getCustomerId }, jwt_secret_key, { expiresIn: '1h' });
        return { status: true, message: 'User created Successfully', token }
    } catch (err) {
        return { status: true, message: err.message }
    }
}


const login = async body => {
    try {
        const { email, password } = body;
        //checking if the user exist
        const customer = await User.findOne({ email });

        if (!customer || !(await customer.comparePassword(password))) {
            return { status: false, message: 'Invalid credentials' };
        }
        const token = jwt.sign({ id: customer._id }, jwt_secret_key, { expiresIn: '1h' });
        return { status: true, token };
    } catch (error) {
        return { status: false, message: error.message };
    }
}

module.exports = { create,login }