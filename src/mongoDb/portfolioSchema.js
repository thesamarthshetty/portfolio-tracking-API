const { mainConnection } = require('../mongoDb/dbConnections');
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }
});

const Stock = mainConnection.model('Stock', stockSchema);


const tradeSchema = new mongoose.Schema({
    stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true },
    type: { type: String, enum: ['buy', 'sell'], required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Number, required: true }
});

const Trade = mainConnection.model('Trade', tradeSchema);

module.exports = { Stock, Trade };